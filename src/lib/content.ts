/**
 * Verbatim site copy — source of truth is ../../../CONTENT.md, lifted
 * first-hand from brand-guide-final.pdf. Strings here are exact, not
 * paraphrase. The reconcile gate diffs rendered copy against this file.
 *
 * Copy that is NOT in the brand guide (new FAQ entries, Problem→Outcome,
 * mock testimonials, meta strings) is drafted separately and approved by
 * James before it lands here — see CONTENT-NEW.md (Phase 1/2).
 */

export const BRAND = {
  full: "JoNeX AI Technology Consulting",
  short: "JoNeX",
  tagline: "Identify Bottlenecks. Build Intelligent Systems. Scale Operations.",
  positioning:
    "We help organizations identify operational bottlenecks and deploy AI-powered solutions through Agentic AI, AI Voice Agents, intelligent automation, and custom software development.",
} as const;

export const HERO = {
  titleLead: "JoNeX AI",
  titleRest: "Technology Consulting",
  subhead:
    "We build AI-powered business systems that eliminate operational bottlenecks, automate workflows, and help organizations scale faster.",
  capabilityStrip: [
    "Agentic AI",
    "AI Voice Agents",
    "Intelligent Automation",
    "Custom Software",
  ],
} as const;

export const CAPABILITIES = [
  "Agentic AI Systems",
  "AI Voice & Chat Agents",
  "Intelligent Automation",
  "Custom Software Development",
] as const;

export type Industry = {
  name: string;
  segments: string;
  solutions: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    name: "Healthcare",
    segments:
      "Dermatology Clinics, Dental Clinics, Medical Clinics, MedSpas, Multi-Location Healthcare Groups.",
    solutions: [
      "Revenue Cycle Automation",
      "Eligibility Verification",
      "Prior Authorization",
      "AI Receptionists",
      "Medical OCR",
      "Claims Processing",
      "Accounts Receivable Automation",
      "Executive Dashboards",
    ],
  },
  {
    name: "E-Commerce",
    segments: "Shopify, Amazon, B2B Commerce, DTC Brands.",
    solutions: [
      "Order Processing Automation",
      "Inventory Synchronization",
      "Marketplace Operations",
      "Automated Invoicing",
      "Customer Support",
      "Revenue Reporting",
      "Operational Dashboards",
    ],
  },
  {
    name: "Home Services",
    segments: "HVAC, Plumbing, Roofing, Electrical, Cleaning, Landscaping, Pest Control.",
    solutions: [
      "AI Receptionists",
      "Lead Qualification",
      "Dispatch Automation",
      "Appointment Scheduling",
      "CRM Automation",
      "Service Dashboards",
    ],
  },
  {
    name: "Professional Services",
    segments: "Consulting Firms, Agencies, Accounting, Legal, Financial Services.",
    solutions: [
      "CRM Automation",
      "Client Onboarding",
      "Workflow Automation",
      "Lead Management",
      "Reporting & Analytics",
    ],
  },
  {
    name: "Multi-Location & Franchise Operations",
    segments:
      "Restaurants, Restaurant Chains, Cafes, Coffee Shops, Hotels, Resorts, Retail Chains, Fitness Centers, Salon & Spa Chains, Healthcare Groups.",
    solutions: [
      "Reservation Automation",
      "Customer Support Automation",
      "Multi-Location CRM",
      "Branch Dashboards",
      "Review Management",
      "Executive Reporting",
    ],
  },
  {
    name: "Construction & Field Operations",
    segments:
      "General Contractors, Construction Firms, Property Management, Field Service Businesses.",
    solutions: [
      "Lead Intake Automation",
      "Scheduling Automation",
      "Operations Dashboards",
      "Workflow Automation and Reporting",
    ],
  },
];

export const CONSULTING_SERVICES = [
  "Business Process Analysis",
  "Workflow Audits",
  "Process Mapping",
  "AI Readiness Assessment",
  "Automation Strategy",
  "Technology Consulting",
  "Digital Transformation Planning",
] as const;

export const ENGAGEMENT_MODELS = [
  "Strategic Technology Consulting",
  "Project-Based Implementations",
  "Agentic AI & Automation Development",
  "Custom Software Development",
  "Dedicated Development Support",
  "Fractional AI & Automation Partner",
  "Managed Services & Optimization",
  "Freelance & Contract Services",
] as const;

/** Spearhead conversion copy reused from the live site (keep, elevate). */
export const SPEARHEAD = {
  headline: "AI That Picks Up Your Phone",
  points: [
    "Sounds Like a Real Person",
    "Never Lose a Lead",
    "More Calls, More Revenue",
    "An AI Team Member That Never Clocks Out",
    "Your Business Runs Even When You Don't",
  ],
  process: ["Strategy Call", "We Build It", "Test Together", "Go Live"],
  primaryCta: "Book Your Free Strategy Call",
} as const;

export const FOOTER_COPY = {
  name: "JoNeX AI Technology Consulting",
  tagline: "Identify Bottlenecks. Build Intelligent Systems. Scale Operations.",
  blurb:
    "Helping organizations transform operations through Agentic AI, AI Voice Agents, intelligent automation, custom software development, and technology consulting.",
  availability:
    "Available for consulting, project-based, retainer, managed services, and freelance engagements.",
} as const;
