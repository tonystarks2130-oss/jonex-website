/**
 * Verbatim site copy: source of truth is ../../../CONTENT.md, lifted
 * first-hand from brand-guide-final.pdf. Strings here are exact, not
 * paraphrase. The reconcile gate diffs rendered copy against this file.
 *
 * Copy that is NOT in the brand guide (new FAQ entries, Problem→Outcome,
 * mock testimonials, meta strings) is drafted separately and approved by
 * James before it lands here. See CONTENT-NEW.md (Phase 1/2).
 */

export const BRAND = {
  full: "JoNex AI Technology Consulting",
  short: "JoNex",
  tagline: "Identify Bottlenecks. Build Intelligent Systems. Scale Operations.",
  positioning:
    "We help organizations identify operational bottlenecks and deploy AI-powered solutions through Agentic AI, AI Voice Agents, intelligent automation, and custom software development.",
} as const;

export const HERO = {
  titleLead: "JoNex AI",
  titleRest: "Technology Consulting",
  subhead:
    "We build AI-powered business systems that eliminate operational bottlenecks, automate workflows, and help organizations scale faster.",
  capabilityStrip: [
    "Agentic AI",
    "AI Voice Agents",
    "Intelligent Automation",
    "Custom Software",
  ],
  // Glass pill badges above the H1 (approved 2026-06-13; badge 2 = brand vocab).
  badges: [
    "AI Receptionist Systems",
    "Voice AI • Automation • Custom Software",
  ],
  // Glass proof strip under the CTAs, honest capability claims, no stats.
  proof: [
    "Never misses a caller",
    "Captures lead details",
    "Sends instant summaries",
    "Works 24/7",
  ],
  // Floating outcome cards around the demo (desktop only), what the AI does
  // on a call. Descriptive, not fabricated metrics.
  outcomes: [
    { title: "Lead captured", detail: "Name • Phone • Service needed" },
    { title: "Staff notified", detail: "Summary sent instantly" },
    { title: "Follow-up ready", detail: "Booking link sent" },
  ],
} as const;

export const CAPABILITIES = [
  "Agentic AI Systems",
  "AI Voice & Chat Agents",
  "Intelligent Automation",
  "Custom Software Development",
] as const;

export type ServiceOffering = {
  title: string;
  description: string;
  bestFor: string;
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    title: "Website & Landing Pages",
    description:
      "Conversion-focused websites with fast load times, clean messaging, and premium UI.",
    bestFor: "Best for: service businesses, clinics, agencies, and local brands.",
  },
  {
    title: "AI Agents & Automation",
    description:
      "Voice agents, chat agents, lead routing, CRM workflows, and follow-up systems.",
    bestFor: "Best for: teams drowning in repetitive admin and sales tasks.",
  },
  {
    title: "Custom Software & SaaS",
    description:
      "Dashboards, portals, MVPs, internal tools, and scalable business platforms.",
    bestFor: "Best for: businesses that need workflows turned into software.",
  },
];

export type HelpArea = {
  label: string;
  items: string[];
};

export const HELP_AREAS: HelpArea[] = [
  {
    label: "Strategy",
    items: [
      "Business Process Analysis",
      "Workflow Audits",
      "Process Mapping",
      "AI Readiness Assessment",
      "Automation Strategy",
    ],
  },
  {
    label: "Build",
    items: [
      "Agentic AI & Automation Development",
      "Custom Software Development",
      "Project-Based Implementations",
      "Website & App Builds",
      "SaaS MVP Development",
    ],
  },
  {
    label: "Support",
    items: [
      "Dedicated Development Support",
      "Fractional AI & Automation Partner",
      "Managed Services & Optimization",
      "Technology Consulting",
      "Freelance & Contract Services",
    ],
  },
];

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

/**
 * "Behind JoNex" founders (DESIGN_CONTRACT IA - Behind/Team, rapidmed.app
 * founder-card style: photo + name + role + personal quote + socials).
 *
 * Names + roles are VERIFIED (PROJECT_STATE team roster). Quotes are each person's
 * own approved words; `socials`/`email` are their real public handles where supplied
 * (an empty `socials` array simply hides that founder's link row until they send them).
 * Never fabricate a person's words, face, or links. Creator is deliberately absent
 * (hidden from public surfaces).
 */
