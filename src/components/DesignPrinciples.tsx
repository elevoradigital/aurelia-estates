"use client";

import React from "react";
import { DESIGN_PRINCIPLES } from "@/data/residences";
import { Maximize2, Sun, Layers, Shield } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const DesignPrinciples: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Maximize2":
        return <Maximize2 className="w-5 h-5" />;
      case "Sun":
        return <Sun className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Shield":
        return <Shield className="w-5 h-5" />;
      default:
        return <Maximize2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="principles-section" className="w-full bg-surface py-space-xl lg:py-space-2xl">
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        {/* Section Header */}
        <BlurFade delay={0.1} yOffset={8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl pb-space-sm border-b border-surface-variant">
            <div>
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                Core Principles
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-primary tracking-tight font-normal">
                Designed Around The Way You Live
              </h2>
            </div>
            <p className="font-sans text-body-md text-on-surface-variant max-w-md">
              Four irreducible pillars governing our structural language, interior
              cadence, and material decisions.
            </p>
          </div>
        </BlurFade>

        {/* Asymmetrical Editorial Quad with BlurFade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {DESIGN_PRINCIPLES.map((principle, idx) => (
            <BlurFade
              key={principle.number}
              delay={0.15 + idx * 0.1}
              yOffset={10}
              className="h-full"
            >
              <div className="p-space-lg bg-surface-container-low hover:bg-surface-container transition-colors duration-300 flex flex-col justify-between h-full min-h-[380px] border border-surface-variant/50 group">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-mono text-label-technical text-secondary tracking-widest uppercase">
                      {principle.number} · {principle.category}
                    </span>
                    <div className="text-outline group-hover:text-primary transition-colors">
                      {getIcon(principle.iconName)}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-headline-sm text-primary mb-space-sm font-medium">
                    {principle.title}
                  </h3>
                  <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                    {principle.description}
                  </p>
                </div>
                <div className="pt-space-sm border-t border-surface-variant/60 flex items-center justify-between text-on-surface-variant font-mono text-label-technical uppercase tracking-wider text-[11px]">
                  <span>{principle.metaLeft}</span>
                  <span>{principle.metaRight}</span>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};
