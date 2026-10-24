import type { IconType } from 'react-icons'
import { LuGlobe, LuLayers, LuRocket, LuShieldCheck, LuShoppingCart, LuZap } from 'react-icons/lu'

/** Which app sketch is drawn inside the browser frame for a project. */
export type MockupTheme = 'auth' | 'store' | 'chat'

/** A portfolio project shown in the Selected Work section and its case-study popup. */
export interface Project {
  id: string
  name: string
  category: string
  label: string
  description: string
  technologies: string[]
  theme: MockupTheme
  links: { live: string; github: string }
  caseStudy: {
    challenge: string
    approach: string
    solution: string
    technology: string[]
    outcome: string
  }
}

/** The projects shown in Selected Work, in the order they appear. */
export const projects: Project[] = [
  {
    id: 'mern-auth',
    name: 'MERN Authentication System',
    category: 'Full-Stack Web App',
    label: 'Live Project',
    description:
      'A production-style login system with rotating refresh tokens, token reuse detection and rate limiting — the secure front door for a web app.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    theme: 'auth',
    links: {
      live: 'https://mern-auth-frontend-yi1u.onrender.com',
      github: 'https://github.com/tojammelhoque/mern-stack-authentication',
    },
    caseStudy: {
      challenge:
        'Login is the front door of every web app, and weak session handling is one of the most common ways customer accounts get compromised.',
      approach:
        'Short-lived access tokens, rotating refresh tokens in HTTP-only cookies, server-side detection of reused tokens, and rate limiting on the sensitive routes.',
      solution:
        'A MERN system with JWT authentication and token family revocation. The Redux Toolkit client keeps the access token in memory, and an Axios interceptor queues requests while a refresh is in flight. It is containerised with Docker and ships through a GitHub Actions CI/CD pipeline.',
      technology: [
        'React',
        'Redux Toolkit',
        'Node.js',
        'Express',
        'MongoDB',
        'JWT',
        'Docker',
        'GitHub Actions',
      ],
      outcome:
        'A reusable login layer you can inspect end to end. The live demo and the full source code are linked above.',
    },
  },
  {
    id: 'mern-store',
    name: 'MERN E-Commerce Store',
    category: 'E-Commerce App',
    label: 'Live Project',
    description:
      'A full-stack online store with Stripe payments, Redis, Cloudinary image hosting and analytics charts for the store owner.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    theme: 'store',
    links: {
      live: 'https://mern-ecommerce-store-amt1.onrender.com',
      github: 'https://github.com/tojammelhoque/MERN-ecommerce-website',
    },
    caseStudy: {
      challenge:
        'An online store has to take payments securely, load quickly and give its owner a clear view of how the business is doing.',
      approach:
        'Stripe handles card payments, Cloudinary stores and serves product images, Redis supports performance, and Recharts turns store data into readable charts.',
      solution:
        'A complete MERN storefront covering the shopping experience for customers and the tools the owner needs to run the shop.',
      technology: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redis', 'Cloudinary'],
      outcome:
        'A shop you can try from browsing to checkout. The live demo and the full source code are linked above.',
    },
  },
  {
    id: 'chat-app',
    name: 'Real-Time Chat App',
    category: 'Real-Time Web App',
    label: 'Live Project',
    description:
      'A messaging app where messages arrive instantly, built on WebSockets with Socket.io.',
    technologies: ['React', 'Node.js', 'Express', 'Socket.io'],
    theme: 'chat',
    links: {
      live: 'https://chatapp-w8ha.onrender.com',
      github: 'https://github.com/tojammelhoque/chatapp',
    },
    caseStudy: {
      challenge:
        'Chat, notifications and live dashboards need a different approach from ordinary request-and-response pages: the server has to push updates the moment they happen.',
      approach:
        'Persistent WebSocket connections through Socket.io, so every connected client receives new messages instantly without refreshing.',
      solution: 'A full-stack messaging app that delivers messages between users in real time.',
      technology: ['React', 'Node.js', 'Express', 'Socket.io'],
      outcome:
        'A working real-time app you can try right now. The live demo and the full source code are linked above.',
    },
  },
]

/** A service offered to clients, shown as a card in the Services section. */
export interface Service {
  title: string
  description: string
  tags: string[]
  icon: IconType
}

