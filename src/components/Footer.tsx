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
              AURELIA ESTATES IS AN ARCHITECTURAL CONCEPT PORTFOLIO PROJECT DEVELOPED BY ELEVORA. PROPERTY DETAILS AND DIMENSIONS ARE ARTISTICALLY ILLUSTRATIVE.
            </p>
            <p className="font-mono text-label-technical uppercase tracking-[0.12em] text-on-surface-variant">
              © 2026 ELEVORA. DIGITAL CONCEPT &amp; WEB EXPERIENCE STUDY. ALL RIGHTS RESERVED.
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
                  Privacy Notice &amp; Demonstration Data Handling
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    Aurelia Estates is a creative digital portfolio concept
                    presented by Elevora.
                  </p>
                  <p>
                    Any contact information submitted through this website
                    demonstration is handled responsibly and used solely to
                    demonstrate the platform&apos;s interactive inquiry flow or
                    respond to creative portfolio inquiries.
                  </p>
                  <p>
                    We do not sell, rent, or distribute submitted contact
                    details to commercial third-party marketing services.
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
                    portfolio concept created by Elevora to showcase luxury web
                    design, motion craftsmanship, and spatial storytelling.
                  </p>
                  <p>
                    Elevora is a digital growth and design studio. Elevora is
                    not a registered real estate broker, builder, contractor, or
                    property developer, and does not operate or construct physical
                    residences.
                  </p>
                  <p>
                    All renderings, massing studies, floor plans, dimensions,
                    materials, square footage references, and geographic studies
                    are artistic visualizations and conceptual illustrations. They
                    do not constitute a commercial offer, investment prospectus, or
                    approved development proposal.
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
                  Architectural Specifications Framework
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    The structural design framework explores the integration of
                    post-tensioned stone planes, deep solar shading cantilevers,
                    and expansive acoustic glass curtain walls.
                  </p>
                  <p>
                    All architectural parameters, floor areas, spatial
                    proportions, and material compositions presented throughout
                    this portfolio are conceptual design studies intended to
                    illustrate high-end residential form and atmospheric lighting.
                  </p>
                </div>
              </div>
            )}

            {activeModal === "protocol" && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-1">
                  Studio Inquiry Standard
                </span>
                <h3 className="font-serif text-2xl text-primary mb-4 font-normal">
                  Digital Studio Inquiries
                </h3>
                <div className="font-sans text-sm text-on-surface-variant space-y-3 leading-relaxed">
                  <p>
                    This digital experience was crafted by Elevora to demonstrate
                    award-winning UI/UX design, interactive CAD floor plan
                    interfaces, and quiet luxury motion systems.
                  </p>
                  <p>
                    For design collaborations, web development commissions, or
                    creative consultations, please submit an inquiry through our
                    consultation form.
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
