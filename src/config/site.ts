/**
 * Everything about the organisation lives in this file.
 * To launch for a real charity, edit the values below; no page code needs to change.
 */

export const site = {
  // --- Identity -------------------------------------------------------------
  name: "LifeSpring Foundation",
  shortName: "LifeSpring",
  tagline: "Every family deserves a spring after winter.",
  description:
    "LifeSpring Foundation supports families, seniors and young people across Singapore through education, community outreach, elderly care and youth programmes.",
  founded: 2010,
  country: "Singapore",
  // Shown in the footer, on the donate page and on /governance.
  uen: "2010XXXXXA",
  charityNumber: "CH0XXXX",
  ipcValidUntil: "2028-06-30", // empty if the organisation is not an IPC

  // --- Contact --------------------------------------------------------------
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lifespring-foundation.vercel.app",
  email: "hello@lifespring.sg",
  phone: "+65 6123 4567",
  whatsapp: "6561234567", // digits only, with country code; empty hides the button
  address: { street: "123 Orchard Road, #05-12", city: "Singapore", postalCode: "238881", country: "SG" },
  hours: "Mon – Fri, 9am – 6pm",
  mapUrl: "https://maps.google.com/?q=Orchard+Road+Singapore",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },

  // --- Demo mode ------------------------------------------------------------
  // true shows the "concept website" bar and lets forms succeed without an email provider.
  demo: true,
  credit: { name: "Sandeep Kumar", url: "https://github.com/sandeepk2304" },
};

// --- Donations ---------------------------------------------------------------
export const donations = {
  currency: "SGD",
  symbol: "$",
  // A hosted checkout: Stripe Payment Link, Giving.sg campaign page, etc.
  // "{amount}" and "{frequency}" are replaced when present. Empty = demo notice instead of redirect.
  checkoutUrl: process.env.NEXT_PUBLIC_DONATE_URL ?? "",
  presets: [30, 80, 150, 300],
  defaultAmount: 80,
  minimum: 10,
  // What a gift makes possible. Shown live as the donor picks an amount.
  impact: [
    { upTo: 49, text: "school supplies and a term of homework help for one child" },
    { upTo: 99, text: "a month of hot meals delivered to a senior living alone" },
    { upTo: 199, text: "a full health screening and follow-up visit for two seniors" },
    { upTo: 499, text: "a term of weekly mentoring for a young person at risk" },
    { upTo: Infinity, text: "a scholarship that keeps a student in school for a year" },
  ],
  // IRAS: 250% deduction for qualifying donations to IPCs made up to 31 Dec 2026 (Budget 2026 announced an extension to 2029).
  taxNote: "Gifts to an IPC qualify for 250% tax deduction. Add your NRIC, FIN or UEN and we file it with IRAS for you.",
  // PayNow to the charity's UEN. Empty hides the PayNow option.
  paynowUen: "2010XXXXXA",
};

// --- Governance and transparency (shown on /governance) ---------------------
export const governance = {
  board: [
    { name: "Mr. Tan Wei Ming", role: "Chairman", since: 2019 },
    { name: "Ms. Nur Aisyah", role: "Treasurer", since: 2021 },
    { name: "Dr. Rajesh Menon", role: "Secretary", since: 2020 },
    { name: "Ms. Grace Lee", role: "Board member, Audit", since: 2022 },
  ],
  // Add the real PDFs to /public/reports and link them here; empty url shows "available on request".
  reports: [
    { year: "FY2025", title: "Annual report and audited financial statements", url: "" },
    { year: "FY2024", title: "Annual report and audited financial statements", url: "" },
  ],
  policies: [
    "Conflict of interest policy",
    "Reserves policy",
    "Whistle-blowing policy",
    "Safeguarding policy for children and vulnerable adults",
    "Personal Data Protection policy (PDPA)",
  ],
  codeOfGovernance: "We file our Governance Evaluation Checklist on the Charity Portal each year, on a comply-or-explain basis.",
  charityPortalUrl: "https://www.charities.gov.sg",
  auditor: "Independent external auditor, appointed annually",
};

// The problem we exist to solve (home page). Replace with sourced figures for a real charity.
export const need = {
  title: "Hardship in Singapore is often hidden.",
  body:
    "Behind the clean streets are seniors who eat one meal a day, children who study without a laptop, and parents one bill away from crisis. Most of them never ask for help.",
  points: [
    { value: "1 in 3", label: "seniors we visit live alone" },
    { value: "42%", label: "of our families earn under $2,000 a month" },
    { value: "6 weeks", label: "average wait for help before they found us" },
  ],
};

// Organisations that support the work. Names only; add logos in /public/partners when available.
export const partners = ["Orchard Rotary", "Harbourfront Bank", "Kampong Grocers", "Northpoint Clinics", "Lumen Foundation", "Tampines CC"];

// --- Current campaign (set to null to hide) ----------------------------------
export const campaign: { title: string; blurb: string; raised: number; goal: number; donors: number; endsOn: string } | null = {
  title: "Warm Meals for Seniors 2026",
  blurb: "Help us deliver 20,000 hot meals to seniors living alone in Toa Payoh, Bedok and Woodlands before year end.",
  raised: 64_300,
  goal: 100_000,
  donors: 812,
  endsOn: "2026-12-31",
};

// --- Numbers -----------------------------------------------------------------
export const stats = [
  { value: "2,500+", label: "families supported this year" },
  { value: "48", label: "community programmes" },
  { value: "850+", label: "active volunteers" },
  { value: "$5.2M", label: "raised since 2010" },
];

// Where each dollar goes. Percentages should add up to 100.
export const finances = {
  year: "FY2025",
  reportUrl: "", // link to the annual report PDF; empty hides the button
  split: [
    { label: "Programmes", percent: 82 },
    { label: "Fundraising", percent: 10 },
    { label: "Administration", percent: 8 },
  ],
};