export type Founder = {
  name: string;
  role: string;
  /** Optional secondary descriptor shown smaller/muted under the role. */
  subRole?: string;
  initials: string;
  quote: string;
  photo: string | null;
  /** Optional contact email, renders a "Get in touch" mailto when present. */
  email?: string;
  socials: { label: string; href: string }[];
  /** Optional click-to-copy contacts (e.g. email/Telegram), shown as copy buttons
   *  instead of profile links for founders who prefer a minimal contact surface. */
  copyContacts?: { label: "Email" | "Telegram"; value: string }[];
};

export const FOUNDERS: Founder[] = [
  {
    name: "Jeremy",
    role: "Founder & CEO",
    initials: "Je",
    quote:
      "I believe AI should remove complexity, giving businesses the freedom to focus on innovation, growth, and what matters most.",
    photo: "/team/jeremy.jpg",
    email: "jeremy@jonex.site",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jeremy-jay-suva-5b9471369/" },
      { label: "Facebook", href: "https://www.facebook.com/jeremy.suva/" },
      { label: "Instagram", href: "https://www.instagram.com/jay_avus/" },
      { label: "WhatsApp", href: "https://wa.me/639569871934" },
    ],
  },
  {
    name: "James",
    role: "Founding Engineer",
    subRole: "Forward Deployed Engineer",
    initials: "Ja",
    quote:
      "What excites me most is building systems that take real pain off our clients' shoulders: fixing what slows them down, simplifying what overwhelms them, and giving them the freedom to focus on growing their business.",
    photo: "/team/james.jpg",
    socials: [],
    copyContacts: [
      { label: "Email", value: "james@jonex.site" },
      { label: "Email", value: "santiagobarruga@gmail.com" },
      { label: "Telegram", value: "@JamesB_Dev" },
    ],
  },
  {
    name: "Jimmy",
    role: "Chief Technical Officer",
    initials: "Ji",
    quote:
      "Good AI is invisible. You don't notice it; you just notice that things stopped breaking.",
    photo: "/team/jimmy.jpg",
    email: "jimpot66@gmail.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jamesbaydal" },
      { label: "Facebook", href: "https://www.facebook.com/Jimpooot" },
      { label: "Instagram", href: "https://www.instagram.com/jamestbaydal/" },
      { label: "YouTube", href: "https://www.youtube.com/@Pot00790" },
      { label: "TikTok", href: "https://www.tiktok.com/@jimpot305" },
    ],
  },
];

/**
 * FAQ (DESIGN_CONTRACT IA §13). Single source for both the visible accordion
 * and the FAQPage JSON-LD (schema MUST mirror visible content). NEW objection
 * copy, Creator-drafted; healthcare-compliance entry is the taraai-can't-answer
 * differentiator.
 */
export const FAQS = [
  {
    q: "I don't know exactly what I need yet.",
    a: "That's the point of the free strategy call. We map your operation, find the bottleneck, and tell you what's worth building. No obligation.",
  },
  {
    q: "How fast can we go live?",
    a: "Most builds go live in about two weeks: a strategy call, we build it, we test it with you, then ship.",
  },
  {
    q: "Do you handle healthcare data and compliance?",
    a: "Yes. We build compliance-conscious systems for clinics and healthcare groups: revenue-cycle automation, eligibility, and claims, with security designed in, not bolted on.",
  },
  {
    q: "Do we own what you build, or rent it?",
    a: "You own it. We engineer systems on your infrastructure, not a rented black box you can't leave.",
  },
] as const;

export const FOOTER_COPY = {
  name: "JoNex AI Technology Consulting",
  tagline: "Identify Bottlenecks. Build Intelligent Systems. Scale Operations.",
  blurb:
    "Helping organizations transform operations through Agentic AI, AI Voice Agents, intelligent automation, custom software development, and technology consulting.",
  availability:
    "Available for consulting, project-based, retainer, managed services, and freelance engagements.",
} as const;

