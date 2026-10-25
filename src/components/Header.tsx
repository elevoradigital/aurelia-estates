"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { MobileNavigation } from "./MobileNavigation";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-surface-container-low/95 backdrop-blur-md border-surface-variant/40 shadow-[0_2px_16px_rgba(32,33,31,0.06)] py-3"
            : "bg-surface-container-low/80 backdrop-blur-sm border-transparent py-4"
        }`}
      >
        <div className="w-full px-4 sm:px-gutter lg:px-margin flex items-center justify-between">
          {/* Logo & Monograph */}
          <div className="flex items-center gap-space-sm">
            <a
              href="#"
              className="group flex flex-col items-start focus:outline-none focus:ring-1 focus:ring-secondary transition-transform active:scale-[0.99]"
            >
              <span className="font-serif text-2xl tracking-tight text-primary leading-none uppercase font-normal">
                Aurelia
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">
                Estates · Elevora
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links with Architectural Underline Motion */}
          <nav
            className="hidden lg:flex items-center gap-space-lg"
            aria-label="Main Navigation"
          >
            <a
              href="#residences-section"
              className="group relative py-1 font-mono text-label-md uppercase tracking-wider text-primary font-medium hover:text-secondary transition-colors"
            >
              <span>The Residences</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </a>
            <a
              href="#manifesto-section"
              className="group relative py-1 font-mono text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
            >
              <span>Architecture</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </a>
            <a
              href="#location-section"
              className="group relative py-1 font-mono text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
            >
              <span>The Location</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </a>
            <a
              href="#principles-section"
              className="group relative py-1 font-mono text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
            >
              <span>Our Approach</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </a>
          </nav>

          {/* Action CTAs & Profile/Insignia */}
          <div className="flex items-center gap-space-md">
            <a
              href="#enquiry-section"
              className="hidden sm:inline-flex items-center px-space-md py-space-xs rounded-full bg-surface-container border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all duration-300 font-mono text-label-md uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:scale-[0.98] shadow-sm hover:shadow"
            >
              Arrange a Private Viewing
            </a>

            {/* Architectural Profile Insignia */}
            <div
              className="w-8 h-8 rounded-full border border-secondary/40 overflow-hidden hidden sm:block transition-transform duration-300 hover:scale-105"
              title="Aurelia Private Client Services"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WOhPO8z8HkeOU6io_SJTdW_877Gj8d4iDATSNjKp6a0t9UiWNuX-y06G3t4CuufqHdKnMM5hMph7eMC4liISYhwG-QhHbDiOVI8R8OO85EM9N3gkjnc7OJkXjWFamphtneT7t_am3ujwcLAVLMbBeSgPIec-sEveJtIxohzwxIYLe6hVmr-U5aIGfee5iRIIWbKALs_lTABEHyZZWJxAUw5imZ3ujvG_9xQkuGXP-FXML06zr8BfAYN1jc"
                alt="Aurelia Architectural Client Concierge"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden p-2 text-primary hover:text-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
