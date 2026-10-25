# AURELIA ESTATES · Curated by ELEVORA
> **"Exceptional Spaces. Extraordinary Living."**
> Coromandel Seaboard, Chennai · 13.0827° N, 80.2707° E

A bespoke digital experience and architectural portfolio for **Aurelia Estates**, a limited conceptual study of contemporary residences created by **Elevora — Digital Growth Studio**.

Translated from the Google Stitch design system and elevated with selective **Magic UI** motion design, creating a refined, cinematic web experience embodying **Quiet Architectural Precision**.

---

## 🏛️ Brand Concept & Aesthetic Direction

- **Architectural Luxury & Tactile Materiality:** Quarried honed travertine, brushed champagne bronze, and acoustic crystal glazing.
- **Color Discipline:** Deep Architectural Charcoal (`#20211F`), Warm Limestone Ivory (`#F3F0E9`), Muted Olive-Grey (`#848577`), Antique Bronze (`#A38A69`), and Limestone Sand (`#D9D1C5`).
- **Typographic Cadence:**
  - Headings: `Playfair Display` (literary high-contrast serif).
  - Body & Specifications: `Plus Jakarta Sans` (clinical architectural notation with wide letter-spacing).
- **Planar Sharp Precision:** 0px border-radii reflecting cut stone, cast concrete, and precision metalwork.

---

## ✨ Magic UI Motion System: "Quiet Architectural Precision"

Magic UI components have been integrated with architectural restraint:

1. **[`ScrollProgress`](src/components/magicui/scroll-progress.tsx)**:
   - A silky smooth, 2px hairline scroll progress bar anchored along the top edge in Restrained Antique Bronze (`#A38A69`), providing understated reading cadence.
2. **[`BlurFade`](src/components/magicui/blur-fade.tsx)**:
   - Gentle, subtle fade-and-rise reveals (`y: 8-12px`, `blur: 4px`) across architectural imagery, editorial quotes, and specification grids as visitors scroll into view.
   - Built-in support for `prefers-reduced-motion`.
3. **[`TextAnimate`](src/components/magicui/text-animate.tsx)**:
   - Controlled word-by-word reveal for the flagship hero headline (*"Exceptional spaces. Extraordinary living."*) with dignified cubic-bezier easing.
4. **[`ShineBorder`](src/components/magicui/shine-border.tsx)**:
   - A low-intensity, sweeping metallic border in soft bronze and limestone tones (`#A38A69`, `#fcdeb8`) highlighting the currently active residence card and the CAD technical blueprint canvas.
5. **Refined Non-Numeric Materiality Statements**:
   - Replaced fragile numeric counters with literary architectural statements on natural materiality, volumetric scale, and daylight orientation.
6. **Architectural Specimen Lightbox**:
   - An interactive specimen viewer for the materials mosaic with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`) and zoom inspection.

---

## 🗺️ Complete Page Structure (Sections 01 – 12)

| Section | Component | Enhancements & Interactions |
| :--- | :--- | :--- |
| **01. Navigation** | [`Header.tsx`](src/components/Header.tsx) | Aurelia wordmark, folio locator, desktop links, private viewing CTA, mobile sliding drawer |
| **02. Hero** | [`Hero.tsx`](src/components/Hero.tsx) | `TextAnimate` headline entrance, coordinates, monolithic cantilever photography with `BlurFade`, calipers spec badge |
| **03. Architectural Manifesto** | [`ArchitecturalManifesto.tsx`](src/components/ArchitecturalManifesto.tsx) | *"A Place to Come Home To"*, design thesis callout, oversized quote, refined materiality statements |
| **04. Design Principles** | [`DesignPrinciples.tsx`](src/components/DesignPrinciples.tsx) | Four pillars: Space, Light, Material, Privacy staggered with `BlurFade` |
| **05. Find Your Place** | [`ResidenceShowcase.tsx`](src/components/ResidenceShowcase.tsx) | Garden (5,400 sq.ft), Signature (6,800 sq.ft), Sky (8,200 sq.ft) with `ShineBorder` active selection |
| **06. Blueprint Suite** | [`BlueprintViewer.tsx`](src/components/BlueprintViewer.tsx) | High-contrast dark CAD interface, `ShineBorder` drafting frame, interactive SVG drawings, calipers toggle, enlargement modal |
| **07. Promenade** | [`ArchitecturalPromenade.tsx`](src/components/ArchitecturalPromenade.tsx) | Virtual walkthrough with interactive daylight simulation (Dusk / Noon / Dawn) and interactive architectural pins |
| **08. Materials Gallery** | [`MaterialsGallery.tsx`](src/components/MaterialsGallery.tsx) | *"Form Follows Feeling"*, 4-part tactile specification mosaic with **interactive Specimen Lightbox modal** |
| **09. Amenities** | [`Amenities.tsx`](src/components/Amenities.tsx) | *"The Luxury of the Everyday"*, 6 restorative amenities with custom architectural badges |
| **10. The Location** | [`LocationSection.tsx`](src/components/LocationSection.tsx) | *"Connected to What Matters"*, Coromandel Seaboard map presentation & travel times |
| **11. Private Viewing** | [`PrivateViewingForm.tsx`](src/components/PrivateViewingForm.tsx) | Validated consultation form, protocol selector (Phone, WhatsApp, Concierge), server API integration |
| **12. Footer & Governance** | [`Footer.tsx`](src/components/Footer.tsx) & [`DisclaimerBanner.tsx`](src/components/DisclaimerBanner.tsx) | Curated links, accessible privacy/legal/specs modals, and concept project disclosure |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 with custom design tokens from Stitch
- **Motion & Interactions:** Framer Motion 12 + Magic UI architecture
- **Icons:** Lucide React & Google Material Symbols compatible
- **API Backend:** Next.js Server Route Handler (`/api/enquire`)

---

## 🚀 Getting Started

### Installation
```bash
# Clone or navigate to the project directory
cd "d:/demo websites/real estate webiste 1"

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local` to configure optional variables:
```bash
cp .env.example .env.local
```

Available variables:
```env
# Optional Resend API key for automated transactional dispatch
RESEND_API_KEY=
CONTACT_EMAIL=advisory@elevora.example.com
EMAIL_FROM=inquiry@aureliaestates.example.com

# Optional Spline 3D Scene URL
NEXT_PUBLIC_SPLINE_SCENE_URL=
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🔒 Private Viewing API (`/api/enquire`)

The website includes a server-side route handler at `/api/enquire` supporting:
- Strict field validation (Name, Email, Phone, Typology, Protocol).
- Anti-spam hidden honeypot.
- In-memory rate limiting (5 inquiries/min/IP).
- Transactional email dispatch via Resend (when configured).
- Unique traceable inquiry reference codes (e.g. `AE-MVMPNZGS-8606`).

---

## 📄 Portfolio Concept Disclosure

*Aurelia Estates is an architectural exploration and creative portfolio concept presented by Elevora. All plans, metrics, and photography are conceptually illustrative.*
