"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

interface PrivateViewingFormProps {
  initialTypology?: string;
}

export const PrivateViewingForm: React.FC<PrivateViewingFormProps> = ({
  initialTypology = "signature",
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [typology, setTypology] = useState(initialTypology);
  const [protocol, setProtocol] = useState<"phone" | "whatsapp" | "concierge">(
    "phone"
  );
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    persistedDurable: boolean;
    emailConfigured: boolean;
    emailDispatched: boolean;
    message?: string;
  } | null>(null);

  // Update selected typology if parent updates it
  useEffect(() => {
    if (initialTypology) {
      setTypology(initialTypology);
    }
  }, [initialTypology]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Full name is required (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim())) {
      errs.phone = "Please enter a valid telephone number.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          typology,
          protocol,
          notes: notes.trim(),
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process viewing appointment request.");
      }

      setSubmittedRef(data.refId || "AE-REGISTERED");
      setDeliveryInfo(data.delivery || null);
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setErrors({});
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please check your connectivity and try again.";
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry-section" className="w-full bg-surface py-space-xl lg:py-space-2xl">
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        <BlurFade delay={0.1} yOffset={10}>
          <div className="max-w-4xl mx-auto bg-surface-container-low border border-secondary/40 p-space-lg sm:p-space-xl shadow-2xl">
            {/* Form Header */}
            <div className="text-center space-y-space-xs mb-space-xl">
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.24em] block text-xs">
                Concept Consultation &amp; Inquiry
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                Explore The Architectural Concept
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Aurelia Estates is a luxury architectural portfolio concept developed by Elevora.
                Share your design inquiries, discuss bespoke digital spatial experiences, or arrange a conversation with our creative team.
              </p>
            </div>

            {/* Success State */}
            {submittedRef ? (
              <div
                className="p-space-lg bg-secondary text-on-secondary text-center space-y-4 shadow-lg"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-secondary-container" />
                </div>
                <p className="font-serif text-2xl uppercase tracking-wide">
                  Consultation Inquiry Recorded
                </p>
                <p className="font-mono text-xs tracking-widest text-secondary-container">
                  REFERENCE CODE: {submittedRef}
                </p>
                <p className="font-sans text-body-sm opacity-95 max-w-lg mx-auto leading-relaxed">
                  {deliveryInfo?.emailDispatched
                    ? "Your consultation inquiry has been recorded and transmitted directly to the Elevora design studio."
                    : "Your inquiry has been recorded in the portfolio demonstration ledger. Thank you for exploring the Aurelia Estates interactive experience."}
                </p>

                {/* Honest Persistence & Delivery Disclosure */}
                {deliveryInfo && !deliveryInfo.emailConfigured && (
                  <div className="p-2.5 bg-black/20 border border-secondary-container/30 text-[11px] font-mono tracking-wider text-secondary-container max-w-lg mx-auto">
                    DEMONSTRATION STATUS: Logged in portfolio registry · (Transactional email pending host environment configuration).
                  </div>
                )}

                <div className="p-3 bg-primary/20 border border-secondary-container/40 text-[11px] font-mono tracking-wider text-secondary-container max-w-lg mx-auto">
                  CONCEPT PORTFOLIO DISCLOSURE: Aurelia Estates is an architectural
                  design exploration presented by Elevora. All specifications and plans
                  are illustrative concepts; no actual physical viewing or statutory
                  real estate transaction is executed.
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setDeliveryInfo(null);
                    }}
                    className="px-6 py-2 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest hover:bg-surface-container hover:text-primary transition-colors"
                  >
                    Submit Another Consultation Request
                  </button>
                </div>
              </div>
            ) : (
              /* The Bespoke Form */
              <form onSubmit={handleSubmit} className="space-y-space-md" noValidate>
                {/* Spam protection honeypot */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {submitError && (
                  <div
                    className="p-3 bg-red-100 border border-error text-error text-xs font-mono flex items-center gap-2"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {/* Full Name */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="client-name"
                      className="font-mono text-label-technical uppercase tracking-widest text-secondary text-xs"
                    >
                      FULL NAME <span className="text-error">*</span>
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }
                      }}
                      placeholder="e.g. Marcus Vance"
                      className={`w-full bg-surface border p-space-sm font-sans text-body-md text-primary placeholder:text-outline focus:outline-none transition-colors ${
                        errors.name
                          ? "border-error focus:border-error"
                          : "border-surface-variant focus:border-primary"
                      }`}
                    />
                    {errors.name && (
                      <span id="name-error" role="alert" className="font-mono text-[11px] text-error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="client-email"
                      className="font-mono text-label-technical uppercase tracking-widest text-secondary text-xs"
                    >
                      EMAIL ADDRESS <span className="text-error">*</span>
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: "" }));
                        }
                      }}
                      placeholder="vance@representative.com"
                      className={`w-full bg-surface border p-space-sm font-sans text-body-md text-primary placeholder:text-outline focus:outline-none transition-colors ${
                        errors.email
                          ? "border-error focus:border-error"
                          : "border-surface-variant focus:border-primary"
                      }`}
                    />
                    {errors.email && (
                      <span id="email-error" role="alert" className="font-mono text-[11px] text-error">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {/* Phone Number */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="client-phone"
                      className="font-mono text-label-technical uppercase tracking-widest text-secondary text-xs"
                    >
                      TELEPHONE NUMBER <span className="text-error">*</span>
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: "" }));
                        }
                      }}
                      placeholder="+91 (0) 98400 00000"
                      className={`w-full bg-surface border p-space-sm font-sans text-body-md text-primary placeholder:text-outline focus:outline-none transition-colors ${
                        errors.phone
                          ? "border-error focus:border-error"
                          : "border-surface-variant focus:border-primary"
                      }`}
                    />
                    {errors.phone && (
                      <span id="phone-error" role="alert" className="font-mono text-[11px] text-error">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Residence Preference */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="client-preference"
                      className="font-mono text-label-technical uppercase tracking-widest text-secondary text-xs"
                    >
                      PREFERRED TYPOLOGY <span className="text-error">*</span>
                    </label>
                    <select
                      id="client-preference"
                      value={typology}
                      onChange={(e) => setTypology(e.target.value)}
                      className="w-full bg-surface border border-surface-variant p-space-sm font-sans text-body-md text-primary focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="garden">01 — Garden Residence (Concept Study)</option>
                      <option value="signature">02 — Signature Residence (Flagship Study)</option>
                      <option value="sky">03 — Sky Penthouse Duplex (Panoramic Study)</option>
                      <option value="undecided">Undecided / Architectural Design Inquiries</option>
                    </select>
                  </div>
                </div>

                {/* Contact Channel Radio options */}
                <div className="flex flex-col space-y-2 pt-space-xs">
                  <span className="font-mono text-label-technical uppercase tracking-widest text-secondary text-xs">
                    PREFERRED PROTOCOL OF CONTACT
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                    <label
                      className={`flex items-center gap-space-xs p-3 bg-surface border cursor-pointer transition-colors ${
                        protocol === "phone"
                          ? "border-secondary bg-surface-container"
                          : "border-surface-variant hover:border-primary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="protocol"
                        value="phone"
                        checked={protocol === "phone"}
                        onChange={() => setProtocol("phone")}
                        className="accent-secondary"
                      />
                      <span className="font-mono text-label-technical uppercase text-on-surface text-xs">
                        Private Telephone Call
                      </span>
                    </label>

                    <label
                      className={`flex items-center gap-space-xs p-3 bg-surface border cursor-pointer transition-colors ${
                        protocol === "whatsapp"
                          ? "border-secondary bg-surface-container"
                          : "border-surface-variant hover:border-primary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="protocol"
                        value="whatsapp"
                        checked={protocol === "whatsapp"}
                        onChange={() => setProtocol("whatsapp")}
                        className="accent-secondary"
                      />
                      <span className="font-mono text-label-technical uppercase text-on-surface text-xs">
                        Secure WhatsApp
                      </span>
                    </label>

                    <label
                      className={`flex items-center gap-space-xs p-3 bg-surface border cursor-pointer transition-colors ${
                        protocol === "concierge"
                          ? "border-secondary bg-surface-container"
                          : "border-surface-variant hover:border-primary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="protocol"
                        value="concierge"
                        checked={protocol === "concierge"}
                        onChange={() => setProtocol("concierge")}
                        className="accent-secondary"
                      />
                      <span className="font-mono text-label-technical uppercase text-on-surface text-xs">
                        Concierge Email Dispatch
                      </span>
                    </label>
                  </div>
                </div>

                {/* Specific Notes or Architectural Inquiries */}
                <div className="flex flex-col space-y-1 pt-space-xs">
                  <label
                    htmlFor="client-notes"
                    className="font-mono text-label-technical uppercase tracking-widest text-secondary text-xs"
                  >
                    SPECIAL INQUIRIES · CUSTOMIZATION OR TIMEFRAME
                  </label>
                  <textarea
                    id="client-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Please share any bespoke volumetric, multi-generational, or delivery requirements..."
                    className="w-full bg-surface border border-surface-variant p-space-sm font-sans text-body-md text-primary placeholder:text-outline focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* Confidentiality Disclosure & Action Button */}
                <div className="pt-space-md border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <div className="flex items-start gap-2 max-w-sm">
                    <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <p className="font-sans text-xs text-outline leading-relaxed">
                      Client details are guarded under non-disclosure protocols.
                      Aurelia Estates is an illustrative architectural portfolio
                      concept presented by Elevora.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-space-xl py-space-sm bg-primary text-on-primary font-mono text-label-md uppercase tracking-[0.2em] hover:bg-surface-tint transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                        <span>Transmitting Request...</span>
                      </>
                    ) : (
                      <span>Request Private Consultation</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
