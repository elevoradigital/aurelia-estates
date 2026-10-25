import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aureliaestates.elevora.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AURELIA ESTATES | ELEVORA — Exceptional Spaces. Extraordinary Living.",
  description:
    "A considered collection of contemporary architectural residences along the Coromandel Seaboard, shaped around sculpted light, structural permanence, and quiet spatial sovereignty. An architectural design concept by Elevora.",
  keywords: [
    "Aurelia Estates",
    "Elevora",
    "Luxury Architecture",
    "Architectural Design Concept",
    "Coromandel Seaboard",
    "Contemporary Residences",
    "Modernist Villa Portfolio",
  ],
  authors: [{ name: "Elevora — Digital Growth & Design Studio" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AURELIA ESTATES | ELEVORA",
    description:
      "Exceptional spaces. Extraordinary living. An architectural residence portfolio concept by Elevora.",
    url: siteUrl,
    siteName: "Aurelia Estates",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3SW2DBHv2m-2nVc5RZFsioIeSiwkQ-zrN1xcFSqcGcpLdrTVRoLRvNYiePTDgdUHrF83SDeq7ppmvWUKvOfyftN7rkQmRlkIK8ogC4rFYJBlZwS5gfCn1-96AZY0z6CAUdkPkslquxAnHaOyWLApbxMDvdMVFUni22gWETbyM3KYcp1Lj4PLvlMSv8IuNRX-mYBT8CsXfZBp0ymysL01h1FE60lTcUOE_xBZ2nw-2IDjbd_bsi7sx7A",
        width: 1200,
        height: 630,
        alt: "Aurelia Estates Architectural Residence Concept",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURELIA ESTATES | ELEVORA",
    description:
      "Exceptional spaces. Extraordinary living. An architectural residence portfolio concept by Elevora.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3SW2DBHv2m-2nVc5RZFsioIeSiwkQ-zrN1xcFSqcGcpLdrTVRoLRvNYiePTDgdUHrF83SDeq7ppmvWUKvOfyftN7rkQmRlkIK8ogC4rFYJBlZwS5gfCn1-96AZY0z6CAUdkPkslquxAnHaOyWLApbxMDvdMVFUni22gWETbyM3KYcp1Lj4PLvlMSv8IuNRX-mYBT8CsXfZBp0ymysL01h1FE60lTcUOE_xBZ2nw-2IDjbd_bsi7sx7A",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Aurelia Estates",
  creator: {
    "@type": "Organization",
    name: "Elevora — Digital Growth & Design Studio",
  },
  description:
    "An architectural portfolio concept exploring contemporary residential design along the Coromandel Seaboard.",
  genre: "Architectural Portfolio Concept",
  about: {
    "@type": "Place",
    name: "Coromandel Coast, Chennai",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.0827",
      longitude: "80.2707",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${plusJakarta.variable} font-sans bg-surface text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container`}
      >
        {children}
      </body>
    </html>
  );
}
