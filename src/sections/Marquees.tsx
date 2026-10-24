import Marquee from '@/components/Marquee'
import { backendTech, frontendTech, type Tech } from '@/lib/tech'

/** Pills with a tool's logo and name, repeated so that one set is always wider than the screen. */
function TechPills({ tools }: { tools: Tech[] }) {
  return [...tools, ...tools].map(({ name, icon: Icon }, index) => (
    <div
      key={`${name}-${index}`}
      className="flex items-center gap-3 rounded-full border border-line bg-white/60 px-6 py-3.5 text-ink-2 transition-colors hover:text-ink"
    >
      <Icon aria-hidden="true" className="size-7" />
      <span className="text-lg font-medium tracking-[-0.01em]">{name}</span>
    </div>
  ))
}

/**
 * Two decorative rows of tool logos that slide in opposite directions on their own.
 * They repeat information from the Technology section, so screen readers skip them.
 */
export default function Marquees() {
  return (
    <section
      aria-hidden="true"
      className="flex flex-col gap-4 overflow-hidden border-t border-line py-14 md:py-20"
    >
      <Marquee duration={70}>
        <TechPills tools={frontendTech} />
      </Marquee>
      <Marquee direction="right" duration={80}>
        <TechPills tools={backendTech} />
      </Marquee>
    </section>
  )
}
