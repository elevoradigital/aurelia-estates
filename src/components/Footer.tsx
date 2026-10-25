"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<
    "privacy" | "legal" | "specs" | "protocol" | null
  >(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveModal(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeModal]);

  return (
    <>
      <footer className="w-full bg-surface-container-low py-space-xl border-t border-surface-variant/40">
        <div className="w-full px-4 sm:px-gutter lg:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg mb-space-xl">
            {/* Brand identity column */}
            <div className="md:col-span-5 flex flex-col justify-between pr-space-md">
              <div className="mb-space-md">
                <span className="font-serif text-2xl lg:text-headline-sm text-primary tracking-tight block uppercase mb-space-xs font-normal">
                  Aurelia Estates
                </span>
                <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-sm text-xs">
                  Curated by Elevora
                </span>
                <p className="font-serif text-title-editorial text-on-surface max-w-sm italic leading-relaxed">
                  Exceptional Spaces. Extraordinary Living.
                </p>
              </div>
              <p className="font-sans text-body-sm text-on-surface-variant max-w-md leading-relaxed">
                A bespoke portfolio of architectural residences crafted for
                generational permanence, tactile material purity, and quiet spatial
                sovereignty.
              </p>
            </div>

            {/* Nav link columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-space-md">
              {/* Curation */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.16em] mb-space-xs text-xs">
                  Curation
                </span>
                <a
                  href="#residences-section"
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs"
                >
                  The Residences
                </a>
                <a
                  href="#manifesto-section"
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs"
                >
                  Architecture
                </a>
                <a
                  href="#location-section"
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs"
                >
                  The Location
                </a>
              </div>

              {/* Philosophy */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.16em] mb-space-xs text-xs">
                  Philosophy
                </span>
                <a
                  href="#principles-section"
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs"
                >
                  Our Approach
                </a>
                <a
                  href="#enquiry-section"
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs"
                >
                  Private Inquiries
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModal("protocol")}
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs text-left"
                >
                  Client Protocol
                </button>
              </div>

              {/* Governance */}
              <div className="flex flex-col gap-space-xs col-span-2 sm:col-span-1">
                <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.16em] mb-space-xs text-xs">
                  Governance
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs text-left"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("legal")}
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs text-left"
                >
                  Legal Notice
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("specs")}
                  className="font-mono text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors text-xs text-left"
                >
                  Specifications
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Concept Notice */}
          <div className="pt-space-md border-t border-surface-variant/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-space-sm text-[11px]">
            <p className="font-mono text-label-technical uppercase tracking-[0.12em] text-on-surface-variant">
              AURELIA ESTATES IS A CONCEPT PROJECT PRESENTED BY ELEVORA. PROPERTY
              DETAILS ARE ILLUSTRATIVE.
            </p>
            <p className="font-mono text-label-technical uppercase tracking-[0.12em] text-on-surface-variant">
              © 2025 ELEVORA ARCHITECTURAL REALTY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {/* Governance & Information Modals */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-secondary w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1 text-primary hover:text-secondary transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === "privacy" && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-1">
                  Governance Protocol
                </span>
                <h3 className="font-serif text-2xl text-primary mb-4 font-normal">
                  Privacy Policy &amp; Non-Disclosure
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    Aurelia Estates operates under absolute non-disclosure
                    standards for all private residential clientele and family
                    offices.
                  </p>
                  <p>
                    Inquiry information collected through this digital portal is
                    utilized strictly to coordinate one-on-one architectural
                    consultations. We never sell, exchange, or publicly register
                    prospective client records.
                  </p>
                  <p>
                    All communications are encrypted end-to-end via secure
                    channels in compliance with global data sovereignty
                    standards.
                  </p>
                </div>
              </div>
            )}

            {activeModal === "legal" && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-1">
                  Regulatory Notice
                </span>
                <h3 className="font-serif text-2xl text-primary mb-4 font-normal">
                  Legal Disclaimer &amp; Portfolio Notice
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    Aurelia Estates is an architectural exploration and creative
                    portfolio concept presented by Elevora.
                  </p>
                  <p>
                    All renderings, massing studies, floor plans, dimensions,
                    materials, square footage, and pricing references are
                    artistic visualizations and conceptual illustrations. They do
                    not constitute a binding commercial offer or approved
                    statutory development prospectus.
                  </p>
                </div>
              </div>
            )}

            {activeModal === "specs" && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-1">
                  Technical Standard
                </span>
                <h3 className="font-serif text-2xl text-primary mb-4 font-normal">
                  Architectural Specifications Standard
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    Structural design utilizes post-tensioned limestone slabs,
                    unreinforced solid masonry infill, and thermally isolated
                    double-envelope facades.
                  </p>
                  <p>
                    Glazing specifications require low-iron crystal clarity with
                    spectrally selective Low-E coatings (U-factor &lt; 0.28, SHGC
                    &lt; 0.22) and acoustic STC ratings exceeding 52 dB across
                    ocean-facing facades.
                  </p>
                </div>
              </div>
            )}

            {activeModal === "protocol" && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-1">
                  Private Client Standard
                </span>
                <h3 className="font-serif text-2xl text-primary mb-4 font-normal">
                  Advisory Protocol
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    Consultations are held in private salons or on-site by
                    appointment only. Each principal client is assigned a
                    dedicated Elevora architectural director throughout the
                    spatial customization and bespoke detailing phase.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-surface-variant flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
