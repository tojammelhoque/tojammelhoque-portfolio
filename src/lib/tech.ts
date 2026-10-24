import type { IconType } from 'react-icons'
import {
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGreensock,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

/** One tool shown with its logo in the marquees and the technology section. */
export interface Tech {
  name: string
  icon: IconType
}

/** Languages, frameworks and libraries used in the browser. Shown in the first marquee row. */
export const frontendTech: Tech[] = [
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Vite', icon: SiVite },
  { name: 'Redux Toolkit', icon: SiRedux },
  { name: 'GSAP', icon: SiGreensock },
  { name: 'Framer Motion', icon: SiFramer },
]

/** Server, database, payment and delivery tools. Shown in the second marquee row. */
export const backendTech: Tech[] = [
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Mongoose', icon: SiMongoose },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Redis', icon: SiRedis },
  { name: 'JWT', icon: SiJsonwebtokens },
  { name: 'Stripe', icon: SiStripe },
  { name: 'Cloudinary', icon: SiCloudinary },
  { name: 'Docker', icon: SiDocker },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'GitHub Actions', icon: SiGithubactions },
]

/** Every tool in one list, used by the technology section. */
export const techStack: Tech[] = [...frontendTech, ...backendTech]
