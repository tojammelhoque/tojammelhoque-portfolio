import { LuArrowUpRight } from 'react-icons/lu'
import type { Project } from '@/lib/data'

/** "Live demo" and "GitHub" links for a project. Pass the text colours through className. */
export default function ProjectLinks({
  project,
  className = '',
}: {
  project: Project
  className?: string
}) {
  const projectLinks = [
    { label: 'Live demo', href: project.links.live },
    { label: 'GitHub', href: project.links.github },
  ]

  return (
    <>
      {projectLinks.map((projectLink) => (
        <a
          key={projectLink.label}
          href={projectLink.href}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${className}`}
        >
          <span className="link-sweep">{projectLink.label}</span>
          {/* The arrow nudges up and to the right on hover to hint that the link opens a new tab. */}
          <LuArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ))}
    </>
  )
}
