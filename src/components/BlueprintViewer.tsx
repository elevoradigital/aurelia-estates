"use client";

import React, { useState, useEffect } from "react";
import { RESIDENCES, Residence } from "@/data/residences";
import { Grid, Download, Maximize2, X, Compass, Check } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShineBorder } from "@/components/magicui/shine-border";
import { motion, AnimatePresence } from "framer-motion";

interface BlueprintViewerProps {
  selectedResidenceId: "garden" | "signature" | "sky";
  onSelectResidence: (id: "garden" | "signature" | "sky") => void;
  onEnquire: (id: string) => void;
}

export const BlueprintViewer: React.FC<BlueprintViewerProps> = ({
  selectedResidenceId,
  onSelectResidence,
  onEnquire,
}) => {
  const [showGrid, setShowGrid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folioDownloaded, setFolioDownloaded] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const currentResidence: Residence =
    RESIDENCES.find((r) => r.id === selectedResidenceId) || RESIDENCES[0];

  const handleDownloadFolio = () => {
    setFolioDownloaded(true);
    setTimeout(() => {
      setFolioDownloaded(false);
    }, 3500);
  };

  return (
    <section
      id="blueprint-section"
      className="w-full bg-primary text-on-primary py-space-xl lg:py-space-2xl relative"
    >
      <div className="w-full px-4 sm:px-gutter lg:px-margin">
        {/* Section Header with BlurFade */}
        <BlurFade delay={0.1} yOffset={8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl pb-space-md border-b border-surface-tint/30">
            <div>
              <span className="font-mono text-label-technical text-secondary uppercase tracking-[0.2em] block mb-space-xs">
                Technical Prospectus
              </span>
              <h2 className="font-serif text-3xl lg:text-headline-lg text-inverse-on-surface tracking-tight font-normal">
                Interactive Residence Blueprint
              </h2>
            </div>
            <div className="flex items-center gap-space-xs text-outline-variant font-mono text-label-technical uppercase tracking-widest text-xs">
              <Compass className="w-4 h-4 text-secondary" />
              <span>DIMENSIONAL ACCURACY: ARCH-D · SCALE 1:100</span>
            </div>
          </div>
        </BlurFade>

        {/* Blueprint Controls & Tabs */}
        <BlurFade delay={0.15} yOffset={6}>
          <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-lg">
            <div
              className="inline-flex p-1 bg-surface-container-high/10 rounded-none border border-surface-tint/40 flex-wrap sm:flex-nowrap w-full sm:w-auto"
              role="tablist"
              aria-label="Residence floor plan selection"
            >
              {RESIDENCES.map((res) => {
                const isActive = res.id === selectedResidenceId;
                return (
                  <button
                    key={res.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${res.id}`}
                    onClick={() => onSelectResidence(res.id)}
                    className={`flex-1 sm:flex-none px-2.5 sm:px-space-md py-1.5 sm:py-space-xs font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-all text-center whitespace-nowrap ${
                      isActive
                        ? "bg-secondary text-on-secondary shadow-md font-semibold"
                        : "text-inverse-on-surface hover:text-secondary-fixed"
                    }`}
                  >
                    <span>{res.number} · {res.name.replace(" Residence", "")}</span>{" "}
                    <span className="hidden sm:inline">({res.totalArea.split(" (")[0]})</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-space-sm flex-wrap">
              <button
                onClick={() => setShowGrid(!showGrid)}
                aria-label="Toggle Calipers drafting grid"
                className={`px-space-sm py-space-xs border font-mono text-label-technical uppercase tracking-wider flex items-center gap-1.5 text-xs transition-colors ${
                  showGrid
                    ? "border-secondary text-secondary-fixed bg-secondary/10"
                    : "border-surface-tint/50 text-inverse-on-surface hover:border-secondary"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{showGrid ? "Hide Calipers" : "Toggle Calipers"}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                aria-label="Enlarge floor plan view"
                className="px-space-sm py-space-xs border border-surface-tint/50 text-inverse-on-surface hover:border-secondary font-mono text-label-technical uppercase tracking-wider flex items-center gap-1.5 text-xs transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enlarge Plan</span>
              </button>

              <button
                onClick={handleDownloadFolio}
                aria-label="Download architectural folio prospectus PDF"
                className="px-space-sm py-space-xs bg-surface-container-low text-primary font-mono text-label-technical uppercase tracking-wider hover:bg-secondary-fixed transition-colors flex items-center gap-1.5 text-xs"
              >
                {folioDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-secondary" />
                    <span>Folio Download Initiated</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Folio (PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Architectural CAD Diagram Container with ShineBorder Framing */}
        <BlurFade delay={0.2} yOffset={10}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
            {/* Blueprint Canvas wrapped in restrained ShineBorder */}
            <div className="lg:col-span-8">
              <ShineBorder
                borderRadius={0}
                borderWidth={1}
                duration={10}
                color={["#705B3D", "#fcdeb8", "#705B3D"]}
                className="size-full"
              >
                <div className="bg-tertiary-container border border-surface-tint/40 p-space-md sm:p-space-lg relative min-h-[480px] flex items-center justify-center overflow-hidden size-full">
                  {/* Drafting Coordinate lines */}
                  {showGrid && (
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
                      style={{
                        backgroundImage:
                          "linear-gradient(#A38A69 1px, transparent 1px), linear-gradient(90deg, #A38A69 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                  )}

                  {/* Technical Calipers corner markers */}
                  <div className="absolute top-3 left-3 font-mono text-[10px] text-secondary tracking-widest uppercase">
                    CAD_REV: 04.2 / SCALE 1:100 / NORTH ↑
                  </div>
                  <div className="absolute top-3 right-3 font-mono text-[10px] text-outline tracking-widest uppercase">
                    FOLIO: {currentResidence.id.toUpperCase()}-2025
                  </div>
                  <div className="absolute bottom-3 left-3 font-mono text-[10px] text-outline tracking-widest uppercase">
                    COROMANDEL STRUCTURAL SYSTEM · POST-TENSIONED LIMESTONE
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] text-secondary tracking-widest uppercase">
                    SEABOARD AXIS: {currentResidence.orientation}
                  </div>

                  {/* Dynamic SVG Blueprint with smooth crossfade */}
                  <div className="w-full max-w-2xl py-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedResidenceId}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="w-full flex items-center justify-center"
                      >
                        {selectedResidenceId === "garden" && (
                          <svg
                            className="w-full h-auto text-secondary-fixed-dim"
                            fill="none"
                            viewBox="0 0 800 480"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Garden Residence Detailed Floor Plan"
                          >
                            <rect
                              height="400"
                              opacity="0.4"
                              stroke="currentColor"
                              strokeDasharray="4 2"
                              strokeWidth="2"
                              width="720"
                              x="40"
                              y="40"
                            />
                            <rect
                              fill="#202218"
                              fillOpacity="0.7"
                              height="340"
                              stroke="#DFDFC2"
                              strokeWidth="2.5"
                              width="450"
                              x="80"
                              y="70"
                            />
                            <line
                              stroke="#DFDFC2"
                              strokeWidth="2"
                              x1="80"
                              x2="330"
                              y1="210"
                              y2="210"
                            />
                            <line
                              stroke="#DFDFC2"
                              strokeWidth="2"
                              x1="330"
                              x2="330"
                              y1="70"
                              y2="300"
                            />
                            <line
                              stroke="#DFDFC2"
                              strokeWidth="2"
                              x1="210"
                              x2="210"
                              y1="210"
                              y2="410"
                            />
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.08"
                              height="120"
                              width="230"
                              x="90"
                              y="80"
                            />
                            <text
                              fill="#FCDEB8"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="13"
                              letterSpacing="2"
                              textAnchor="middle"
                              x="205"
                              y="145"
                            >
                              GRAND SALON (9.2m × 6.4m)
                            </text>
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.04"
                              height="180"
                              width="110"
                              x="90"
                              y="220"
                            />
                            <text
                              fill="#DFDFC2"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="11"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="145"
                              y="315"
                            >
                              MASTER SUITE 01
                            </text>
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.04"
                              height="180"
                              width="100"
                              x="220"
                              y="220"
                            />
                            <text
                              fill="#DFDFC2"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="11"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="270"
                              y="315"
                            >
                              SUITE 02 &amp; 03
                            </text>
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.06"
                              height="210"
                              width="180"
                              x="340"
                              y="80"
                            />
                            <text
                              fill="#DFDFC2"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="12"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="430"
                              y="185"
                            >
                              CHEF’S SHOW KITCHEN
                            </text>
                            <rect
                              fill="#705B3D"
                              fillOpacity="0.18"
                              height="300"
                              stroke="#705B3D"
                              strokeWidth="1.5"
                              width="180"
                              x="550"
                              y="90"
                            />
                            <text
                              fill="#FCDEB8"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="12"
                              letterSpacing="2"
                              textAnchor="middle"
                              x="640"
                              y="240"
                            >
                              REFLECTING LAP POOL
                            </text>
                            <text
                              fill="#C5C7C1"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              textAnchor="middle"
                              x="640"
                              y="265"
                            >
                              12.0m × 3.5m · ZERO-EDGE
                            </text>
                            <circle
                              cx="430"
                              cy="350"
                              r="45"
                              stroke="#705B3D"
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />
                            <text
                              fill="#C7C7B8"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="430"
                              y="355"
                            >
                              INTERNAL COURTYARD
                            </text>
                            <line
                              stroke="#757873"
                              strokeWidth="1"
                              x1="80"
                              x2="530"
                              y1="50"
                              y2="50"
                            />
                            <text
                              fill="#757873"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              textAnchor="middle"
                              x="305"
                              y="44"
                            >
                              21,400 MM INTERIOR AXIS
                            </text>
                          </svg>
                        )}

                        {selectedResidenceId === "signature" && (
                          <svg
                            className="w-full h-auto text-secondary-fixed-dim"
                            fill="none"
                            viewBox="0 0 800 480"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Signature Residence Detailed Floor Plan"
                          >
                            <rect
                              height="400"
                              opacity="0.4"
                              stroke="currentColor"
                              strokeDasharray="4 2"
                              strokeWidth="2"
                              width="720"
                              x="40"
                              y="40"
                            />
                            <rect
                              fill="#202218"
                              fillOpacity="0.7"
                              height="360"
                              stroke="#DFDFC2"
                              strokeWidth="2.5"
                              width="660"
                              x="70"
                              y="60"
                            />
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.14"
                              height="220"
                              width="360"
                              x="80"
                              y="70"
                            />
                            <text
                              fill="#FCDEB8"
                              fontFamily="Playfair Display, serif"
                              fontSize="15"
                              letterSpacing="2"
                              textAnchor="middle"
                              x="260"
                              y="175"
                            >
                              7.2M DUAL-HEIGHT SALON
                            </text>
                            <text
                              fill="#C5C7C1"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="260"
                              y="198"
                            >
                              FULL VOLUME NATURAL VENTILATION SPINE
                            </text>
                            <rect
                              fill="#705B3D"
                              fillOpacity="0.25"
                              height="150"
                              stroke="#DFDFC2"
                              strokeWidth="1"
                              width="130"
                              x="450"
                              y="70"
                            />
                            <text
                              fill="#FCDEB8"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="515"
                              y="150"
                            >
                              WINE CELLAR (450 BTL)
                            </text>
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.05"
                              height="110"
                              width="360"
                              x="80"
                              y="300"
                            />
                            <text
                              fill="#DFDFC2"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="11"
                              textAnchor="middle"
                              x="260"
                              y="360"
                            >
                              GALLERY CORRIDOR &amp; 5 BEDROOM SUITES
                            </text>
                            <rect
                              height="340"
                              stroke="#705B3D"
                              strokeDasharray="4 4"
                              strokeWidth="1"
                              width="130"
                              x="590"
                              y="70"
                            />
                            <text
                              fill="#DFDFC2"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="11"
                              textAnchor="middle"
                              transform="rotate(90 655 240)"
                              x="655"
                              y="240"
                            >
                              WRAPAROUND SEAWARD VERANDAH
                            </text>
                            <line
                              stroke="#757873"
                              strokeWidth="1"
                              x1="70"
                              x2="730"
                              y1="45"
                              y2="45"
                            />
                            <text
                              fill="#757873"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              textAnchor="middle"
                              x="400"
                              y="38"
                            >
                              27,800 MM MONOLITHIC ELEVATION
                            </text>
                          </svg>
                        )}

                        {selectedResidenceId === "sky" && (
                          <svg
                            className="w-full h-auto text-secondary-fixed-dim"
                            fill="none"
                            viewBox="0 0 800 480"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Sky Residence Detailed Floor Plan"
                          >
                            <rect
                              height="400"
                              opacity="0.4"
                              stroke="currentColor"
                              strokeDasharray="4 2"
                              strokeWidth="2"
                              width="720"
                              x="40"
                              y="40"
                            />
                            <rect
                              fill="#202218"
                              fillOpacity="0.7"
                              height="320"
                              stroke="#DFDFC2"
                              strokeWidth="2.5"
                              width="420"
                              x="90"
                              y="80"
                            />
                            <rect
                              fill="#705B3D"
                              fillOpacity="0.22"
                              height="320"
                              stroke="#FCDEB8"
                              strokeWidth="1.5"
                              width="200"
                              x="520"
                              y="80"
                            />
                            <text
                              fill="#FCDEB8"
                              fontFamily="Playfair Display, serif"
                              fontSize="14"
                              letterSpacing="1"
                              textAnchor="middle"
                              x="620"
                              y="235"
                            >
                              SKY DECK &amp; POOL
                            </text>
                            <text
                              fill="#C5C7C1"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              textAnchor="middle"
                              x="620"
                              y="260"
                            >
                              2,100 SQ. FT. CANTILEVER
                            </text>
                            <rect
                              fill="#FCDEB8"
                              fillOpacity="0.08"
                              height="190"
                              width="240"
                              x="100"
                              y="90"
                            />
                            <text
                              fill="#FCDEB8"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="12"
                              textAnchor="middle"
                              x="220"
                              y="190"
                            >
                              PENTHOUSE MASTER SUITE
                            </text>
                            <rect
                              fill="#202218"
                              height="140"
                              stroke="#705B3D"
                              strokeWidth="1"
                              width="150"
                              x="350"
                              y="90"
                            />
                            <text
                              fill="#DFDFC2"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              textAnchor="middle"
                              x="425"
                              y="165"
                            >
                              CEDAR SAUNA &amp; SPA
                            </text>
                            <line
                              stroke="#757873"
                              strokeWidth="1"
                              x1="90"
                              x2="720"
                              y1="60"
                              y2="60"
                            />
                            <text
                              fill="#757873"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontSize="10"
                              textAnchor="middle"
                              x="405"
                              y="52"
                            >
                              32,000 MM CROWN CANTILEVER SPAN
                            </text>
                          </svg>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </ShineBorder>
            </div>

            {/* Metric Table & Room Schedule */}
            <div className="lg:col-span-4 bg-tertiary-container/60 border border-surface-tint/40 p-space-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-tint/40 mb-space-md">
                  <span className="font-mono text-label-technical text-secondary uppercase tracking-widest text-xs">
                    SCHEDULE OF SPACES
                  </span>
                  <span className="font-mono text-label-technical text-outline uppercase text-xs">
                    {currentResidence.level}
                  </span>
                </div>
                <h3 className="font-serif text-2xl lg:text-headline-sm text-inverse-on-surface mb-space-sm font-medium">
                  {currentResidence.name} Plan
                </h3>
                <p className="font-sans text-body-sm text-outline-variant mb-space-md leading-relaxed">
                  {currentResidence.detailedBlueprintDesc}
                </p>

                {/* Metrics List */}
                <div className="space-y-space-sm font-mono text-label-technical uppercase text-xs">
                  <div className="flex justify-between py-2 border-b border-surface-tint/20">
                    <span className="text-outline">TOTAL BUILT FOOTPRINT</span>
                    <span className="text-inverse-on-surface font-semibold">
                      {currentResidence.totalArea}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface-tint/20">
                    <span className="text-outline">INTERIOR SALON LIVING</span>
                    <span className="text-inverse-on-surface font-semibold">
                      {currentResidence.interiorArea}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface-tint/20">
                    <span className="text-outline">OUTDOOR COURTS &amp; POOL</span>
                    <span className="text-inverse-on-surface font-semibold">
                      {currentResidence.outdoorArea}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface-tint/20">
                    <span className="text-outline">FINISHED CEILING CLEARANCE</span>
                    <span className="text-inverse-on-surface font-semibold">
                      {currentResidence.ceilingClearance}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-outline">ORIENTATIONAL ANGLE</span>
                    <span className="text-secondary font-semibold">
                      {currentResidence.orientation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-space-lg">
                <button
                  type="button"
                  onClick={() => onEnquire(currentResidence.id)}
                  className="w-full py-space-sm text-center block bg-secondary text-on-secondary font-mono text-label-md uppercase tracking-widest hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-md"
                >
                  Request Full Specification Set
                </button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Full-Screen Plan Enlargement Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Architectural Floor Plan"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121210] border border-secondary/50 w-full max-w-5xl p-6 sm:p-8 flex flex-col justify-between max-h-[92vh] overflow-y-auto shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-surface-tint/40 mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary block">
                  Detailed Architectural Draft
                </span>
                <h3 className="font-serif text-2xl text-inverse-on-surface">
                  {currentResidence.name} — Full Layout View
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-inverse-on-surface hover:text-secondary transition-colors"
                aria-label="Close enlarged floor plan view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* SVG render enlarged */}
            <div className="bg-[#181914] p-4 sm:p-8 border border-surface-tint/30 relative">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#A38A69 1px, transparent 1px), linear-gradient(90deg, #A38A69 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="relative z-10 w-full">
                {selectedResidenceId === "garden" && (
                  <svg
                    className="w-full h-auto text-secondary-fixed"
                    fill="none"
                    viewBox="0 0 800 480"
                  >
                    <rect
                      height="400"
                      stroke="#DFDFC2"
                      strokeWidth="2"
                      width="720"
                      x="40"
                      y="40"
                    />
                    <rect
                      fill="#202218"
                      height="340"
                      stroke="#DFDFC2"
                      strokeWidth="2.5"
                      width="450"
                      x="80"
                      y="70"
                    />
                    <line
                      stroke="#DFDFC2"
                      strokeWidth="2"
                      x1="80"
                      x2="330"
                      y1="210"
                      y2="210"
                    />
                    <text
                      fill="#FCDEB8"
                      fontFamily="sans-serif"
                      fontSize="14"
                      textAnchor="middle"
                      x="205"
                      y="145"
                    >
                      GRAND SALON (9.2m × 6.4m)
                    </text>
                    <rect
                      fill="#705B3D"
                      fillOpacity="0.2"
                      height="300"
                      stroke="#705B3D"
                      width="180"
                      x="550"
                      y="90"
                    />
                    <text
                      fill="#FCDEB8"
                      fontFamily="sans-serif"
                      fontSize="12"
                      textAnchor="middle"
                      x="640"
                      y="240"
                    >
                      REFLECTING LAP POOL (12.0m × 3.5m)
                    </text>
                  </svg>
                )}
                {selectedResidenceId === "signature" && (
                  <svg
                    className="w-full h-auto text-secondary-fixed"
                    fill="none"
                    viewBox="0 0 800 480"
                  >
                    <rect
                      height="400"
                      stroke="#DFDFC2"
                      strokeWidth="2"
                      width="720"
                      x="40"
                      y="40"
                    />
                    <rect
                      fill="#202218"
                      height="360"
                      stroke="#DFDFC2"
                      strokeWidth="2.5"
                      width="660"
                      x="70"
                      y="60"
                    />
                    <text
                      fill="#FCDEB8"
                      fontFamily="serif"
                      fontSize="16"
                      textAnchor="middle"
                      x="260"
                      y="175"
                    >
                      7.2M DUAL-HEIGHT SALON
                    </text>
                    <text
                      fill="#DFDFC2"
                      fontFamily="sans-serif"
                      fontSize="12"
                      textAnchor="middle"
                      x="515"
                      y="150"
                    >
                      WINE CELLAR (450 BTL)
                    </text>
                  </svg>
                )}
                {selectedResidenceId === "sky" && (
                  <svg
                    className="w-full h-auto text-secondary-fixed"
                    fill="none"
                    viewBox="0 0 800 480"
                  >
                    <rect
                      height="400"
                      stroke="#DFDFC2"
                      strokeWidth="2"
                      width="720"
                      x="40"
                      y="40"
                    />
                    <rect
                      fill="#202218"
                      height="320"
                      stroke="#DFDFC2"
                      strokeWidth="2.5"
                      width="420"
                      x="90"
                      y="80"
                    />
                    <rect
                      fill="#705B3D"
                      fillOpacity="0.25"
                      height="320"
                      stroke="#FCDEB8"
                      width="200"
                      x="520"
                      y="80"
                    />
                    <text
                      fill="#FCDEB8"
                      fontFamily="serif"
                      fontSize="15"
                      textAnchor="middle"
                      x="620"
                      y="235"
                    >
                      SKY DECK &amp; POOL (2,100 SQ. FT.)
                    </text>
                  </svg>
                )}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="font-mono text-xs text-outline uppercase tracking-wider">
                ARCHITECTURAL DRAWING FOR ILLUSTRATIVE PORTFOLIO PURPOSES
              </span>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onEnquire(currentResidence.id);
                }}
                className="px-6 py-2.5 bg-secondary text-on-secondary font-mono text-xs uppercase tracking-widest hover:bg-secondary-fixed transition-colors"
              >
                Inquire on this Typology
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
