import { education } from '@/lib/data'

/** Education section, at the very bottom of the home page: degrees and courses. */
export default function Education() {
  return (
    <section id="education" aria-label="Education" className="border-t border-line py-20 md:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Education</p>
          <h2 className="text-balance text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            Where I <em className="serif-accent text-accent">learned</em>
          </h2>
        </div>

        <ul className="border-b border-line lg:col-span-8">
          {education.map((educationEntry) => (
            <li
              key={educationEntry.qualification}
              className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div>
                <h3 className="text-xl font-medium tracking-[-0.01em]">
                  {educationEntry.qualification}
                </h3>
                <p className="mt-1 text-sm text-ink-2">{educationEntry.institution}</p>
              </div>
              {educationEntry.year && (
                <p className="font-mono text-sm text-ink-3">{educationEntry.year}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
