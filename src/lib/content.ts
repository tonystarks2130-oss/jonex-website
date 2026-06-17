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
  // Glass pill badges above the H1 (approved 2026-06-13; badge 2 = brand vocab).
  badges: [
    "AI Receptionist Systems",
    "Voice AI • Automation • Custom Software",
  ],
  // Glass proof strip under the CTAs — honest capability claims, no stats.
  proof: [
    "Never misses a caller",
    "Captures lead details",
    "Sends instant summaries",
    "Works 24/7",
  ],
  // Floating outcome cards around the demo (desktop only) — what the AI does
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
 * "Behind JoNeX" founders (DESIGN_CONTRACT IA — Behind/Team, rapidmed.app
 * founder-card style: photo + name + role + personal quote + socials).
 *
 * Names + roles are VERIFIED (PROJECT_STATE team roster). `quote` is `_draft`
 * Creator-drafted placeholder pending each person's real words. `photo` is null
 * until James confirms the headshot mapping — rendered as an initials avatar
 * meanwhile (FLAGS.founders gates the swap to real). Never fabricate a person's
 * words or face. Creator is deliberately absent (hidden from public surfaces).
 */
export type Founder = {
  name: string;
  role: string;
  /** Optional secondary descriptor shown smaller/muted under the role. */
  subRole?: string;
  initials: string;
  quoteDraft: string;
  photo: string | null;
  socials: { label: string; href: string }[];
};

export const FOUNDERS: Founder[] = [
  {
    name: "Jeremy",
    role: "Founder & CEO",
    initials: "Je",
    quoteDraft:
      "I started JoNeX to give growing businesses the intelligent systems that used to be out of reach — built properly, owned fully, and supported like a real partner.",
    photo: "/team/jeremy.jpg",
    socials: [],
  },
  {
    name: "James",
    role: "Founding Engineer",
    subRole: "Forward Deployed Engineer",
    initials: "Ja",
    quoteDraft:
      "Anyone can wire a template. We engineer systems around how your business actually runs — secure, reliable, and built to last.",
    photo: null,
    socials: [],
  },
  {
    name: "Jimmy",
    role: "Chief Technical Officer",
    initials: "Ji",
    quoteDraft:
      "The systems we ship have to stay up when it matters most. I build the foundation underneath — fast, secure, and never the reason you miss a call.",
    photo: "/team/jimmy.jpg",
    socials: [],
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
    a: "That's the point of the free strategy call. We map your operation, find the bottleneck, and tell you what's worth building — no obligation.",
  },
  {
    q: "How fast can we go live?",
    a: "Most builds go live in about two weeks: a strategy call, we build it, we test it with you, then ship.",
  },
  {
    q: "Do you handle healthcare data and compliance?",
    a: "Yes. We build compliance-conscious systems for clinics and healthcare groups — revenue-cycle automation, eligibility, and claims — with security designed in, not bolted on.",
  },
  {
    q: "Do we own what you build, or rent it?",
    a: "You own it. We engineer systems on your infrastructure — no rented black box you can't leave.",
  },
] as const;

export const FOOTER_COPY = {
  name: "JoNeX AI Technology Consulting",
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
    "Deployed in your own Azure tenant — you keep ownership of your data and your compliance chain. We build, configure, and manage the systems; protected health information stays under your control.",
  trustPoints: [
    {
      label: "Your Azure tenant",
      detail:
        "Systems deploy into your cloud, not ours — you own the data and the BAA chain.",
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
        "Discovery, build, deploy, and managed services — we don't hand you a half-built system.",
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
        "Role-based KPIs — schedule, no-show rate, and pending charges at a glance.",
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
    "Every call answered, day or night. The AI receptionist books appointments, handles the routine questions, and routes anything urgent to your staff — so the front desk never has to choose between the phone and the patient in the room.",
  sampleClinic: "Brightsmile Dental",
  sampleLabel: "Example call",
  transcript: [
    { speaker: "AI", line: "Thanks for calling Brightsmile Dental — how can I help?" },
    { speaker: "Caller", line: "I chipped a tooth and I need to come in this week." },
    {
      speaker: "AI",
      line: "I'm sorry to hear that. I can book you in — can I get your name and a callback number?",
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
