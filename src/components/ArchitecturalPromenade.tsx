"use client";

import React, { useState } from "react";
import { PROMENADE_HOTSPOTS, Hotspot } from "@/data/residences";
import { Eye, Info, Sun, Sunset, Sunrise } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const ArchitecturalPromenade: React.FC = () => {
  const [daylightMode, setDaylightMode] = useState<"dusk" | "noon" | "dawn">(
    "dusk"
  );
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Filter effect according to daylight mode
  const getFilterStyle = () => {
    switch (daylightMode) {
      case "noon":
        return "brightness-105 contrast-100 saturate-110";
      case "dawn":
        return "brightness-95 contrast-100 hue-rotate-[15deg] saturate-95";
      case "dusk":
      default:
        return "brightness-95 contrast-105 saturate-105";
    }
  };

  return (
    <section id="promenade-section" className="w-full bg-surface py-space-xl lg:py-space-2xl">
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        {/* Section Header with BlurFade */}
        <BlurFade delay={0.1} yOffset={8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                Virtual Walkthrough · Digital Twin
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                The Architectural Promenade
              </h2>
            </div>
            <div className="flex items-center gap-space-sm font-mono text-label-technical uppercase tracking-widest text-on-surface-variant text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span>Interactive Massing Study</span>
            </div>
          </div>
        </BlurFade>

        {/* 3D Pavilion Frame Container with Hotspots & BlurFade */}
        <BlurFade delay={0.2} duration={0.8} yOffset={12}>
          <div className="relative w-full h-[520px] sm:h-[620px] bg-primary-container overflow-hidden group shadow-2xl border border-surface-variant">
            {/* Main Visual Image with Dynamic Daylight Transition */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk1M4Na4r4pgmuKwKnKK1soev78eVFGyr1gBMfYzkITihcldY502W5uT6kYd8DHtCxiLj8h1vXAtcbFKyxdd7p1NOsTckTqQfywfaAM-0UzLnQCSYxrs5RVSNaBScVxNXhf83UW5nPhFkZ9SZy5JAqTNBswb5QbafZtioMjmKlJ7ugay_tErtajuunQFoDsj7bpSqf5L6lk5Oo8XrLDpxLEq6X0KMHuUkg3z6NThSxnYzmdIOVgideHg"
              alt="Dusk perspective of a modernist architectural residence with illuminated travertine cantilever, reflection pool, floor-to-ceiling glass pavilions, and lush sculptural frangipani landscaping."
              className={`w-full h-full object-cover transition-all duration-1000 ${getFilterStyle()}`}
              loading="lazy"
            />

            {/* Daylight Shift Atmosphere Overlay */}
            {daylightMode === "dusk" && (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-amber-900/10 pointer-events-none transition-all duration-700" />
            )}
            {daylightMode === "dawn" && (
              <div className="absolute inset-0 bg-rose-950/15 mix-blend-color pointer-events-none transition-all duration-700" />
            )}
            {daylightMode === "noon" && (
              <div className="absolute inset-0 bg-amber-100/10 mix-blend-screen pointer-events-none transition-all duration-700" />
            )}

            {/* Top Status Bar overlay */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pointer-events-none">
              <div className="bg-surface/90 backdrop-blur-md px-space-md py-space-xs border border-surface-variant shadow-sm inline-block">
                <span className="font-mono text-label-technical uppercase tracking-widest text-primary font-bold text-xs">
                  MODEL: AURELIA VILLA 07
                </span>
                <span className="text-secondary ml-2 font-mono text-label-technical text-xs">
                  • {daylightMode.toUpperCase()} SHIFT
                </span>
              </div>

              {/* Daylight simulation buttons */}
              <div className="bg-surface/90 backdrop-blur-md px-space-md py-space-xs border border-surface-variant flex items-center gap-space-sm pointer-events-auto shadow-sm self-start sm:self-auto">
                <button
                  onClick={() => setDaylightMode("dusk")}
                  className={`font-mono text-label-technical uppercase tracking-wider text-xs transition-colors flex items-center gap-1 ${
                    daylightMode === "dusk"
                      ? "text-primary font-bold underline underline-offset-4 decoration-secondary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5 text-secondary" />
                  <span>DUSK</span>
                </button>
                <span className="text-surface-variant">|</span>
                <button
                  onClick={() => setDaylightMode("noon")}
                  className={`font-mono text-label-technical uppercase tracking-wider text-xs transition-colors flex items-center gap-1 ${
                    daylightMode === "noon"
                      ? "text-primary font-bold underline underline-offset-4 decoration-secondary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-secondary" />
                  <span>NOON</span>
                </button>
                <span className="text-surface-variant">|</span>
                <button
                  onClick={() => setDaylightMode("dawn")}
                  className={`font-mono text-label-technical uppercase tracking-wider text-xs transition-colors flex items-center gap-1 ${
                    daylightMode === "dawn"
                      ? "text-primary font-bold underline underline-offset-4 decoration-secondary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <Sunrise className="w-3.5 h-3.5 text-secondary" />
                  <span>DAWN</span>
                </button>
              </div>
            </div>

            {/* Hotspots */}
            {PROMENADE_HOTSPOTS.map((hotspot: Hotspot) => {
              const isActive = activeHotspot === hotspot.id;

              return (
                <div
                  key={hotspot.id}
                  className="absolute z-20"
                  style={{ top: hotspot.top, left: hotspot.left }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveHotspot(isActive ? null : hotspot.id)
                    }
                    onMouseEnter={() => setActiveHotspot(hotspot.id)}
                    aria-expanded={isActive}
                    aria-label={`Inspect ${hotspot.title}`}
                    className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-mono text-xs border-2 border-secondary shadow-xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {hotspot.number}
                  </button>

                  {/* Popover */}
                  <div
                    className={`absolute w-60 sm:w-72 bg-surface/95 backdrop-blur-md p-space-sm border border-secondary shadow-2xl transition-all duration-300 z-30 ${
                      parseInt(hotspot.left) > 50 ? "right-0 sm:right-auto sm:left-0" : "left-0"
                    } ${
                      parseInt(hotspot.top) > 60 ? "bottom-10" : "top-10"
                    } ${
                      isActive
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none translate-y-1"
                    }`}
                  >
                    <span className="font-mono text-label-technical text-secondary uppercase tracking-widest block mb-1 text-[10px]">
                      {hotspot.subtitle}
                    </span>
                    <h4 className="font-serif text-title-editorial text-primary mb-1 font-medium">
                      {hotspot.title}
                    </h4>
                    <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                      {hotspot.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm bg-surface-container-low/90 backdrop-blur-md p-space-sm border border-surface-variant">
              <div className="flex items-center gap-space-md font-mono text-label-technical uppercase tracking-wider text-on-surface text-xs">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-secondary" />
                  Camera: Orbit 32° Elevation
                </span>
                <span className="text-surface-variant">•</span>
                <span>Focal Length: 35mm Prime</span>
              </div>
              <div className="flex items-center gap-space-sm text-xs font-mono text-outline uppercase tracking-widest">
                <Info className="w-3.5 h-3.5 text-secondary" />
                <span>Click or hover numbered pins to inspect architecture</span>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
