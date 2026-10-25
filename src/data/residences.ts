export interface Residence {
  id: "garden" | "signature" | "sky";
  number: string;
  level: string;
  name: string;
  tagline: string;
  totalArea: string;
  interiorArea: string;
  outdoorArea: string;
  ceilingClearance: string;
  orientation: string;
  accommodations: string;
  description: string;
  detailedBlueprintDesc: string;
  isFlagship?: boolean;
  heroImage: string;
  altText: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export const RESIDENCES: Residence[] = [
  {
    id: "garden",
    number: "01",
    level: "GROUND LEVEL",
    name: "Garden Residence",
    tagline: "4 En-Suite Suites · Sunken Travertine Court",
    totalArea: "5,400 SQ. FT. (501.6 M²)",
    interiorArea: "3,750 SQ. FT.",
    outdoorArea: "1,650 SQ. FT.",
    ceilingClearance: "3.60 METERS (11.8 FT)",
    orientation: "08° NORTH-BY-NORTHEAST",
    accommodations: "4 En-Suite Suites",
    description:
      "Focused on immersive indoor-outdoor tranquility, private plunge pools, and mature frangipani botanical courtyards bringing greenery into every bathroom and living suite.",
    detailedBlueprintDesc:
      "Oriented on a direct East-West axis capturing ocean thermal drafts. Expansive deep-set loggias shade the interior from direct tropical heat while preserving continuous sightlines to the plunge court.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8cTC6scnAYVLcNlt_suaQHwK8eBTJgPjgb1-rtiJUoC9BWSjyXJ2spY8KsfBJOxQQb_BbDYKWBMS7YJTpxVwkjxioB8_EYHn5r9S4bJyc3ggtRgcc81AQrKshPkDvwzdUdW3w61mpFCiYijmz-g2sJVyLbxvWkaRi-SzIbaN1DYNPYXsO1rnjOHVOa8Ysaw-qrpo8FJPwhDfOiqSgHB_vERO3rONLOXXbaSrCGxxiA2GQD-Hm6ASYcg",
    altText:
      "Modernist garden villa opening directly onto a private sunken travertine courtyard with plunge pool, lush tropical ferns, warm wood louvres, and ambient concealed evening garden illumination.",
    specs: [
      { label: "Private Lap Pool", value: "12m × 3.5m" },
      { label: "Courtyard Footprint", value: "1,650 SQ. FT." },
      { label: "Parking Capacity", value: "3 Executive Bays" },
    ],
  },
  {
    id: "signature",
    number: "02",
    level: "LEVELS 02 – 03",
    name: "Signature Residence",
    tagline: "5 Bedrooms + Grand Double-Height Salon",
    totalArea: "6,800 SQ. FT. (631.7 M²)",
    interiorArea: "5,100 SQ. FT.",
    outdoorArea: "1,700 SQ. FT.",
    ceilingClearance: "7.20 METERS SALON VOID",
    orientation: "12° NORTH-BY-NORTHEAST",
    accommodations: "5 Bedrooms + Salon",
    isFlagship: true,
    description:
      "Centered on extraordinary volumetric scale: 7-meter high central grand salon, temperature-regulated wine pavilion, and curated art gallery corridors with museum-grade illumination.",
    detailedBlueprintDesc:
      "A celebration of vertical scale. The 7.2m salon void creates dramatic natural chimney ventilation, keeping common entertaining areas cool naturally throughout Chennai afternoons.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX6BE4o1xf4gWIIyDwbUExLvbpit9SzxQfCA8YbfHgYrG6FqmjPxfvf9UPvFZNhmLIYLb9KNtcFTmSANZ0vuAcMgyTs7_dn9xSxi_pPwPdTEUVeMTfOSq9kg0-oKbC_8a88iVCDTykTbvnGJnrcdtQZ2DFk7a1jKlEt_uLhcIEy_-7QOr96C6h2jTIyfJ_HFuVV6eMkiKZeV59rM80GO59mYh2cpU1vjcWEZYq70uyBjQEj7PADOVhLw",
    altText:
      "Double height luxury salon residence with monumental glass facade, floating sculptural marble staircase, bespoke brass wine pavilion, and warm indirect architectural cove lighting.",
    specs: [
      { label: "Ceiling Void", value: "7.2m Double Height" },
      { label: "Wine Sommelier Cellar", value: "450 Bottles" },
      { label: "Staff Quarters", value: "2 En-Suite Units" },
    ],
  },
  {
    id: "sky",
    number: "03",
    level: "PENTHOUSE PINNACLE",
    name: "Sky Residence",
    tagline: "Penthouse Duplex · Cantilevered Sky Deck",
    totalArea: "8,200 SQ. FT. (761.8 M²)",
    interiorArea: "6,100 SQ. FT.",
    outdoorArea: "2,100 SQ. FT. SKY DECK",
    ceilingClearance: "4.10 METERS VAULTED",
    orientation: "360° MARITIME PANORAMA",
    accommodations: "Penthouse Duplex",
    description:
      "Elevated penthouse sanctuary emphasizing panoramic sea vistas, 2,100 sq.ft cantilevered terrace deck, private glass lift, and master spa pavilion with cedar sauna.",
    detailedBlueprintDesc:
      "The pinnacle address offering an uninterrupted 270-degree Coromandel ocean sweep. Cantilevered deck structures provide dramatic shadow play and outdoor culinary spaces.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEOKFwxHMBnt0sNA_aG2jo6cfkcoDJTCql_TeELFa8ctG764JfHtgnz8RoIk7-OqtyikOVvMUHKOOPRxrfeN8PZw48eV8otba34AtGre9A96FXEXQqbXKAC62WV1y1OSdK6L8isNACXSh9hx9_yykPKzLAzaiPSGFAifK6uUSub8ag0Eb-RnMWmO7l5qtL4_0_W8T8BH_u3RP0Ag42X4lolr0IPV5497KDusRvA4Gto_V4vM0KJjQ0kQ",
    altText:
      "Luxury modern penthouse sky deck overlooking the coastal horizon, featuring an outdoor fireplace, sunken stone seating lounge, infinity plunge pool, and floor to ceiling glass balustrades.",
    specs: [
      { label: "Private Sky Deck", value: "2,100 SQ. FT." },
      { label: "Private Elevators", value: "Dedicated Dual-Car" },
      { label: "Thermal Suite", value: "Sauna + Cold Plunge" },
    ],
  },
];

export interface DesignPrinciple {
  number: string;
  category: string;
  title: string;
  description: string;
  metaLeft: string;
  metaRight: string;
  iconName: string;
}

export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    number: "01",
    category: "PROPORTION",
    title: "Space",
    description:
      "Volumetric generosity designed to breathe. Floor-to-ceiling unconstrained thresholds and fluid open vistas dissolve boundary lines between salon and garden.",
    metaLeft: "Height: 3.6m – 7.2m",
    metaRight: "Axis: Cardinal",
    iconName: "Maximize2",
  },
  {
    number: "02",
    category: "LUMINANCE",
    title: "Light",
    description:
      "Sculpted solar pathways, high clerestory glazing, and gentle diffused morning illumination engineered to illuminate without thermal penalty.",
    metaLeft: "Low-E Glazing",
    metaRight: "Solar Fins",
    iconName: "Sun",
  },
  {
    number: "03",
    category: "TACTILITY",
    title: "Material",
    description:
      "Tactile authenticity celebrating raw honed limestone, blackened architectural steel, acoustic wall panels, and aged brushed bronze joinery.",
    metaLeft: "Quarried Stone",
    metaRight: "Brushed Bronze",
    iconName: "Layers",
  },
  {
    number: "04",
    category: "SOVEREIGNTY",
    title: "Privacy",
    description:
      "Triple-layer acoustic decoupling, deep recessed courtyard geometries, and secluded inner sanctums secluded from both neighbor and streetscape.",
    metaLeft: "STC 58 Acoustic",
    metaRight: "Buffered Perimeter",
    iconName: "Shield",
  },
];

