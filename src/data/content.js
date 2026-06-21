// Content for Rohith Babu ME — Co-founder & CTO of Welbuilt AI Solutions Pvt Ltd.
// Voice: a technical founder leading engineering — "I architect / we engineer / we ship",
// distinct from the COO/operations voice of the sister portfolio.

export const FOUNDER = {
  name: 'Rohith Babu ME',
  firstName: 'Rohith',
  roles: ['Co-founder', 'CTO'],
  company: 'Welbuilt',
  companyFull: 'Welbuilt AI Solutions Pvt Ltd',
  positionLine: 'Co-founder & CTO, Welbuilt AI Solutions Pvt Ltd',
  tagline: 'Architect. Engineer. Ship with AI.',
  // Short hero positioning line.
  intro:
    'I lead the engineering and architecture behind Welbuilt AI Solutions — designing the systems, AI products and platforms that turn ideas into shipped software, real users and lasting scale.',
}

export const ABOUT = {
  lead: 'I don’t just write code. I architect the systems that let a company keep shipping as it grows.',
  paragraphs: [
    'As Co-founder & CTO of Welbuilt AI Solutions Pvt Ltd, I own the technology direction across our ecosystem — from system architecture and AI research to the engineering practices that turn a roadmap into production software.',
    'My work sits at the intersection of software engineering and applied AI: designing platforms, agentic systems and the infrastructure underneath them, then building the teams and standards that keep that work fast, reliable and maintainable.',
    'Every product you see here is something my team and I have architected, engineered and shipped together — from apps live in the market with tens of thousands of users to AI systems in active development.',
  ],
  pillars: [
    { key: 'Architect', desc: 'System design, data models and the infrastructure decisions that decide whether a product can scale.' },
    { key: 'Engineer', desc: 'Web, mobile, SaaS and custom software — built clean, typed and tested, engineered to ship.' },
    { key: 'Automate', desc: 'AI agents, RAG pipelines and agentic workflows that remove the human bottleneck.' },
    { key: 'Scale', desc: 'Performance, reliability and engineering practice that let products grow without breaking.' },
  ],
}

// The 5 brands / technology divisions under Welbuilt — framed from the engineering side.
export const BRANDS = [
  {
    id: 'sparks-ai',
    index: '01',
    name: 'Sparks AI',
    division: 'Core Engineering & Product',
    blurb:
      'The core software brand — system architecture, product engineering, SaaS platforms and full-stack delivery from concept to production.',
    services: ['Web & Mobile', 'SaaS Platforms', 'ERP & CRM', 'System Architecture', 'Custom Software', 'E-Commerce'],
    accent: '#F5B82E',
  },
  {
    id: 'spark-labs',
    index: '02',
    name: 'Spark Labs',
    division: 'AI & Automation R&D',
    blurb:
      'The R&D engine — AI agents, agentic workflows, RAG systems and intelligent automation, taken from research to working product.',
    services: ['AI Agents', 'Agentic Workflows', 'RAG Pipelines', 'Generative AI', 'LLM Integration', 'Automation'],
    accent: '#FFD15C',
  },
  {
    id: 'sparks-digital',
    index: '03',
    name: 'Sparks Digital',
    division: 'Growth Engineering',
    blurb:
      'Where engineering meets reach — analytics, lead systems and the data plumbing behind 2 lakh+ leads generated for partner brands.',
    services: ['Analytics', 'Lead Systems', 'Marketing Automation', 'Data Pipelines', 'Conversion Engineering'],
    accent: '#E9A310',
  },
  {
    id: 'sparked-academy',
    index: '04',
    name: 'SparkEd Academy',
    division: 'Engineering Education',
    blurb:
      'Bridging campus and industry — hands-on programs in AI, full-stack and modern build practices, from schools to colleges.',
    services: ['AI & Vibe Coding', 'Full-Stack', 'UI/UX & Figma', 'Bootcamps', 'Internships', 'Institutional Tie-ups'],
    accent: '#C98A0C',
  },
  {
    id: 'dashub',
    index: '05',
    name: 'DasHub',
    division: 'Hardware & IoT',
    blurb:
      'Where software meets the physical world — IoT systems, sensors, prototyping and the firmware-to-cloud pipeline.',
    services: ['IoT Systems', 'Smart Devices', 'Sensor Solutions', 'Firmware', 'Prototyping', 'Industrial Automation'],
    accent: '#A8741F',
  },
]