// --- Programmes --------------------------------------------------------------
export const programs = [
  {
    slug: "education",
    title: "Educational Scholarships",
    short: "Scholarships, tuition and mentoring for students from low-income families.",
    description:
      "Education is the great equaliser. Our scholarships cover school fees, tuition and digital devices, and every scholar is paired with a mentor who stays with them through exams.",
    objectives: ["Reduce dropout rates", "Provide access to digital learning tools", "Offer career guidance and mentorship"],
    beneficiaries: "Students aged 7–18 from low-income households",
    reach: "640 scholars this year",
  },
  {
    slug: "community",
    title: "Community Outreach",
    short: "Food drives, crisis relief and neighbourhood bonding in mature estates.",
    description:
      "Resilient neighbourhoods look after their own. We run weekly food distribution, emergency relief for families in crisis, and community events that turn neighbours into a support network.",
    objectives: ["Ensure food security for vulnerable households", "Foster community cohesion", "Provide immediate crisis relief"],
    beneficiaries: "Low-income families and vulnerable individuals",
    reach: "1,900 households reached",
  },
  {
    slug: "elderly",
    title: "Elderly Care",
    short: "Befriending, health screenings and daily help for seniors living alone.",
    description:
      "Singapore is ageing fast, and many seniors live alone. Our befrienders visit weekly, our nurses run health screenings, and volunteers help with groceries, appointments and paperwork.",
    objectives: ["Reduce social isolation", "Improve physical and mental well-being", "Help seniors navigate healthcare"],
    beneficiaries: "Seniors aged 65+ living alone",
    reach: "1,150 seniors befriended",
  },
  {
    slug: "youth",
    title: "Youth Empowerment",
    short: "Mentoring, leadership and career guidance for young people at risk.",
    description:
      "Every teenager deserves an adult in their corner. Our youth programme combines one-to-one mentoring, leadership camps and vocational guidance so young people can choose their own path.",
    objectives: ["Develop leadership and life skills", "Provide safe spaces after school", "Offer vocational and career planning"],
    beneficiaries: "Young people aged 13–21",
    reach: "420 youths mentored",
  },
];

// --- Stories -----------------------------------------------------------------
export const stories = [
  {
    name: "The Lim family",
    challenge:
      "When Mr. Lim lost his job during the pandemic, the family of four struggled to pay rent and school fees. The children were at risk of dropping out.",
    outcome:
      "Today Mr. Lim is employed after our vocational retraining programme, the family's finances are stable, and both children are doing well in school with our education subsidies. They now volunteer with us.",
  },
  {
    name: "Ahmad's journey",
    challenge:
      "At 15, Ahmad was skipping school and spending time with the wrong crowd. With little support at home, his future looked uncertain.",
    outcome:
      "Mentoring changed his outlook. He scored well in his N-Levels, is studying for a diploma at a polytechnic, and now mentors younger boys in the same programme that helped him.",
  },
];

export const testimonials = [
  {
    quote: "LifeSpring gave my children the support they needed when things were incredibly hard. We are forever grateful.",
    name: "Sarah L.",
    role: "Parent, Education programme",
  },
  {
    quote: "Volunteering here is the most rewarding thing I do all week. You see the difference you make on every visit.",
    name: "David C.",
    role: "Volunteer befriender",
  },
  {
    quote: "The vocational programme turned my life around. I have a stable job now and can support my family with dignity.",
    name: "Ahmad I.",
    role: "Programme graduate",
  },
];

// --- People & volunteering ---------------------------------------------------
export const team = [
  { name: "Dr. Amanda Chen", role: "Executive Director" },
  { name: "Marcus Tan", role: "Head of Programmes" },
  { name: "Sarah Ibrahim", role: "Community Lead" },
];

export const values = [
  { title: "Compassion", body: "We meet every person with empathy and without judgement." },
  { title: "Integrity", body: "We hold ourselves to the highest ethical standards." },
  { title: "Transparency", body: "We publish where every dollar goes, every year." },
  { title: "Community", body: "Lasting change comes from neighbours helping neighbours." },
];

export const volunteerRoles = [
  { role: "Youth Mentor", location: "Islandwide", time: "2 hrs / week" },
  { role: "Food Distribution Assistant", location: "Tampines Hub", time: "Weekends, 4 hrs" },
  { role: "Elderly Befriender", location: "Toa Payoh", time: "Flexible" },
  { role: "Academic Tutor (Maths / Science)", location: "Online or Woodlands", time: "3 hrs / week" },
  { role: "Event Photographer", location: "Various", time: "Ad hoc" },
  { role: "Admin Volunteer", location: "Orchard HQ", time: "Weekdays, flexible" },
];

// --- Donor questions ---------------------------------------------------------
export const faqs = [
  {
    q: "Is my donation tax deductible?",
    a: "Yes. Donations to an IPC qualify for 250% tax deduction. Give us your NRIC or UEN when donating and we file the deduction with IRAS for you.",
  },
  {
    q: "How much of my gift goes to programmes?",
    a: "82 cents of every dollar goes directly to programmes. Our audited accounts are published every year.",
  },
  {
    q: "Can I give monthly?",
    a: "Yes. Monthly gifts let us plan programmes a year ahead. You can change or cancel anytime by emailing us.",
  },
  {
    q: "Can my company partner with you?",
    a: "We work with companies on volunteering days, matched giving and sponsored programmes. Get in touch and our partnerships team will reply within two working days.",
  },
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programmes" },
  { href: "/impact", label: "Impact" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export const money = (n: number) => `${donations.symbol}${n.toLocaleString("en-SG")}`;
