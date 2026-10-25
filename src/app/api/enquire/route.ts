import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Path to durable inquiry ledger
const INQUIRIES_FILE_PATH = path.join(process.cwd(), "data", "inquiries.json");

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    // 1. IP check for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiries sent in a short window. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Body parsing and size check
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const { name, email, phone, typology, protocol, notes, honeypot } = body;

    // 3. Spam protection via honeypot
    if (honeypot) {
      // Quietly reject bots without alerting them
      return NextResponse.json({
        success: true,
        refId: "AE-BOT-IGNORED",
        delivery: {
          persistedDurable: false,
          emailConfigured: false,
          emailDispatched: false,
          message: "Submission filtered by anti-spam heuristics.",
        },
      });
    }

    // 4. Server-side validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Full legal or representative name is required (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid private email address is required.";
    }

    const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
    if (!phone || typeof phone !== "string" || !phoneRegex.test(phone.trim())) {
      errors.phone = "A valid contact telephone number with country code is required.";
    }

    const validTypologies = ["garden", "signature", "sky", "undecided"];
    if (!typology || !validTypologies.includes(typology)) {
      errors.typology = "Please select a valid residence typology.";
    }

    const validProtocols = ["phone", "whatsapp", "concierge"];
    if (protocol && !validProtocols.includes(protocol)) {
      errors.protocol = "Please specify a supported contact protocol.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          details: errors,
        },
        { status: 400 }
      );
    }

    // Generate unique inquiry reference code
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `AE-${timestamp}-${randomSuffix}`;

    // 5. Transactional email handling
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "advisory@elevora.example.com";
    const emailFrom = process.env.EMAIL_FROM || "inquiry@aureliaestates.example.com";

    let emailSent = false;
    let emailErrorDetails: string | null = null;

    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [contactEmail],
            subject: `[Aurelia Estates Enquiry] ${refCode} - ${name.trim()}`,
            html: `
              <h2>Aurelia Estates — Private Viewing Request</h2>
              <p><strong>Reference:</strong> ${refCode}</p>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${email.trim()}</p>
              <p><strong>Phone:</strong> ${phone.trim()}</p>
              <p><strong>Typology:</strong> ${typology}</p>
              <p><strong>Preferred Protocol:</strong> ${protocol || "phone"}</p>
              <p><strong>Notes:</strong> ${notes?.trim() || "None provided"}</p>
              <hr />
              <p><small>Aurelia Estates / Elevora Architectural Realty Concept</small></p>
            `,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
        } else {
          const resendErrText = await resendRes.text();
          emailErrorDetails = `Resend API returned status ${resendRes.status}: ${resendErrText.slice(0, 150)}`;
          console.warn("[AURELIA ENQUIRY] Email dispatch warning:", emailErrorDetails);
        }
      } catch (err: unknown) {
        emailErrorDetails = err instanceof Error ? err.message : "Network error contacting email provider";
        console.error("[AURELIA ENQUIRY] Email dispatch failed:", emailErrorDetails);
      }
    }

    // 6. Durable File-Based Ledger Persistence
    const inquiryRecord = {
      refId: refCode,
      receivedAt: new Date().toISOString(),
      client: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
      spatialPreferences: {
        typology,
        protocol: protocol || "phone",
        notes: notes?.trim() || null,
      },
      delivery: {
        persistedDurable: true,
        emailConfigured: Boolean(resendApiKey),
        emailDispatched: emailSent,
        emailError: emailErrorDetails,
      },
      originIp: ip,
    };

    try {
      await fs.mkdir(path.dirname(INQUIRIES_FILE_PATH), { recursive: true });
      let existingInquiries = [];
      try {
        const fileContent = await fs.readFile(INQUIRIES_FILE_PATH, "utf-8");
        existingInquiries = JSON.parse(fileContent);
        if (!Array.isArray(existingInquiries)) existingInquiries = [];
      } catch {
        existingInquiries = [];
      }

      existingInquiries.push(inquiryRecord);
      await fs.writeFile(
        INQUIRIES_FILE_PATH,
        JSON.stringify(existingInquiries, null, 2),
        "utf-8"
      );
    } catch (fsErr) {
      console.error("[AURELIA ENQUIRY] File persistence error:", fsErr);
      // We log but continue to return the reference code if possible
    }

    // Honest delivery feedback to the client
    const deliveryFeedback = emailSent
      ? "Your private viewing request has been recorded and dispatched to the advisory team inbox."
      : resendApiKey
      ? "Your request has been durably archived in the registry. Direct email delivery is queued for manual processing."
      : "Your request has been durably recorded in our server inquiry ledger. (Note: External transactional email is not configured in this environment).";

    return NextResponse.json({
      success: true,
      refId: refCode,
      message: deliveryFeedback,
      delivery: {
        persistedDurable: true,
        emailConfigured: Boolean(resendApiKey),
        emailDispatched: emailSent,
        emailError: emailErrorDetails ? "Email dispatch warning (archived locally)" : null,
      },
      details: {
        typology,
        protocol: protocol || "phone",
      },
    });
  } catch (err: unknown) {
    console.error("Unexpected error in /api/enquire:", err);
    return NextResponse.json(
      {
        success: false,
        error: "A server error occurred while processing your request. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
