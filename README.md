<div align="center">

# Tojammel Hoque — Portfolio

**Full-stack web developer building fast, clean and reliable web apps.**

[Live site](https://tojammelhoque.com) · [LinkedIn](https://www.linkedin.com/in/tojammelhoque) · [Instagram](https://www.instagram.com/qodexdev)

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Resend

</div>

---

## About

A personal portfolio and freelance website. It presents my services, selected work, process and contact details, with scroll-driven animation throughout. Visitors can book a call or send a project enquiry straight from the page.

## Features

- **Scroll-synced animation.** Scrubbed GSAP timelines play forward and backward with the scrollbar:
  - Stacked service cards that shrink and dim as the next one slides over
  - A Strategy → Development → Testing → Launch stepper
  - A portrait that wipes in and drifts inside its frame
  - A pinned, scroll-driven showcase of selected projects with live demo and GitHub links
- **Smooth scrolling** with Lenis.
- **Marquees** for tools and reviews, built in pure CSS with no JavaScript.
- **Cal.com booking calendar** embedded on the page and loaded only when you scroll near it.
- **Contact form** with a server route, email delivery through Resend, spam protection and a thank-you page.
- **SEO basics on every page:** unique title and description, canonical address, share preview image, sitemap and `robots.txt`.
- **Accessible:** respects `prefers-reduced-motion`, so animations are skipped and content shows in its final state.
- **Responsive** from small phones to wide desktops.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | GSAP + ScrollTrigger, Lenis |
| Fonts | Inter, Instrument Serif, JetBrains Mono (self-hosted with Fontsource) |
| Email | Resend |
| Tooling | ESLint, Prettier |

## Getting started

Requires **Node.js 20.9 or newer**.

```bash
git clone https://github.com/tojammelhoque/tojammelhoque-portfolio.git
cd tojammelhoque-portfolio
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run format` | Format the code with Prettier |
| `npm run format:check` | Check formatting without changing it |

## Environment variables

Copy `.env.example` to `.env.local`. Never commit real keys.

| Variable | Required | Description |
| --- | :---: | --- |
| `RESEND_API_KEY` | Yes | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | No | Sender such as `Portfolio enquiries <contact@yourdomain.com>`. Needs a domain verified in Resend. Defaults to `onboarding@resend.dev`, which can only deliver to your own Resend account email. |

Without `RESEND_API_KEY`, the form falls back to opening the visitor's email app, so no enquiry is lost.

## Contact form and spam protection

The form posts to `src/app/api/contact/route.ts`, which sends the enquiry through the Resend API and then redirects the visitor to a thank-you page. The API key stays on the server.

Spam protection lives in `src/lib/contact/`:

- A hidden honeypot field that only bots fill in
- A timing check that rejects forms sent faster than a person could fill them in
- A per-visitor rate limit, kept in memory only and never saved
- A limit on links per message
- A check that the request comes from this site

## Project structure

```
src/
  app/          Pages (home, privacy, thank-you, 404), contact API route, sitemap, robots, styles
  components/   Reusable pieces (Marquee, SmoothScroll, CaseStudyModal, PageShell, ...)
  sections/     One file per home page section, plus the navbar and footer
  lib/          Content (data.ts), site settings (site.ts), scroll helpers, contact form logic
public/         Static files: portrait (images/profile.jpg) and share preview (og-image.jpg)
```

## Editing content

- Text, services, projects, process steps, reviews, FAQs, education and contact details live in `src/lib/data.ts`.
- Tool icons shown in the marquees and technology section live in `src/lib/tech.ts`.
- Site address, default title and description live in `src/lib/site.ts`.
- Colours and fonts are defined in the `@theme` block of `src/app/globals.css`.

### Brand colours

| Colour | Hex |
| --- | --- |
| Electric Blue | `#2563EB` |
| Off-White | `#F8FAFC` |
| Fresh Lime | `#BEF264` |
| Deep Navy | `#0F172A` |

## Contact

Have a project in mind? Let's talk.

- Website: [tojammelhoque.com](https://tojammelhoque.com)
- LinkedIn: [tojammelhoque](https://www.linkedin.com/in/tojammelhoque)
- Instagram: [@qodexdev](https://www.instagram.com/qodexdev)

---

<div align="center">

Built by **Tojammel Hoque** · `<QodexDev/>` — Building Digital Solutions

</div>