export type StackLayer = {
  label: string;
  caption: string;
  items: string[];
};

export const ENGINEERED_STACK: StackLayer[] = [
  {
    label: "Clinical Systems",
    caption: "Systems we integrate with",
    items: ["ModMed / EMA", "Nextech", "Open Dental", "athenahealth", "Epic", "Oracle Health (Cerner)", "eClinicalWorks", "FHIR / HL7"],
  },
  {
    label: "Cloud & Security",
    caption: "HIPAA-aligned foundation",
    items: ["Microsoft Azure", "AWS", "Microsoft Entra ID", "Azure Key Vault", "Blob Storage", "Azure Monitor"],
  },
  {
    label: "AI & Voice",
    caption: "The reasoning and conversation layer",
    items: ["Azure OpenAI", "Claude", "Retell AI", "ElevenLabs", "Twilio"],
  },
  {
    label: "Automation & Build",
    caption: "How the systems get built and wired",
    items: ["n8n", "Next.js", "React", "FastAPI", "PostgreSQL", "GitHub", "GoHighLevel"],
  },
];

export type HealthcareTrustPoint = { label: string; detail: string };
export type HealthcareCapability = {
  name: string;
  detail: string;
  flagship?: boolean;
};

export const HEALTHCARE_SPECIALTY: {
  eyebrow: string;
  title: string;
  intro: string;
  trustPoints: HealthcareTrustPoint[];
  capabilities: HealthcareCapability[];
  servedSegments: string[];
  disclosure: string;
} = {
  eyebrow: "Our Flagship Specialty",
  title: "Healthcare AI, engineered HIPAA-aligned",
  intro:
    "Deployed in your own Azure tenant, so you keep ownership of your data and your compliance chain. We build, configure, and manage the systems; protected health information stays under your control.",
  trustPoints: [
    {
      label: "Your Azure tenant",
      detail:
        "Systems deploy into your cloud, not ours, so you own the data and the BAA chain.",
    },
    {
      label: "HIPAA-aligned by design",
      detail:
        "Enterprise architecture with encryption, least-privilege access, and audit logging.",
    },
    {
      label: "No PHI in AI tooling",
      detail:
        "Reasoning models and dev tools never touch protected health information.",
    },
    {
      label: "End-to-end",
      detail:
        "Discovery, build, deploy, and managed services. We don't hand you a half-built system.",
    },
  ],
  capabilities: [
    {
      name: "AI Voice Receptionists",
      flagship: true,
      detail:
        "Answers calls 24/7, books appointments, handles FAQs, and routes urgent calls to staff.",
    },
    {
      name: "Workflow Automation",
      detail:
        "Intake, reminders, recalls, insurance prompts, follow-ups, and charge capture.",
    },
    {
      name: "Custom Healthcare Software",
      detail:
        "Patient portals, internal tools, dashboards, and lightweight EHR add-ons.",
    },
    {
      name: "Patient Websites & Booking",
      detail:
        "Fast, secure sites with online booking wired into your existing scheduler.",
    },
    {
      name: "CRM / GoHighLevel",
      detail:
        "Lead capture and nurture for cosmetic and elective patient acquisition.",
    },
    {
      name: "Internal Dashboards",
      detail:
        "Role-based KPIs: schedule, no-show rate, and pending charges at a glance.",
    },
  ],
  servedSegments: [
    "Dental",
    "Dermatology & Aesthetic",
    "Medical & Specialty Clinics",
    "Multi-Location Healthcare Groups",
  ],
  disclosure:
    "We build healthcare technology solutions using HIPAA-aligned architecture, security controls, and industry best practices, in collaboration with client compliance requirements.",
};

export type CallTurn = { speaker: "AI" | "Caller"; line: string };

