"use client";

import React from "react";
import { CONNECTIVITY_ITEMS } from "@/data/residences";
import { MapPin, Navigation } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const LocationSection: React.FC = () => {
  return (
    <section
      id="location-section"
      className="w-full bg-surface-container-low py-space-xl lg:py-space-2xl border-t border-surface-variant/40"
    >
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Location Narrative */}
          <div className="lg:col-span-5 space-y-space-md">
            <BlurFade delay={0.1} yOffset={8}>
              <div>
                <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                  The Enclave
                </span>
                <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                  Connected to What Matters
                </h2>
              </div>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Perched along the serene Coromandel maritime corridor in Chennai,
                Aurelia Estates affords unobstructed coastal sea breezes, proximate
                access to elite diplomatic enclaves, and absolute privacy behind
                private entry gates.
              </p>
            </BlurFade>

            {/* Connectivity Table */}
            <BlurFade delay={0.2} yOffset={8}>
              <div className="space-y-space-sm pt-space-md border-t border-surface-variant">
                {CONNECTIVITY_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-2.5 font-mono text-label-technical uppercase text-xs ${
                      idx < CONNECTIVITY_ITEMS.length - 1
                        ? "border-b border-surface-variant/60"
                        : ""
                    }`}
                  >
                    <span className="text-on-surface-variant">
                      {item.destination}
                    </span>
                    <span className="text-primary font-bold">{item.duration}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Architectural Map Display */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.25} duration={0.8} yOffset={10}>
              <div className="relative w-full h-[420px] sm:h-[480px] bg-primary border border-surface-variant overflow-hidden group shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjq5CDPmhQhxJPIqM9adjmQy2BkGzj4NpnpBjP2F4YwNmte455q_SFl-HcZzNYe56DHTqApsfSxSw0UTy1QCe36Qqm8BK31fKbYQiyRPKulLBSFaOqwEJLR45PIsjNGrJgLZ4uHY_PItnVgQKCf7UYOkTOFQJdEkSBeMLgvViBtf4YrStKNx8Hff8bQZqXJLrYLl8h-A3_J94BBvwL_2ISMcoF34gLiyE5NLfsRU4nhEpBNTSA1RXEIA"
                  alt="Architectural location map rendering of Coromandel Seaboard and East Coast Road enclave in Chennai, India."
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 pointer-events-none" />

                {/* Pulsing Location Target Ring */}
                <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-secondary animate-ping opacity-75" />
                  <div className="w-4 h-4 rounded-full bg-secondary absolute top-4 left-4 -translate-x-1/2 -translate-y-1/2 shadow-lg" />
                </div>

                {/* Architectural Map Pin Card */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-surface/95 backdrop-blur-md p-space-md border border-secondary shadow-2xl max-w-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span className="font-mono text-label-technical text-secondary uppercase tracking-widest text-[10px]">
                      Aurelia Sanctuary
                    </span>
                  </div>
                  <h4 className="font-serif text-title-editorial text-primary mb-1 font-medium">
                    Seaward Road Corridor
                  </h4>
                  <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                    Private gated access off the coastal arterial, buffered by
                    mature maritime casuarina groves.
                  </p>
                  <div className="mt-3 pt-2 border-t border-surface-variant/40 flex items-center justify-between font-mono text-[10px] text-outline uppercase tracking-wider">
                    <span>13.0827° N, 80.2707° E</span>
                    <span className="flex items-center gap-1 text-secondary">
                      <Navigation className="w-3 h-3" /> Chennai Coast
                    </span>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};
