"use client";

import React, { useState, useEffect } from "react";
import { RESIDENCES } from "@/data/residences";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShineBorder } from "@/components/magicui/shine-border";
import { TextAnimate } from "@/components/magicui/text-animate";

interface ResidenceShowcaseProps {
  selectedResidenceId?: "garden" | "signature" | "sky";
  onSelectResidenceForBlueprint: (id: "garden" | "signature" | "sky") => void;
  onSelectResidenceForEnquiry: (id: string) => void;
}

export const ResidenceShowcase: React.FC<ResidenceShowcaseProps> = ({
  selectedResidenceId = "signature",
  onSelectResidenceForBlueprint,
  onSelectResidenceForEnquiry,
}) => {
  const [activeResidenceId, setActiveResidenceId] = useState<
    "garden" | "signature" | "sky"
  >(selectedResidenceId);

  useEffect(() => {
    setActiveResidenceId(selectedResidenceId);
  }, [selectedResidenceId]);

  const handleCardClick = (id: "garden" | "signature" | "sky") => {
    setActiveResidenceId(id);
    onSelectResidenceForBlueprint(id);
  };

  const handleViewFloorPlan = (
    e: React.MouseEvent,
    id: "garden" | "signature" | "sky"
  ) => {
    e.stopPropagation();
    setActiveResidenceId(id);
    onSelectResidenceForBlueprint(id);
    const element = document.getElementById("blueprint-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnquire = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onSelectResidenceForEnquiry(id);
    const element = document.getElementById("enquiry-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="residences-section"
      className="w-full bg-surface-container-low py-space-xl lg:py-space-2xl"
    >
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        {/* Section Title & Meta with TextAnimate */}
        <BlurFade delay={0.1} yOffset={8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                The Typologies
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                <TextAnimate by="word" delay={0.15} duration={0.6} as="span">
                  Find Your Place
                </TextAnimate>
              </h2>
            </div>
            <p className="font-sans text-body-md text-on-surface-variant max-w-lg">
              Three distinctive spatial archetypes meticulously oriented around
              landscape courtyards, reflecting pools, and unobstructed skyline
              horizons.
            </p>
          </div>
        </BlurFade>

        {/* Residence Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {RESIDENCES.map((residence, idx) => {
            const isSelected = activeResidenceId === residence.id;
            const isFlagship = residence.isFlagship;

            const cardContent = (
              <div
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Select ${residence.name} typology`}
                onClick={() => handleCardClick(residence.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(residence.id);
                  }
                }}
                className={`bg-surface flex flex-col justify-between group overflow-hidden relative cursor-pointer h-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary ${
                  isSelected
                    ? "shadow-2xl ring-1 ring-secondary/50"
                    : "border border-surface-variant shadow-sm hover:border-secondary/60 hover:shadow-md"
                }`}
              >
                {/* Flagship Badge */}
                {isFlagship && (
                  <div className="absolute top-0 right-0 bg-secondary text-on-secondary font-mono text-label-technical px-space-sm py-1 uppercase tracking-widest z-10 text-[10px]">
                    FLAGSHIP TYPOLOGY
                  </div>
                )}

                {/* Image Container with subtle zoom on hover */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-primary-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={residence.heroImage}
                    alt={residence.altText}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary font-mono text-label-technical px-space-xs py-1 uppercase tracking-widest text-[10px]">
                    {residence.number} · {residence.level}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1 font-mono text-label-technical text-primary uppercase tracking-wider text-[11px] border border-surface-variant/40">
                    {residence.totalArea.split(" (")[0]}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-serif text-2xl lg:text-headline-sm text-primary font-medium">
                        {residence.name}
                      </h3>
                      <span className="font-mono text-label-technical text-secondary uppercase text-[11px]">
                        {residence.accommodations}
                      </span>
                    </div>
                    <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                      {residence.description}
                    </p>
                  </div>

                  {/* Specifications List */}
                  <div className="space-y-space-xs border-t border-surface-variant pt-space-md">
                    {residence.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between font-mono text-label-technical uppercase text-xs"
                      >
                        <span className="text-on-surface-variant">
                          {spec.label}
                        </span>
                        <span className="text-primary font-semibold">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-space-sm flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleViewFloorPlan(e, residence.id)}
                      className={`w-full py-space-xs text-center font-mono text-label-md uppercase tracking-[0.16em] transition-all duration-300 ${
                        isSelected
                          ? "bg-primary text-on-primary border border-primary hover:bg-surface-tint hover:border-surface-tint shadow-md"
                          : "border border-primary text-primary hover:bg-primary hover:text-on-primary"
                      }`}
                    >
                      View Floor Plan
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleEnquire(e, residence.id)}
                      className="w-full py-space-xs text-center font-mono text-label-md uppercase tracking-[0.16em] transition-colors duration-300 bg-surface-container text-primary border border-surface-variant hover:border-secondary hover:text-secondary"
                    >
                      Enquire Availability
                    </button>
                  </div>
                </div>
              </div>
            );

            return (
              <BlurFade
                key={residence.id}
                delay={0.15 + idx * 0.1}
                yOffset={12}
                className="h-full"
              >
                {isSelected ? (
                  <ShineBorder
                    borderRadius={0}
                    borderWidth={1.5}
                    duration={8}
                    color={["#A38A69", "#fcdeb8", "#A38A69"]}
                    className="h-full"
                  >
                    {cardContent}
                  </ShineBorder>
                ) : (
                  cardContent
                )}
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
};