export interface MaterialSpec {
  specNumber: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  altText: string;
  colSpanDesktop: string;
}

export const MATERIAL_SPECS: MaterialSpec[] = [
  {
    specNumber: "SPEC 01",
    category: "FACADE STONE",
    title: "Honed Tuscan & Coromandel Travertine",
    subtitle: "Unfilled · Open Pore",
    description:
      "Cut against the vein to expose organic stratum, our facade masonry absorbs coastal humidity without degradation, establishing a patina that grows richer year after year.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLqfI52j67ueLmOSoZwaFiRsnZA46dnN8he3Q8T1zBJLcRj9FnoEZGunhLml2Y47HIvjwe-q7Nj-JonwPUwfIobtk-DZzTByaXgOM0_vOBjasCJQSemRXonOJTDY9QmgMBDwepVLEX4iJWQv88MHc2W9PR2lBswK0lV3V1vpVRSqXcj4NY3vdn5siMOfhI2uAWjcLL8p6BCWEzwOTwPdSRFlyjS7ixRaAXd_6Mg9dSqexxtDf2qoyT5Q",
    altText:
      "Macro tactile photograph of textured fluted travertine stone slab in warm afternoon sunlight, showing organic porous cavities and warm ivory earth tones.",
    colSpanDesktop: "lg:col-span-7",
  },
  {
    specNumber: "SPEC 02",
    category: "METALWORK",
    title: "Brushed Champagne Bronze",
    subtitle: "Hand-Waxed",
    description:
      "Solid cast bronze hardware tactile to the hand, balancing cold stone surfaces with tactile warmth.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArnJCFWV9P7ml1ir3CB34DgTDokeNpFlezWAK-4QK0GxRDDcLzyhJEREtbSXMStmZLk6T5Pnr8K33jw9bjPaGztBztgb9uQtotx869WQcSkZbjvbOrcA2jX6BkyqNkQ3EIdzNxLPnQ6se_vSR8npU--l1tNXNCbW51w--h1lR-GSmijER5sCvXf0g1-pE0tSQ9__2uBeqIu3WPXWKmNEBAtXLFVQiJDZDarPA_4GKskW1bdqM9NT64ng",
    altText:
      "Detailed close up of custom brushed champagne bronze door pulls and door joinery hardware against a minimalist dark rift oak door panel.",
    colSpanDesktop: "lg:col-span-5",
  },
  {
    specNumber: "SPEC 03",
    category: "GLAZING",
    title: "Acoustic Crystal Glazing",
    subtitle: "Low-E Triple Glazed",
    description:
      "Low-iron triple insulated panes preserving pure color fidelity while blocking 99.4% of solar heat gain.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiNyrjIpBQ0vuCcRxX2CkCiK4UPagB-KxF6yiC0snfX5eH7149JIb-S6yrxHqws_7dz9AyoR2ey-lBkga5jMYYovGVp1w0EmDFg1TH-RhjsUH1feAW3mAWuRUL9IE5wVsTHmZk6Hu8FofEKw1QlasgIupuOr2h2jmNXLN5XjHciMnFZJ-GJtPAc6gPpxzzIXyl3B4pyb4xKXMXyvPsC1807NLdEkZhMY-IC6nk4YvLN4E4ljLtKd-fYQ",
    altText:
      "Floor to ceiling seamless glass curtain wall framing an architectural reflecting pool and swaying palms in a serene luxury estate.",
    colSpanDesktop: "lg:col-span-4",
  },
  {
    specNumber: "SPEC 04",
    category: "BOTANICAL",
    title: "Indigenous Coastal Flora",
    subtitle: "Self-Sustaining",
    description:
      "Bespoke biophilic curation featuring native frangipani, date palms, and salt-tolerant coastal ferns requiring zero artificial irrigation.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZddMOBvNtOHXxPDZm6JVp0nl4jEcJgF3knYC4ewfkzqUVF3wyAZSJ9P_-knnI13bHDyghZmIPpE4GPLacyJ6XDMh8Fdi1Jfht8gPjzwwUSmAoJuOO0Dc7p_vLSrkxyfgv6hhrOK_XvjKk-81wHX_J3pl1jpmHuuHrsPjAN8DXb-MLzeuf96XmW2dRCRC0bcPXZTmVqFCqwGDmAg1ErgfR3490jtx5xQ5rbZ8o9XUsbteOZXfd1gVVRw",
    altText:
      "Lush tropical architectural landscaping with mature frangipani trees, elephant ears, and stone pathways surrounding a serene architectural water court.",
    colSpanDesktop: "lg:col-span-8",
  },
];

