import { LuQuote } from 'react-icons/lu'
import Marquee from '@/components/Marquee'
import { reviews, type Review } from '@/lib/data'

/** Turns "Jane Smith" into "JS", for the round avatar next to a review. */
function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .map((namePart) => namePart[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/** One review card. `isRepeat` marks the extra copies that only exist to fill the marquee. */
function ReviewCard({ review, isRepeat }: { review: Review; isRepeat: boolean }) {
  return (
    <figure
      aria-hidden={isRepeat || undefined}
      className="flex w-80 shrink-0 flex-col justify-between rounded-2xl border border-line bg-white p-7 md:w-104"
    >
      <div>
        <div className="flex items-center justify-between">
          <LuQuote aria-hidden="true" className="size-7 text-accent" />
        </div>
        <blockquote className="mt-6 text-base leading-relaxed text-ink">{review.quote}</blockquote>
      </div>

      <figcaption className="mt-10 flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper-2 font-mono text-xs font-medium text-ink-2"
        >
          {getInitials(review.name)}
        </span>
        <span>
          <span className="block text-sm font-medium text-ink">{review.name}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Reviews section: a heading above a row of review cards that slides on its own. */
export default function Reviews() {
  // With no reviews, the whole section is left out.
  if (reviews.length === 0) return null

  // The reviews are repeated so that one set is always wider than the screen.
  // Only the first set is read aloud by screen readers.
  const repeatedReviews = [...reviews, ...reviews]

  return (
    <section
      id="reviews"
      aria-label="Client reviews"
      className="overflow-hidden border-t border-line py-24 md:py-36"
    >
      <div className="container-site mb-14">
        <p className="eyebrow mb-4">Reviews</p>
        <h2 className="text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]">
          What clients <em className="serif-accent text-accent">say</em>
        </h2>
      </div>

      <Marquee duration={120}>
        {repeatedReviews.map((review, reviewIndex) => (
          <ReviewCard key={reviewIndex} review={review} isRepeat={reviewIndex >= reviews.length} />
        ))}
      </Marquee>
    </section>
  )
}
