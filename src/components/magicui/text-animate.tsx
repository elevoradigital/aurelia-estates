"use client";

import React, { ElementType, useRef } from "react";
import {
  motion,
  useInView,
  Variants,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

interface TextAnimateProps {
  children: string;
  className?: string;
  as?: ElementType;
  by?: "word" | "character" | "line";
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  className,
  as: Component = "span",
  by = "word",
  delay = 0,
  duration = 0.6,
  stagger = 0.08,
  once = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });
  const shouldReduceMotion = useSafeReducedMotion();

  // Segment text according to `by`
  const segments =
    by === "character"
      ? Array.from(children)
      : by === "word"
      ? children.split(" ")
      : children.split("\n");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn("inline max-w-full", className)}
    >
      {segments.map((segment, idx) => (
        <React.Fragment key={idx}>
          <motion.span
            variants={itemVariants}
            className="inline-block"
          >
            {segment}
          </motion.span>
          {by === "word" && idx < segments.length - 1 && " "}
        </React.Fragment>
      ))}
    </MotionComponent>
  );
};
