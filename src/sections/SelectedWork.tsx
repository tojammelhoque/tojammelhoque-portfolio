'use client'

import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { projects, type Project } from '@/lib/data'
import BrowserMockup from '@/components/BrowserMockup'
import CaseStudyModal from '@/components/CaseStudyModal'
import ProjectLinks from '@/components/ProjectLinks'

/** Clip-path that hides a project preview completely (a flat line at the bottom edge). */
const PREVIEW_CLIP_HIDDEN = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'

/** Clip-path that shows a project preview in full. Animating between the two wipes it in. */
const PREVIEW_CLIP_SHOWN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

/** Row of small pills naming the technologies used in a project. */
function TechnologyTags({
  technologies,
  className = '',
}: {
  technologies: string[]
  className?: string
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[11px] text-slate-300"
        >
          {technology}
        </li>
      ))}
    </ul>
  )
}

/** "View case study" button, followed by the project's live demo and GitHub links. */
function ProjectActions({
  project,
  onOpenCaseStudy,
  className = '',
}: {
  project: Project
  onOpenCaseStudy: (project: Project) => void
  className?: string
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-7 gap-y-3 ${className}`}>
      <button
        type="button"
        onClick={() => onOpenCaseStudy(project)}
        className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-paper"
      >
        <span className="link-sweep">View case study</span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
      <ProjectLinks project={project} className="text-slate-300 hover:text-paper" />
    </div>
  )
}

/**
 * Selected Work section on a dark background.
 * Desktop: the section is pinned while scrolling, and the projects take turns on screen.
 * Phones, tablets and reduced motion: a simple list of project cards instead.
 */
export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openedProject, setOpenedProject] = useState<Project | null>(null)
  const closeCaseStudy = useCallback(() => setOpenedProject(null), [])

  useGSAP(
    () => {
      // matchMedia lets desktop and mobile get different animations from the same markup.
      const responsiveAnimations = gsap.matchMedia()
      const reducedMotionEnabled = prefersReducedMotion()

      // ---- Desktop: pinned showcase, driven by the scrollbar ----
      responsiveAnimations.add('(min-width: 1024px)', () => {
        const projectTextBlocks = gsap.utils.toArray<HTMLElement>('[data-work-text]')
        const projectPreviews = gsap.utils.toArray<HTMLElement>('[data-work-shot]')
        const progressDots = gsap.utils.toArray<HTMLElement>('[data-work-num]')
        const projectCount = projects.length

        // Starting state: the first project is visible, all others are hidden.
        projectTextBlocks.forEach((textBlock, index) =>
          gsap.set(textBlock, {
            opacity: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 40,
            pointerEvents: index === 0 ? 'auto' : 'none', // hidden blocks must not catch clicks
          }),
        )
        projectPreviews.forEach((preview, index) =>
          gsap.set(preview, { clipPath: index === 0 ? PREVIEW_CLIP_SHOWN : PREVIEW_CLIP_HIDDEN }),
        )
        progressDots.forEach((dot, index) => gsap.set(dot, { opacity: index === 0 ? 1 : 0.18 }))
        gsap.set('[data-work-progress]', { scaleX: 1 / projectCount })

        if (reducedMotionEnabled) return

        // One timeline for the whole showcase. The section stays pinned for the scroll distance of
        // (projectCount - 1) screens, and the scrollbar position decides how far the timeline plays.
        const showcaseTimeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '[data-work-pin]',
            start: 'top top',
            end: `+=${(projectCount - 1) * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Each loop adds the transition from project (index - 1) to project (index).
        for (let index = 1; index < projectCount; index++) {
          // Time (in timeline units) where this transition starts, with a pause before it.
          const transitionStart = (index - 1) * 1.2 + 0.55

          showcaseTimeline
            // The outgoing text fades up and stops catching clicks...
            .to(
              projectTextBlocks[index - 1],
              { opacity: 0, y: -40, duration: 0.4 },
              transitionStart,
            )
            .set(projectTextBlocks[index - 1], { pointerEvents: 'none' }, transitionStart)
            // ...the incoming text rises into place and becomes clickable...
            .set(projectTextBlocks[index], { pointerEvents: 'auto' }, transitionStart + 0.15)
            .fromTo(
              projectTextBlocks[index],
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.45 },
              transitionStart + 0.15,
            )
            // ...the new preview is wiped in from the bottom...
            .to(
              projectPreviews[index],
              { clipPath: PREVIEW_CLIP_SHOWN, duration: 0.7, ease: 'power3.inOut' },
              transitionStart,
            )
            // ...and the progress indicator moves on to the next dot.
            .to(progressDots[index - 1], { opacity: 0.18, duration: 0.2 }, transitionStart)
            .to(progressDots[index], { opacity: 1, duration: 0.2 }, transitionStart + 0.15)
            .to(
              '[data-work-progress]',
              { scaleX: (index + 1) / projectCount, duration: 0.6, ease: 'none' },
              transitionStart,
            )
        }
      })

      // ---- Phones and tablets: each project card fades in when it scrolls into view ----
      responsiveAnimations.add('(max-width: 1023px)', () => {
        if (reducedMotionEnabled) return

        gsap.utils.toArray<HTMLElement>('[data-work-card]').forEach((cardElement) => {
          gsap.fromTo(
            cardElement,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: cardElement, start: 'top 85%' },
            },
          )
        })
      })

      // Remove the animations when the component unmounts.
      return () => responsiveAnimations.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="work" aria-label="Selected work" className="bg-ink text-paper">
      {/* ---------- Desktop: pinned showcase ---------- */}
      <div data-work-pin className="hidden lg:block motion-reduce:lg:hidden">
        <div className="flex h-screen flex-col justify-center">
          <div className="container-site">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="eyebrow eyebrow-on-dark mb-4">Selected Work</p>
                <h2 className="text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-none tracking-[-0.02em]">
                  Work that <em className="serif-accent text-highlight">speaks</em> for itself
                </h2>
              </div>

              {/* Progress: one dot per project plus a thin bar that fills up while scrolling */}
              <div className="flex items-center gap-5">
                <div aria-hidden="true" className="flex gap-2.5">
                  {projects.map((project) => (
                    <span
                      key={project.id}
                      data-work-num
                      className="h-1.5 w-1.5 rounded-full bg-paper"
                    />
                  ))}
                </div>
                <div className="h-px w-28 overflow-hidden bg-paper/15">
                  <div data-work-progress className="h-full w-full origin-left bg-highlight" />
                </div>
              </div>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-12">
              {/* Text of every project, stacked on top of each other. Only one is visible. */}
              <div className="relative h-[360px] lg:col-span-5">
                {projects.map((project) => (
                  <div key={project.id} data-work-text className="absolute inset-0 flex flex-col">
                    <p className="eyebrow eyebrow-on-dark">
                      {project.category} · {project.label}
                    </p>
                    <h3 className="mt-4 text-[clamp(1.9rem,3vw,2.8rem)] font-medium tracking-[-0.02em]">
                      {project.name}
                    </h3>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-dark-muted">
                      {project.description}
                    </p>
                    <TechnologyTags technologies={project.technologies} className="mt-6" />
                    <ProjectActions
                      project={project}
                      onOpenCaseStudy={setOpenedProject}
                      className="mt-8"
                    />
                  </div>
                ))}
              </div>

              {/* App sketch of every project, stacked too. The next one is wiped in over the last. */}
              <div className="relative lg:col-span-7">
                <div className="relative aspect-16/10 w-full">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      data-work-shot
                      className="absolute inset-0 will-change-[clip-path]"
                    >
                      <BrowserMockup theme={project.theme} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Phones, tablets and reduced motion: simple project cards ---------- */}
      <div className="container-site py-24 lg:hidden motion-reduce:lg:block">
        <p className="eyebrow eyebrow-on-dark mb-4">Selected Work</p>
        <h2 className="text-[clamp(2rem,7vw,2.8rem)] font-medium leading-tight tracking-[-0.02em]">
          Work that <em className="serif-accent text-highlight">speaks</em> for itself
        </h2>

        <div className="mt-14 flex flex-col gap-16">
          {projects.map((project) => (
            <article key={project.id} data-work-card>
              <BrowserMockup theme={project.theme} />
              <p className="eyebrow eyebrow-on-dark mt-6">
                {project.category} · {project.label}
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.01em]">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dark-muted">{project.description}</p>
              <TechnologyTags technologies={project.technologies} className="mt-4" />
              <ProjectActions
                project={project}
                onOpenCaseStudy={setOpenedProject}
                className="mt-5"
              />
            </article>
          ))}
        </div>
      </div>

      <CaseStudyModal project={openedProject} onClose={closeCaseStudy} />
    </section>
  )
}
