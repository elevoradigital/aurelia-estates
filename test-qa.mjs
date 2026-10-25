// Aurelia Estates — Quality Assurance Automated Test Suite
const BASE_URL = "http://localhost:3000";

async function fetchRoute(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, headers: res.headers, text, json };
}

async function runTests() {
  console.log("==================================================");
  console.log(" AURELIA ESTATES — COMPLETE QA & VERIFICATION SUITE");
  console.log("==================================================\n");

  let totalTests = 0;
  let passedTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passedTests++;
    } else {
      console.error(`  [FAIL] ${message}`);
    }
  }

  // 1. Root Homepage & Critical DOM Elements
  console.log("1. Verifying Root Page (HTTP 200 & Core Sections)...");
  const home = await fetchRoute("/");
  assert(home.status === 200, "Home page returned HTTP 200 OK");
  assert(home.text.includes("Aurelia Estates"), "Brand title present in HTML");
  assert(home.text.includes("Exceptional spaces."), "Hero headline present");
  assert(home.text.includes("Extraordinary living."), "Hero subclause present");
  assert(home.text.includes("residences-section"), "Residences section ID present");
  assert(home.text.includes("manifesto-section"), "Manifesto section ID present");
  assert(home.text.includes("blueprint-section"), "Interactive Blueprint section ID present");
  assert(home.text.includes("promenade-section"), "Promenade section ID present");
  assert(home.text.includes("materials-section"), "Materials section ID present");
  assert(home.text.includes("amenities-section"), "Amenities section ID present");
  assert(home.text.includes("location-section"), "Location section ID present");
  assert(home.text.includes("enquiry-section"), "Private Viewing Form section ID present");
  assert(home.text.includes("AURELIA ESTATES IS AN ARCHITECTURAL CONCEPT"), "Illustrative concept disclaimer present");
  assert(home.text.includes("application/ld+json"), "SEO Schema.org JSON-LD structured data script present");

  // 2. SEO & Crawler Endpoints
  console.log("\n2. Verifying SEO robots.txt and sitemap.xml...");
  const robots = await fetchRoute("/robots.txt");
  assert(robots.status === 200, "robots.txt returned HTTP 200 OK");
  assert(robots.text.includes("User-Agent: *"), "robots.txt permits indexing");
  assert(robots.text.includes("sitemap.xml"), "robots.txt points to sitemap");

  const sitemap = await fetchRoute("/sitemap.xml");
  assert(sitemap.status === 200, "sitemap.xml returned HTTP 200 OK");
  assert(sitemap.text.includes("https://aureliaestates.elevora.com"), "sitemap.xml contains canonical URL");

  // 3. API /api/enquire - Form & Security Validation
  console.log("\n3. Verifying /api/enquire Endpoint Robustness & Security...");
  
  // 3a. Valid Submission
  const validPayload = {
    name: "Arch. Julian Vance",
    email: "julian.vance@elevora-demo.com",
    phone: "+44 20 7946 0192",
    typology: "signature",
    protocol: "whatsapp",
    notes: "Requesting private consultation for Coromandel residence.",
    honeypot: "",
  };
  const validRes = await fetchRoute("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validPayload),
  });
  assert(validRes.status === 200, "Valid inquiry returns HTTP 200 OK");
  assert(validRes.json?.success === true, "Response indicates success = true");
  assert(typeof validRes.json?.refId === "string" && validRes.json.refId.startsWith("AE-"), "Unique reference code generated (AE-XXXXX)");
  assert(validRes.json?.delivery?.persistedDurable === true, "Enquiry reports durable storage confirmation (persistedDurable: true)");
  assert(validRes.json?.delivery?.emailConfigured !== undefined, "Honest transparency of transactional email configuration");

  // 3b. Invalid Name Validation
  const invalidNameRes = await fetchRoute("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...validPayload, name: " " }),
  });
  assert(invalidNameRes.status === 400, "Missing or blank name rejected with HTTP 400");
  assert(invalidNameRes.json?.details?.name !== undefined, "Validation error details highlight name field");

  // 3c. Invalid Email Validation
  const invalidEmailRes = await fetchRoute("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...validPayload, email: "invalid-email-string" }),
  });
  assert(invalidEmailRes.status === 400, "Malformed email rejected with HTTP 400");
  assert(invalidEmailRes.json?.details?.email !== undefined, "Validation error details highlight email field");

  // 3d. Invalid Phone Validation
  const invalidPhoneRes = await fetchRoute("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...validPayload, phone: "abc" }),
  });
  assert(invalidPhoneRes.status === 400, "Invalid phone number rejected with HTTP 400");

  // 3e. Invalid Typology Validation
  const invalidTypologyRes = await fetchRoute("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...validPayload, typology: "penthouse-mega-suite" }),
  });
  assert(invalidTypologyRes.status === 400, "Unrecognized typology rejected with HTTP 400");

  // 3f. Honeypot Spam Protection
  const botRes = await fetchRoute("/api/enquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...validPayload, honeypot: "https://spam-bot.online" }),
  });
  assert(botRes.status === 200, "Honeypot trap catches bot quietly (HTTP 200)");
  assert(botRes.json?.refId === "AE-BOT-IGNORED", "Honeypot safely discards submission without processing");

  // 3g. Trigger Rate Limiting by sending rapid requests until quota is reached
  console.log("\n4. Verifying Rate Limiting Protection...");
  let rateLimited = false;
  const rateLimitTestIp = `198.51.100.${Math.floor(Math.random() * 200 + 10)}`;
  for (let i = 0; i < 15; i++) {
    const burstRes = await fetchRoute("/api/enquire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": rateLimitTestIp,
      },
      body: JSON.stringify(validPayload),
    });
    if (burstRes.status === 429) {
      rateLimited = true;
      break;
    }
  }
  assert(rateLimited, "Rate limiter triggers HTTP 429 when rapid burst threshold is reached");

  console.log("\n==================================================");
  console.log(` SUMMARY: ${passedTests} / ${totalTests} QA CHECKS PASSED`);
  console.log("==================================================");

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