/** The services offered to clients, in the order the cards stack. */
export const services: Service[] = [
  {
    title: 'Business & Personal-Brand Websites',
    description:
      'Fast, responsive websites that build trust and bring in enquiries for your business or personal brand.',
    tags: ['Brand & trust', 'Lead generation', 'Fast & responsive'],
    icon: LuGlobe,
  },
  {
    title: 'Landing Pages',
    description: 'Focused pages built to load quickly and turn visitors into leads.',
    tags: ['Clear structure', 'Conversion focus', 'Fast loading'],
    icon: LuRocket,
  },
  {
    title: 'Full-Stack Web Apps',
    description:
      'SaaS apps, dashboards and admin panels with a solid frontend, backend and database.',
    tags: ['SaaS apps', 'Dashboards', 'Admin panels'],
    icon: LuLayers,
  },
  {
    title: 'Authentication & Booking Systems',
    description: 'Secure logins and booking flows that your customers can rely on.',
    tags: ['JWT auth', 'Secure sessions', 'Booking flows'],
    icon: LuShieldCheck,
  },
  {
    title: 'E-Commerce Apps',
    description: 'Online stores with secure card payments and easy product management.',
    tags: ['Stripe payments', 'Product catalogue', 'Admin tools'],
    icon: LuShoppingCart,
  },
  {
    title: 'Integrations, Performance & Deployment',
    description:
      'API integrations, speed improvements, deployment and ongoing maintenance for the apps you already run.',
    tags: ['REST APIs', 'Docker & CI/CD', 'Maintenance'],
    icon: LuZap,
  },
]

/** The working principles shown in the "Why work with me" section. */
export const principles = [
  {
    title: 'Business First',
    description:
      'Every technical decision supports a business goal. A website that doesn’t convert is a cost, not an asset.',
  },
  {
    title: 'Clean, Maintainable Code',
    description:
      'Simple, readable code without unnecessary complexity, so your site stays easy to change long after launch.',
  },
  {
    title: 'Built To Perform',
    description:
      'Fast, responsive and technically solid — because speed and reliability are part of how your business is judged.',
  },
  {
    title: 'Clear Communication',
    description:
      'Simple, direct communication from the first conversation to launch. You always know where things stand.',
  },
]

/** The steps of the working process, from the first conversation to launch. */
export const processSteps = [
  {
    title: 'Discovery',
    description: 'Understand your business, your audience and your goals.',
  },
  {
    title: 'Strategy',
    description: 'Plan the website structure, content and user journey.',
  },
  {
    title: 'Development',
    description: 'Build the responsive website and its functionality.',
  },
  {
    title: 'Testing',
    description: 'Check every page, device and flow before anything goes live.',
  },
  {
    title: 'Launch',
    description: 'Deploy, monitor and hand over — with support after launch.',
  },
]

/** A client review shown as a card in the reviews marquee. */
export interface Review {
  quote: string
  name: string
}

/**
 * Sample reviews so the marquee has something to show. Replace them with real feedback from
 * your clients and remove `sample: true`. An empty list hides the whole section.
 */
export const reviews: Review[] = [
  {
    quote:
      'Our new website looks incredible and loads fast. You delivered on time and were a pleasure to work with throughout the project.',
    name: 'Ellison Mullins',
  },
  {
    quote:
      'Outstanding quality and a pleasure to collaborate with. Deadlines were never an issue.',
    name: 'Sarah Chen',
  },
  {
    quote:
      'You rebuilt our site from scratch and it performs better than we expected. Professional, reliable, and always on schedule.',
    name: 'Marcus Rivera',
  },
  {
    quote:
      'Fantastic results and a genuinely nice person to work with. Will definitely hire again.',
    name: 'David Patel',
  },
  {
    quote:
      'A true professional. High-quality work delivered exactly when promised.',
    name: 'Robert Kim',
  },
  {
    quote:
      'Our landing pages convert better and look great on mobile. You went above and beyond and hit every deadline.',
    name: 'Emily Thompson',
  },
  {
    quote:
      'Fast, accessible, and well-structured code. Our site launched on time and has been solid ever since. Thank you!',
    name: 'James Okonkwo',
  },
  {
    quote:
      'Beautiful UI, clean frontend, and clear communication. The site looks premium and was delivered exactly when promised.',
    name: 'Lisa Nguyen',
  },
  {
    quote:
      'From design to deployment, the website exceeded our expectations. A great developer and a genuinely good person to work with.',
    name: 'Priya Sharma',
  },
  {
    quote:
      'You shipped our MVP web app ahead of schedule. Clean architecture, responsive layout, and excellent follow-through.',
    name: 'Michael Torres',
  },
  {
    quote:
      'The product site you built is fast, polished, and easy to update. Reliable partner with a positive attitude throughout.',
    name: 'Olivia Bennett',
  },
  {
    quote:
      'Our marketing site finally matches the brand. Great attention to detail, SEO basics done right, and on-time launch.',
    name: 'Aisha Rahman',
  },
  {
    quote:
      'Professional frontend work, pixel-perfect on desktop and mobile. Friendly, reliable, and the site speaks for itself.',
    name: 'Sofia Alvarez',
  },
  {
    quote:
      'Honest, talented, and always delivered web work on time. The new site has been a huge upgrade for our business.',
    name: 'Rachel Green',
  },
  {
    quote:
      'Fantastic partner for our website and web app. Strong work ethic, excellent results, and easy collaboration.',
    name: 'Chris Johnson',
  },
];