export const AI_VOICE_HIGHLIGHT: {
  eyebrow: string;
  title: string;
  intro: string;
  sampleClinic: string;
  sampleLabel: string;
  transcript: CallTurn[];
  steps: string[];
  capabilities: string[];
} = {
  eyebrow: "Flagship Service",
  title: "Hear how a clinic call actually goes",
  intro:
    "Every call answered, day or night. The AI receptionist books appointments, handles the routine questions, and routes anything urgent to your staff, so the front desk never has to choose between the phone and the patient in the room.",
  sampleClinic: "Brightsmile Dental",
  sampleLabel: "Example call",
  transcript: [
    { speaker: "AI", line: "Thanks for calling Brightsmile Dental, this is Dex. How can I help?" },
    { speaker: "Caller", line: "I chipped a tooth and I need to come in this week." },
    {
      speaker: "AI",
      line: "I'm sorry to hear that. I can book you in. Can I get your name and a callback number?",
    },
    { speaker: "Caller", line: "Maria Santos, (415) 555-0142." },
    {
      speaker: "AI",
      line: "Thanks, Maria. Dr. Lee has Thursday at 2:00 PM or Friday at 10:30 AM. Which works better?",
    },
    { speaker: "Caller", line: "Thursday at 2." },
    {
      speaker: "AI",
      line: "Booked for Thursday at 2:00 PM with Dr. Lee. I've texted your confirmation. If it becomes painful before then, please call us or seek urgent care.",
    },
  ],
  steps: [
    "Answers every call, 24/7",
    "Understands the request",
    "Checks your scheduler and books",
    "Texts the confirmation",
    "Routes urgent or clinical calls to staff",
  ],
  capabilities: [
    "Never miss an after-hours call",
    "Fewer no-shows with reminders",
    "Front desk freed from the phone",
    "Books into your existing scheduler",
  ],
};

export const STACK_ORBIT_COPY = {
  eyebrow: "Full-Stack Engineering",
  title: "One team. The entire stack.",
  intro:
    "From the clinical systems you already run to the cloud, AI, and automation underneath, we engineer across the whole stack, end to end. No hand-offs, no gaps.",
} as const;

export const ORBIT_INTEGRATIONS = [
  {
    name: "ModMed",
    logo: "/logos/ehr/modmed.png",
    blurb:
      "Specialty EHR/PM for dermatology, aesthetics & ophthalmology. We connect via FHIR so the AI books visits, updates charts, and captures charges inside it.",
  },
  {
    name: "Epic",
    logo: "/logos/ehr/epic.png",
    blurb:
      "The enterprise EHR standard. We integrate through SMART-on-FHIR, so automation and patient tools work alongside Epic with no workflow disruption.",
  },
  {
    name: "Oracle Health",
    logo: "/logos/ehr/oraclehealth.png",
    blurb:
      "Enterprise hospital EHR (formerly Cerner). We connect via FHIR to bring schedules, encounters, and records to your AI and dashboards.",
  },
  {
    name: "athenahealth",
    logo: "/logos/ehr/athenahealth.png",
    blurb:
      "Cloud EHR/PM with a clean API. We wire intake, reminders, and booking straight in via its Marketplace + FHIR.",
  },
  {
    name: "eClinicalWorks",
    logo: "/logos/ehr/ecw.png",
    blurb:
      "Widely-used EHR/PM. We integrate through the eCW Open API + FHIR to automate intake, recalls, and follow-ups.",
  },
  {
    name: "NextGen",
    logo: "/logos/ehr/nextgen.png",
    blurb:
      "Ambulatory EHR/PM with a strong API. We connect via FHIR + the App Gallery so voice and automation fit your specialty workflows.",
  },
  {
    name: "DrChrono",
    logo: "/logos/ehr/drchrono.png",
    blurb:
      "Modern cloud + mobile EHR. Its public REST/FHIR API lets us connect patient, clinical, and billing data fast.",
  },
  {
    name: "Open Dental",
    logo: "/logos/ehr/opendental.png",
    blurb:
      "The most open dental PM. Its well-documented API is the cleanest place to wire AI booking, reminders, and recalls.",
  },
] as const;

export type OrbitIntegration = (typeof ORBIT_INTEGRATIONS)[number];
