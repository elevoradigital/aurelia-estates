"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArchitecturalManifesto } from "@/components/ArchitecturalManifesto";
import { DesignPrinciples } from "@/components/DesignPrinciples";
import { ResidenceShowcase } from "@/components/ResidenceShowcase";
import { BlueprintViewer } from "@/components/BlueprintViewer";
import { ArchitecturalPromenade } from "@/components/ArchitecturalPromenade";
import { MaterialsGallery } from "@/components/MaterialsGallery";
import { Amenities } from "@/components/Amenities";
import { LocationSection } from "@/components/LocationSection";
import { PrivateViewingForm } from "@/components/PrivateViewingForm";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Home() {
  const [selectedBlueprint, setSelectedBlueprint] = useState<
    "garden" | "signature" | "sky"
  >("garden");
  const [selectedTypologyForEnquiry, setSelectedTypologyForEnquiry] =
    useState<string>("signature");

  const handleSelectResidenceForBlueprint = (
    id: "garden" | "signature" | "sky"
  ) => {
    setSelectedBlueprint(id);
  };

  const handleSelectResidenceForEnquiry = (id: string) => {
    setSelectedTypologyForEnquiry(id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
      {/* Magic UI Subtle Reading Progress */}
      <ScrollProgress className="bg-secondary" />

      {/* SECTION 01 — NAVIGATION */}
      <Header />

      <main className="flex-1 w-full flex flex-col">
        {/* SECTION 02 — HERO */}
        <Hero />

        {/* SECTION 03 — ARCHITECTURAL MANIFESTO */}
        <ArchitecturalManifesto />

        {/* SECTION 04 — DESIGNED AROUND THE WAY YOU LIVE */}
        <DesignPrinciples />

        {/* SECTION 05 — FIND YOUR PLACE */}
        <ResidenceShowcase
          selectedResidenceId={selectedBlueprint}
          onSelectResidenceForBlueprint={handleSelectResidenceForBlueprint}
          onSelectResidenceForEnquiry={handleSelectResidenceForEnquiry}
        />

        {/* SECTION 06 — INTERACTIVE RESIDENCE BLUEPRINT */}
        <BlueprintViewer
          selectedResidenceId={selectedBlueprint}
          onSelectResidence={setSelectedBlueprint}
          onEnquire={(id) => {
            handleSelectResidenceForEnquiry(id);
            const el = document.getElementById("enquiry-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* SECTION 07 — THE ARCHITECTURAL PROMENADE */}
        <ArchitecturalPromenade />

        {/* SECTION 08 — FORM FOLLOWS FEELING */}
        <MaterialsGallery />

        {/* SECTION 09 — THE LUXURY OF THE EVERYDAY */}
        <Amenities />

        {/* SECTION 10 — CONNECTED TO WHAT MATTERS */}
        <LocationSection />

        {/* SECTION 11 — PRIVATE VIEWING */}
        <PrivateViewingForm
          initialTypology={selectedTypologyForEnquiry}
        />

        {/* CONCEPT DISCLAIMER HARMONY STRIP */}
        <DisclaimerBanner />
      </main>

      {/* SECTION 12 — FOOTER */}
      <Footer />
    </div>
  );
}
