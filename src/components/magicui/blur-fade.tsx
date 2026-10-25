"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  UseInViewOptions,
  Variants,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number; opacity: number; filter: string };
    visible: { y: number; opacity: number; filter: string };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
}

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 8,
  inView = true,
  inViewMargin = "-20px",
  blur = "4px",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const shouldReduceMotion = useSafeReducedMotion();

  const defaultVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? 0 : yOffset,
      opacity: 0,
      filter: shouldReduceMotion ? "none" : `blur(${blur})`,
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.15 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