/** A question and answer in the FAQ section. `link` adds an optional "next step" link below the answer. */
export interface FaqItem {
  question: string
  answer: string
  link?: { label: string; href: string }
}

/**
 * Frequently asked questions, in the order they appear. The answers are kept general on purpose:
 * edit them to match exactly how you work. The same text is also published for search engines.
 */
export const faqs: FaqItem[] = [
  {
    question: 'How does a project work, from start to finish?',
    answer:
      'We start with a short call about your business and your goals. Then I plan the structure, build the website, test it on real devices and launch it. You are kept up to date at every stage.',
    link: { label: 'See the process', href: '/#process' },
  },
  {
    question: 'How much does a website cost?',
    answer:
      'It depends on what you need. A simple landing page costs less than a web app with logins and payments. After our first conversation I send a clear written estimate, so you know the cost before any work starts.',
    link: { label: 'Book a free call', href: '/#book' },
  },
  {
    question: 'How long does it take?',
    answer:
      'It depends on the size of the project. After our first conversation I give you a realistic timeline, and I tell you early if anything changes.',
  },
  {
    question: 'What do I need to provide to get started?',
    answer:
      'A short description of your business and what the website should achieve is enough to begin. If you already have a logo, text or photos, send them over. If not, we can work out together what is needed.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. I handle deployment and ongoing maintenance, and I can fix issues or add features after the website goes live.',
  },
  {
    question: 'Can you improve a website or app I already have?',
    answer:
      'Yes. I can make an existing site faster, connect it to other tools through APIs, fix problems and move it to a more reliable setup.',
  },
  {
    question: 'Which technologies do you use?',
    answer:
      'Mostly JavaScript and TypeScript with React and Next.js on the front end, and Node.js, Express, MongoDB or PostgreSQL on the back end. I use Docker and GitHub Actions for reliable deployments.',
    link: { label: 'See the full list', href: '/#technology' },
  },
  {
    question: 'How do I book a call?',
    answer:
      'Pick a time in the calendar on this page. The call is free, and you get a confirmation by email.',
    link: { label: 'Open the calendar', href: '/#book' },
  },
]

/** A qualification shown in the Education section. */
export interface EducationEntry {
  qualification: string
  institution: string
  /** Year of completion. Leave it out when it is not needed. */
  year?: string
}

/** Education and courses, most important first. */
export const education: EducationEntry[] = [
  {
    qualification: 'B.Sc. in Mathematics',
    institution: 'University of Kalyani',
    year: '2026',
  },
  {
    qualification: 'Complete Web Development Course',
    institution: 'Hitesh Choudhary, Udemy',
  },
]

/** Contact details shown in the Contact section and the footer. */
export const contact = {
  email: 'contact@tojammelhoque.com',
  linkedin: {
    label: 'linkedin.com/in/tojammelhoque',
    href: 'https://www.linkedin.com/in/tojammelhoque',
  },
  github: { label: 'github.com/tojammelhoque', href: 'https://github.com/tojammelhoque' },
}

/** Cal.com booking page. `calLink` is the same address without the domain. */
export const booking = {
  url: 'https://cal.com/tojammelhoque/15min',
  calLink: 'tojammelhoque/15min',
}
