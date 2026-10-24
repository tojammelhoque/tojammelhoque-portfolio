'use client'

import { useEffect, type ReactNode } from 'react'
import type { Project } from '@/lib/data'
import { lockPageScroll, unlockPageScroll } from '@/lib/scroll'
import ProjectLinks from '@/components/ProjectLinks'

/** One labelled block of the case study, such as "Challenge" followed by its text. */
interface CaseStudySection {
  heading: string
  content: ReactNode
}

/**
 * Popup with the case study of one project. It is shown while `project` is set and
 * closes with the close button, a click on the dark backdrop, or the Escape key.
 */
export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return

    // Freeze the page behind the popup while it is open.
    lockPageScroll()

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscapeKey)

    return () => {
      unlockPageScroll()
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [project, onClose])

  if (!project) return null

  const caseStudySections: CaseStudySection[] = [
    { heading: 'Challenge', content: project.caseStudy.challenge },
    { heading: 'Approach', content: project.caseStudy.approach },
    { heading: 'Solution', content: project.caseStudy.solution },
    {
      heading: 'Technology',
      content: (
        <ul className="flex flex-wrap gap-2">
          {project.caseStudy.technology.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-ink-2"
            >
              {technology}
            </li>
          ))}
        </ul>
      ),
    },
    { heading: 'Outcome', content: project.caseStudy.outcome },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
      className="fixed inset-0 z-80 flex items-end justify-center md:items-center md:p-8"
    >
      {/* The dark backdrop doubles as a button that closes the popup. */}
      <button
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-xs"
      />

      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-paper text-ink shadow-2xl md:rounded-2xl">
        <div className="flex items-start justify-between gap-6 border-b border-line p-6 md:p-8">
          <div>
            <p className="eyebrow mb-2">
              {project.category} · {project.label}
            </p>
            <h3 className="text-2xl font-medium tracking-[-0.01em] md:text-3xl">{project.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:bg-ink hover:text-paper"
          >
            ✕
          </button>
        </div>

        {/* data-lenis-prevent lets this area scroll on its own while the page behind is frozen. */}
        <div data-lenis-prevent className="overflow-y-auto p-6 md:p-8">
          <dl className="flex flex-col gap-8">
            {caseStudySections.map((caseStudySection) => (
              <div
                key={caseStudySection.heading}
                className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-6"
              >
                <dt className="eyebrow">{caseStudySection.heading}</dt>
                <dd className="text-sm leading-relaxed text-ink-2">{caseStudySection.content}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6">
            <ProjectLinks project={project} className="text-ink-2 hover:text-ink" />
          </div>
        </div>
      </div>
    </div>
  )
}