// Work showcase — grouped, shown in hover-reveal lists.
export const WORK_GROUPS = [
  {
    id: 'apps',
    label: 'Live Apps',
    note: 'Shipped to the stores, used by real people',
    items: [
      {
        id: 'tazty',
        title: 'Tazty',
        kicker: 'TZ',
        tag: 'Food Ordering · Mobile',
        status: 'Live',
        metric: '10,000+ downloads',
        desc: 'A food-ordering platform live on the Play Store — architected the ordering, payments and real-time order flow. 10k+ downloads.',
        url: 'https://play.google.com/store/apps/details?id=in.tazty.buyer',
        tone: '#F5B82E',
      },
      {
        id: 'nakshatratalks',
        title: 'NakshatraTalks',
        kicker: 'NT',
        tag: 'Astrology · Web + Mobile + AI',
        status: 'Live',
        metric: 'Wallet · chat · A/V · AI',
        desc: 'An astrology consultation platform — wallet, real-time chat, audio/video sessions and AI features. Engineered across web and mobile.',
        url: 'https://app.nakshatratalks.com/',
        tone: '#C9A227',
      },
      {
        id: 'tingatalk',
        title: 'TingaTalk',
        kicker: 'TT',
        tag: 'Social · Real-time',
        status: 'Live',
        metric: '1,000+ downloads',
        desc: 'A social communication platform with real-time messaging at its core, live and growing on the Play Store.',
        url: 'https://play.google.com/store/apps/details?id=com.tinga.tingatalk',
        tone: '#E9A310',
      },
    ],
  },
  {
    id: 'web',
    label: 'Web Platforms',
    note: 'Sites & platforms engineered end-to-end',
    items: [
      {
        id: 'floramine',
        title: 'Floramine',
        kicker: 'FL',
        tag: 'E-Commerce',
        status: 'Live',
        metric: 'Plant-based commerce',
        desc: 'A plant-based e-commerce platform — storefront, cart, checkout and admin, architected and built end-to-end.',
        url: 'https://floramine.in/',
        tone: '#F5B82E',
      },
      {
        id: 'ferventers',
        title: 'Ferventers',
        kicker: 'FV',
        tag: 'Business Platform',
        status: 'Live',
        metric: 'Modern digital presence',
        desc: 'A high-performance business platform engineered for a modern, high-impact digital presence.',
        url: 'https://ferventers.com/',
        tone: '#C9A227',
      },
      {
        id: 'eco-ripple',
        title: 'Eco Ripple Impact',
        kicker: 'ER',
        tag: 'Sustainability',
        status: 'Live',
        metric: 'Impact platform',
        desc: 'A sustainability-focused platform driving measurable environmental impact through clean, data-driven product engineering.',
        url: 'https://eco-ripple-impact.vercel.app/',
        tone: '#E9A310',
      },
      {
        id: 'sparks-learn',
        title: 'Sparks Learn',
        kicker: 'SL',
        tag: 'EdTech · LMS',
        status: 'Live',
        metric: 'Learning portal',
        desc: 'An interactive learning management portal built for educational initiatives — content, progress and delivery engineered in.',
        url: 'https://learn.sparksai.in/',
        tone: '#A8741F',
      },
    ],
  },
  {
    id: 'products',
    label: 'AI Products in Progress',
    note: 'In-house AI SaaS we are engineering for what’s next',
    items: [
      {
        id: 'orme',
        title: 'ORME',
        kicker: 'OR',
        tag: 'AI SaaS · Instagram',
        status: 'Alpha',
        metric: 'RAG · agents · automation',
        desc: 'AI-powered Instagram automation for creators — RAG contextual replies, spam detection, DM automation and end-to-end management. Architecting the agent and pipeline layer.',
        url: 'https://orme.dev/',
        tone: '#F5B82E',
      },
      {
        id: 'dm-crm',
        title: 'Marketing CRM',
        kicker: 'CR',
        tag: 'SaaS · CRM',
        status: 'R&D',
        metric: 'All-in-one CRM',
        desc: 'An all-in-one CRM for marketers and agencies — clients, campaigns, content calendar, approvals and analytics, built on a clean, scalable data model.',
        url: null,
        tone: '#C9A227',
      },
    ],
  },
]

export const WORK = WORK_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, group: g.id })))

// Domains we engineer for — the hover-reveal "Industries we empower" list.
export const DOMAINS = [
  'AI & Agentic Systems',
  'SaaS & Platforms',
  'E-Commerce',
  'Social & Real-time',
  'EdTech',
  'Astrology & Consultation',
  'Sustainability & Impact',
  'Hardware & IoT',
]

export const STATS = [
  { value: '4', label: 'Production apps launched', suffix: '' },
  { value: '11,000', label: 'App downloads & counting', suffix: '+' },
  { value: '2', label: 'Leads generated via our systems', suffix: ' Lakh+' },
  { value: '50', label: 'Projects engineered & delivered', suffix: '+' },
  { value: '5', label: 'Technology divisions led', suffix: '' },
]

export const ACHIEVEMENTS = [
  { event: 'St. Joseph’s College — 24-Hour Hackathon', result: '1st Place' },
  { event: 'MOP College Hackathon', result: '2nd Place' },
  { event: 'SRM University — 30-Hour Hackathon', result: '3rd Place' },
  { event: 'Sri Eshwar College Hackathon', result: 'Top 10 / 250 teams' },
]

export const PARTNERSHIPS = {
  name: 'WeLocalHost',
  desc: 'Strategic engineering partnership delivering websites, mobile apps, custom software and business tools — two active builds in progress.',
}

export const PIPELINE = {
  name: 'Navigator',
  desc: 'A shirt merchandise brand with 9+ physical stores and crores-level turnover — engineering its full digital transformation: mobile app, e-commerce and growth systems.',
}

export const CONTACT = {
  location: 'Coimbatore, India',
  timezone: 'Asia/Kolkata',
  tzLabel: 'IST',
  company: 'Welbuilt',

  personal: {
    email: 'rohith@welbuiltai.in',
    phone: '+91 63811 42016',
  },
  business: {
    email: 'contact@welbuiltai.in',
    phone: '+91 63811 42016',
  },

  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/sparksai' },
    { label: 'Instagram', url: 'https://instagram.com/sparksai.in' },
  ],
}

// Tech-stack chips that float in the hero (the reference's "global leaders" logos).
export const STACK = [
  'React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'React Native',
  'PostgreSQL', 'LangChain', 'OpenAI', 'AWS', 'Docker', 'GSAP',
]

export const NAV = [
  { id: 'hero', label: 'Index', index: '001' },
  { id: 'about', label: 'About', index: '002' },
  { id: 'brands', label: 'Ecosystem', index: '003' },
  { id: 'work', label: 'Work', index: '004' },
  { id: 'recognition', label: 'Recognition', index: '005' },
  { id: 'contact', label: 'Contact', index: '006' },
]
