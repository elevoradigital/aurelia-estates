"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SSR-safe reduced motion hook for Next.js App Router (React 19).
 * Returns `false` on server and during initial client hydration to guarantee
 * 100% markup and style parity, then synchronizes with the client's actual
 * reduced-motion preference immediately after mount.
 */
export function useSafeReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? !!shouldReduceMotion : false;
}
