"use client";

import React from "react";
import { Compass } from "lucide-react";

export const DisclaimerBanner: React.FC = () => {
  return (
    <section className="w-full bg-surface-container py-space-md border-t border-surface-variant">
      <div className="w-full px-4 sm:px-gutter lg:px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
        <div className="flex items-center gap-space-xs">
          <Compass className="w-4 h-4 text-secondary shrink-0" />
          <span className="font-mono text-label-technical text-on-surface-variant uppercase tracking-widest text-[11px]">
            AURELIA ESTATES IS A DIGITAL ARCHITECTURAL CONCEPT PORTFOLIO DEVELOPED BY ELEVORA.
          </span>
        </div>
        <span className="font-mono text-label-technical text-outline uppercase tracking-wider text-[11px]">
          ALL PLANS, DIMENSIONS, AND FINISHES ARE ARTISTICALLY ILLUSTRATIVE.
        </span>
      </div>
    </section>
  );
};