export interface Amenity {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export const AMENITIES: Amenity[] = [
  {
    id: "wellness",
    icon: "Flower2",
    title: "Thermal Wellness Spa",
    description:
      "Finnish dry cedar sauna, eucalyptus-infused steam suite, and chilled stone plunge pools designed for circadian contrast therapy.",
    tag: "Private Resident Access · 24 Hours",
  },
  {
    id: "pool",
    icon: "Waves",
    title: "25-Meter Heated Lap Pool",
    description:
      "Ozone-purified freshwater lap facility framed by sheltered stone colonnades and sunken private sunning daybeds.",
    tag: "Year-Round Temperature Controlled",
  },
  {
    id: "wine",
    icon: "Wine",
    title: "Sommelier Wine Vault",
    description:
      "Private climate-zoned cellar bays allocated to every estate residence, complete with an intimate private tasting salon.",
    tag: "Dual-Zone Humidity Regulation",
  },
  {
    id: "cinema",
    icon: "Clapperboard",
    title: "Private Screening Salon",
    description:
      "Dolby Atmos acoustic certification with custom cashmere-upholstered reclining banquettes and direct sommelier pantry service.",
    tag: "14-Seat Private Auditorium",
  },
  {
    id: "valet",
    icon: "Car",
    title: "Dedicated Estate Valet",
    description:
      "Discreet white-glove logistics, secure subterranean EV charging infrastructure, private aviation ground transfer handling, and parcels vault.",
    tag: "Bespoke Concierge Protocol",
  },
  {
    id: "security",
    icon: "ShieldCheck",
    title: "Sovereign Security Ring",
    description:
      "Multi-tiered biometric access control, optical perimeter sensors, and an independently powered emergency operations sanctuary.",
    tag: "Grade-A Decoupled Security",
  },
];

export const CONNECTIVITY_ITEMS = [
  {
    destination: "Chennai International Airport (Private Terminal)",
    duration: "25 MINS",
  },
  {
    destination: "The Madras Club & Boat Club Enclave",
    duration: "14 MINS",
  },
  {
    destination: "Coromandel Coastal Shoreline",
    duration: "03 MINS (WALK)",
  },
  {
    destination: "Apollo Speciality Healthcare Hub",
    duration: "18 MINS",
  },
];

export interface Hotspot {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  top: string;
  left: string;
}

export const PROMENADE_HOTSPOTS: Hotspot[] = [
  {
    id: "glazed-pavilion",
    number: "01",
    title: "Glazed Salon Pavilion",
    subtitle: "Feature 01",
    description:
      "Motorized floor-to-ceiling glass pockets completely into structural limestone piers for borderless outdoor transition.",
    top: "35%",
    left: "28%",
  },
  {
    id: "limestone-cantilever",
    number: "02",
    title: "Limestone Cantilever",
    subtitle: "Feature 02",
    description:
      "A 4.8-meter post-tensioned travertine overhang creates deep solar shading for lower-level salons during coastal mid-day glare.",
    top: "42%",
    left: "62%",
  },
  {
    id: "reflecting-court",
    number: "03",
    title: "Reflecting Water Court",
    subtitle: "Feature 03",
    description:
      "Integrated saltwater pool acts as an evaporative cooling element, tempering maritime air before it circulates into the residence.",
    top: "76%",
    left: "45%",
  },
];
