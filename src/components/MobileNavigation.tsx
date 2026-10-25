"use client";

import React, { useEffect } from "react";
import { X, ArrowRight, ShieldCheck, MapPin, Compass } from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-surface/98 backdrop-blur-2xl transition-all duration-300 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
    >
      {/* Top Bar */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-surface-variant">
        <div className="flex flex-col">
          <span className="font-serif text-xl tracking-tight uppercase text-primary font-medium">
            Aurelia
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
            Estates · Elevora
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-primary hover:text-secondary transition-colors focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <nav className="flex flex-col space-y-6">
          <a
            href="#residences-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>The Residences</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              01
            </span>
          </a>
          <a
            href="#manifesto-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>Architecture &amp; Manifesto</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              02
            </span>
          </a>
          <a
            href="#blueprint-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>CAD Blueprints</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              03
            </span>
          </a>
          <a
            href="#promenade-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>Architectural Promenade</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              04
            </span>
          </a>
          <a
            href="#materials-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>Tactile Materiality</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              05
            </span>
          </a>
          <a
            href="#amenities-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>The Amenities</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              06
            </span>
          </a>
          <a
            href="#location-section"
            onClick={onClose}
            className="group flex items-center justify-between text-2xl font-serif text-primary hover:text-secondary transition-colors"
          >
            <span>The Location</span>
            <span className="text-xs font-mono tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              07
            </span>
          </a>
        </nav>

        {/* Footer info in drawer */}
        <div className="pt-8 border-t border-surface-variant flex flex-col space-y-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-secondary" />
              13.0827° N, 80.2707° E
            </span>
            <span>Coromandel Seaboard</span>
          </div>

          <a
            href="#enquiry-section"
            onClick={onClose}
            className="w-full py-4 px-6 bg-primary text-on-primary font-mono text-xs uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
          >
            <span>Arrange a Private Viewing</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-wider text-outline uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>By Private Appointment Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
