"use client";

import React from "react";
import { AMENITIES } from "@/data/residences";
import {
  Flower2,
  Waves,
  Wine,
  Clapperboard,
  Car,
  ShieldCheck,
} from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const Amenities: React.FC = () => {
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case "Flower2":
        return <Flower2 className="w-5 h-5 text-on-primary" />;
      case "Waves":
        return <Waves className="w-5 h-5 text-on-primary" />;
      case "Wine":
        return <Wine className="w-5 h-5 text-on-primary" />;
      case "Clapperboard":
        return <Clapperboard className="w-5 h-5 text-on-primary" />;
      case "Car":
        return <Car className="w-5 h-5 text-on-primary" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-on-primary" />;
      default:
        return <Flower2 className="w-5 h-5 text-on-primary" />;
    }
  };

  return (
    <section id="amenities-section" className="w-full bg-surface py-space-xl lg:py-space-2xl">
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        {/* Section Header with BlurFade */}
        <BlurFade delay={0.1} yOffset={8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl pb-space-sm border-b border-surface-variant">
            <div>
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                Living Protocol
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                The Luxury of the Everyday
              </h2>
            </div>
            <p className="font-sans text-body-md text-on-surface-variant max-w-md">
              A suite of restorative amenities engineered for holistic vitality,
              intellectual quietude, and seamless private hospitality.
            </p>
          </div>
        </BlurFade>

        {/* Amenities Matrix with BlurFade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {AMENITIES.map((amenity, idx) => (
            <BlurFade
              key={amenity.id}
              delay={0.12 + idx * 0.08}
              yOffset={10}
              className="h-full"
            >
              <div className="p-space-lg bg-surface-container-low border border-surface-variant/40 flex flex-col justify-between hover:border-secondary transition-colors duration-300 h-full">
                <div>
                  <div className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary mb-space-md shadow-sm">
                    {getAmenityIcon(amenity.icon)}
                  </div>
                  <h3 className="font-serif text-2xl lg:text-headline-sm text-primary mb-space-xs font-medium">
                    {amenity.title}
                  </h3>
                  <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
                <span className="font-mono text-label-technical text-secondary uppercase tracking-widest pt-space-md mt-space-md border-t border-surface-variant text-[11px]">
                  {amenity.tag}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};
