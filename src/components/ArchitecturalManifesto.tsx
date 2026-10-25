"use client";

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export const ArchitecturalManifesto: React.FC = () => {
  return (
    <section
      id="manifesto-section"
      className="w-full bg-surface-container-low py-space-xl lg:py-space-2xl border-y border-surface-variant/40"
    >
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Vertical Marker & Monograph Footnote */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-space-lg">
            <BlurFade delay={0.1} yOffset={8}>
              <div>
                <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                  Manifesto · Volume 01
                </span>
                <h2 className="font-serif text-3xl lg:text-headline-md text-primary tracking-tight font-normal">
                  <TextAnimate by="word" delay={0.15} duration={0.6} as="span">
                    A Place to Come Home To
                  </TextAnimate>
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} yOffset={8}>
              <div className="p-space-md bg-surface border-l-2 border-secondary shadow-sm">
                <span className="font-mono text-label-technical text-secondary uppercase tracking-widest block mb-1">
                  Design Thesis
                </span>
                <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                  Every conceptual study developed by Elevora explores tactile
                  architectural permanence — balancing thermal comfort, coastal
                  cross-ventilation, and raw geological authenticity in digital
                  spatial design.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} yOffset={6}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-outline">
                AURELIA ESTATES CONCEPT · ARCHIVE REF: AE-2026
              </div>
            </BlurFade>
          </div>

          {/* Asymmetric Editorial Quote */}
          <div className="lg:col-span-8 space-y-space-md">
            <BlurFade delay={0.25} duration={0.7} yOffset={10}>
              <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl text-primary leading-[1.15] tracking-tight font-light">
                “Architecture is more than the spaces we occupy. It is the{" "}
                <span className="italic text-secondary font-serif">light</span> that
                enters a room, the silence of a courtyard, and the profound
                feeling of arriving somewhere that belongs to you.”
              </blockquote>
            </BlurFade>

            <BlurFade delay={0.4} yOffset={8}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-lg border-t border-surface-variant">
                <div>
                  <span className="font-serif text-2xl lg:text-3xl text-primary block font-normal mb-1">
                    Natural Materiality
                  </span>
                  <span className="font-mono text-label-technical uppercase tracking-wider text-on-surface-variant block text-xs">
                    Quarried stone &amp; honed textures
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl lg:text-3xl text-primary block font-normal mb-1">
                    Volumetric Scale
                  </span>
                  <span className="font-mono text-label-technical uppercase tracking-wider text-on-surface-variant block text-xs">
                    Uninterrupted vertical voids &amp; light
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl lg:text-3xl text-primary block font-normal mb-1">
                    Sculpted Daylight
                  </span>
                  <span className="font-mono text-label-technical uppercase tracking-wider text-on-surface-variant block text-xs">
                    Orchestrated coastal solar orientation
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};
