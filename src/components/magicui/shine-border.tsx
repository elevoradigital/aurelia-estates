"use client";

import React from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

/**
 * ShineBorder — Magic UI component adapted for Aurelia Estates
 * Renders an animated border glow around planar rectilinear containers
 */
export const ShineBorder: React.FC<ShineBorderProps> = ({
  borderRadius = 0,
  borderWidth = 1.5,
  duration = 8,
  color = ["#A38A69", "#fcdeb8", "#A38A69"],
  className,
  children,
}) => {
  const shouldReduceMotion = useSafeReducedMotion();
  const colorArray = Array.isArray(color) ? color : [color];

  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative w-full p-[1px] overflow-hidden bg-transparent",
        className
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          } as React.CSSProperties
        }
        className="pointer-events-none absolute inset-0 size-full p-[var(--border-width)] will-change-[background-position]"
      >
        <div
          className="absolute inset-0 size-full"
          style={{
            background: shouldReduceMotion
              ? colorArray[0]
              : `linear-gradient(135deg, transparent 20%, ${colorArray[0]} 40%, ${
                  colorArray[1] || colorArray[0]
                } 50%, ${colorArray[2] || colorArray[0]} 60%, transparent 80%)`,
            backgroundSize: shouldReduceMotion ? "100% 100%" : "200% 200%",
            animation: shouldReduceMotion
              ? "none"
              : `shine ${duration}s ease-in-out infinite`,
          }}
        />
      </div>
      <div className="relative size-full">{children}</div>
    </div>
  );
};
