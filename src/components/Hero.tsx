"use client";

import React, { useRef } from "react";
import { ArrowDown, ArrowRight, Compass } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();

  // Scroll-driven multi-plane depth (hero-depth.md)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Layer transforms: architectural image drifts smoothly within overflow-hidden boundary
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const floatingBadgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-surface pb-space-xl pt-24 lg:pt-28"
    >
      {/* Ambient subtle blueprint grid layer */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#20211F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full px-4 sm:px-gutter lg:px-margin pt-space-md min-w-0">
        {/* Phase A/C: Editorial Overline & Geographic Coordinates */}
        <BlurFade delay={0.1} duration={0.5} yOffset={6} className="w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-md border-b border-surface-variant w-full min-w-0">
            <div className="flex items-center gap-space-xs flex-wrap min-w-0">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse shrink-0" />
              <span className="font-mono text-[9px] sm:text-label-technical tracking-[0.10em] sm:tracking-[0.24em] text-on-surface-variant uppercase break-words">
                Aurelia Estates Private Residences · Folio 2025
              </span>
            </div>
            <div className="flex items-center gap-space-xs flex-wrap text-secondary font-mono text-[9px] sm:text-label-technical tracking-[0.08em] sm:tracking-[0.16em] min-w-0">
              <span className="flex items-center gap-1 shrink-0">
                <Compass className="w-3.5 h-3.5 inline text-secondary shrink-0" />
                13.0827° N, 80.2707° E
              </span>
              <span className="text-surface-variant">·</span>
              <span className="shrink-0">COROMANDEL SEABOARD</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Header Typography & Supporting Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-end pt-space-lg pb-space-lg w-full min-w-0">
          <div className="lg:col-span-8 w-full min-w-0">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-display text-primary leading-[1.08] tracking-tight font-normal break-words">
              <TextAnimate
                by="word"
                delay={0.2}
                duration={0.65}
                stagger={0.06}
                as="span"
              >
                Exceptional spaces.
              </TextAnimate>
              <br />
              <span className="italic font-normal text-secondary font-serif">
                <TextAnimate
                  by="word"
                  delay={0.5}
                  duration={0.65}
                  stagger={0.06}
                  as="span"
                >
                  Extraordinary living.
                </TextAnimate>
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end gap-space-md w-full min-w-0">
            {/* Phase D: Narrative & Action CTA Sequence */}
            <BlurFade delay={0.7} duration={0.6} yOffset={8} className="w-full min-w-0">
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-full sm:max-w-md font-light break-words">
                A considered collection of contemporary residences shaped around
                sculpted light, structural permanence, and the quiet art of living
                well.
              </p>
              <div className="flex flex-wrap items-center gap-space-sm pt-space-md">
                <a
                  href="#residences-section"
                  className="group inline-flex items-center justify-center gap-2 px-space-md sm:px-space-lg py-space-sm bg-primary text-on-primary font-mono text-label-md uppercase tracking-[0.16em] sm:tracking-[0.2em] border border-primary hover:bg-surface hover:text-primary hover:border-primary transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] w-full sm:w-auto text-center"
                >
                  <span>Explore Residences</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#blueprint-section"
                  className="group inline-flex items-center justify-center gap-2 px-space-md sm:px-space-lg py-space-sm border border-secondary text-primary font-mono text-label-md uppercase tracking-[0.16em] sm:tracking-[0.2em] hover:bg-secondary hover:text-on-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:scale-[0.98] w-full sm:w-auto text-center"
                >
                  <span>Discover Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                </a>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Phase B: Monolithic Hero Visual Vessel with Mask Reveal & Multi-Plane Depth */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { clipPath: "inset(5% 3% 5% 3%)", opacity: 0.85 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
          }
          transition={{
            duration: 1.1,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1], // Architectural settle curve
          }}
          className="relative w-full h-[58vh] sm:h-[68vh] min-h-[460px] sm:min-h-[520px] overflow-hidden bg-primary-container shadow-2xl mt-space-sm group border border-surface-variant/40"
        >
          {/* Scroll-transformed Subject Layer */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : imageY,
              scale: shouldReduceMotion ? 1 : imageScale,
            }}
            className="w-full h-[115%] -mt-[5%] relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3SW2DBHv2m-2nVc5RZFsioIeSiwkQ-zrN1xcFSqcGcpLdrTVRoLRvNYiePTDgdUHrF83SDeq7ppmvWUKvOfyftN7rkQmRlkIK8ogC4rFYJBlZwS5gfCn1-96AZY0z6CAUdkPkslquxAnHaOyWLApbxMDvdMVFUni22gWETbyM3KYcp1Lj4PLvlMSv8IuNRX-mYBT8CsXfZBp0ymysL01h1FE60lTcUOE_xBZ2nw-2IDjbd_bsi7sx7A"
              alt="Modern luxury architectural villa at sunset, expansive glass curtain walls framing warm interior salons, seamless limestone terraces surrounding an azure infinity lap pool with tropical frangipani trees silhouetted against a golden hour twilight sky."
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              loading="eager"
            />
          </motion.div>

          {/* Editorial Image Overlays & Atmospheric Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/25 pointer-events-none" />

          {/* Blueprint Callipers overlay with floating depth */}
          <motion.div
            style={{ y: shouldReduceMotion ? 0 : floatingBadgeY }}
            className="absolute top-6 left-6 flex items-center gap-space-sm bg-surface-container-low/85 backdrop-blur-md px-space-sm py-space-xs border border-surface-variant/60 shadow-sm"
          >
            <span className="font-mono text-label-technical text-primary uppercase tracking-[0.16em]">
              VILLA SOVEREIGN · SPEC 01
            </span>
          </motion.div>

          {/* Foreground Architectural Monograph Plane */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-space-sm text-surface-container-lowest">
            <div className="max-w-xl">
              <span className="font-mono text-label-technical tracking-[0.2em] uppercase text-secondary-fixed opacity-90 block mb-1">
                Architectural Study
              </span>
              <p className="font-serif text-lg sm:text-title-editorial leading-snug">
                Monolithic post-tensioned travertine cantilever hovering over
                water courts.
              </p>
            </div>
            <div className="flex items-center gap-space-md font-mono text-label-technical uppercase tracking-widest text-surface-container-high text-xs">
              <span>5,400 – 8,200 SQ. FT.</span>
              <span>•</span>
              <span>LIMITED TO 12 RESIDENCES</span>
            </div>
          </div>
        </motion.div>

        {/* Phase E / Resting State: Coordinates & Interactive Scroll Indicator */}
        <BlurFade delay={0.9} duration={0.5} yOffset={6}>
          <div className="flex items-center justify-between pt-space-md">
            <span className="font-mono text-label-technical text-outline uppercase tracking-[0.2em]">
              01 / 10 · ELEVATION PROSPECTUS
            </span>
            <a
              href="#manifesto-section"
              className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-mono text-label-technical uppercase tracking-widest group"
            >
              <span>Scroll to examine</span>
              <div className="w-12 h-px bg-outline-variant group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
              <ArrowDown className="w-3.5 h-3.5 text-secondary transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
