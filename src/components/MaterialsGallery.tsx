"use client";

import React, { useState, useEffect } from "react";
import { MATERIAL_SPECS, MaterialSpec } from "@/data/residences";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "@/lib/motion";

export const MaterialsGallery: React.FC = () => {
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState<number | null>(
    null
  );

  const activeSpecimen: MaterialSpec | null =
    activeSpecimenIndex !== null ? MATERIAL_SPECS[activeSpecimenIndex] : null;

  const handleNext = () => {
    if (activeSpecimenIndex !== null) {
      setActiveSpecimenIndex(
        (activeSpecimenIndex + 1) % MATERIAL_SPECS.length
      );
    }
  };

  const handlePrev = () => {
    if (activeSpecimenIndex !== null) {
      setActiveSpecimenIndex(
        (activeSpecimenIndex - 1 + MATERIAL_SPECS.length) %
          MATERIAL_SPECS.length
      );
    }
  };

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (activeSpecimenIndex !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveSpecimenIndex(null);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeSpecimenIndex]);

  return (
    <section
      id="materials-section"
      className="w-full bg-surface-container-low py-space-xl lg:py-space-2xl border-t border-surface-variant/40"
    >
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        {/* Section Header with BlurFade & TextAnimate */}
        <BlurFade delay={0.1} yOffset={8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                Tactile Materiality
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                <TextAnimate by="word" delay={0.15} duration={0.6} as="span">
                  Form Follows Feeling
                </TextAnimate>
              </h2>
            </div>
            <p className="font-sans text-body-md text-on-surface-variant max-w-md">
              Materials selected for how they age across generations: quarry-honed
              travertine, brushed champagne bronze, and weathered charcoal timber.
            </p>
          </div>
        </BlurFade>

        {/* Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
          {MATERIAL_SPECS.map((spec, idx) => (
            <div
              key={spec.specNumber}
              className={`${spec.colSpanDesktop} flex flex-col`}
            >
              <BlurFade delay={0.15 + idx * 0.1} yOffset={10} className="h-full">
                <div
                  onClick={() => setActiveSpecimenIndex(idx)}
                  className="bg-surface border border-surface-variant overflow-hidden group shadow-sm flex flex-col justify-between h-full cursor-pointer hover:border-secondary transition-all duration-300"
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-primary-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={spec.image}
                      alt={spec.altText}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-space-xs py-1 font-mono text-label-technical uppercase tracking-widest text-primary text-[10px] border border-surface-variant/50">
                      {spec.specNumber} · {spec.category}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary/80 text-on-primary p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <Maximize2 className="w-4 h-4 text-secondary-fixed" />
                    </div>
                  </div>

                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                        <h3 className="font-serif text-xl sm:text-title-editorial text-primary font-medium group-hover:text-secondary transition-colors">
                          {spec.title}
                        </h3>
                        <span className="font-mono text-label-technical text-secondary uppercase tracking-widest text-xs">
                          {spec.subtitle}
                        </span>
                      </div>
                      <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Specimen Lightbox Modal */}
      <AnimatePresence>
        {activeSpecimen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveSpecimenIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Specimen details: ${activeSpecimen.title}`}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-secondary/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-surface-variant">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary block">
                    {activeSpecimen.specNumber} · {activeSpecimen.category}
                  </span>
                  <h3 className="font-serif text-2xl text-primary font-normal">
                    {activeSpecimen.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSpecimenIndex(null)}
                  className="p-2 text-primary hover:text-secondary transition-colors focus:outline-none"
                  aria-label="Close specimen viewer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="relative h-[380px] sm:h-[460px] bg-primary-container overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeSpecimen.image}
                  alt={activeSpecimen.altText}
                  className="w-full h-full object-cover"
                />

                {/* Prev / Next controls */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous material specimen"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/85 backdrop-blur-md border border-surface-variant text-primary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next material specimen"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/85 backdrop-blur-md border border-surface-variant text-primary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Specimen Description */}
              <div className="p-6 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="max-w-xl">
                  <span className="font-mono text-xs text-secondary uppercase tracking-widest block mb-1">
                    Material Specification Standard
                  </span>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {activeSpecimen.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs text-outline uppercase tracking-wider">
                  <span>
                    Specimen {activeSpecimenIndex! + 1} of{" "}
                    {MATERIAL_SPECS.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
