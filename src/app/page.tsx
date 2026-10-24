import SmoothScroll from '@/components/SmoothScroll'
import About from '@/sections/About'
import Booking from '@/sections/Booking'
import Contact from '@/sections/Contact'
import Education from '@/sections/Education'
import Faq from '@/sections/Faq'
import FinalCTA from '@/sections/FinalCTA'
import Hero from '@/sections/Hero'
import Marquees from '@/sections/Marquees'
import Positioning from '@/sections/Positioning'
import Principles from '@/sections/Principles'
import Process from '@/sections/Process'
import Reviews from '@/sections/Reviews'
import SelectedWork from '@/sections/SelectedWork'
import Services from '@/sections/Services'
import TechStack from '@/sections/TechStack'
import { HOME_DESCRIPTION, HOME_TITLE, buildPageMetadata } from '@/lib/site'

export const metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
  isHomePage: true,
})

/** Home page: every section in the order a visitor scrolls through them. */
export default function Page() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <Positioning />
        <Services />
        <Marquees />
        <SelectedWork />
        <Principles />
        <Process />
        <TechStack />
        <About />
        <Reviews />
        <Faq />
        <FinalCTA />
        <Booking />
        <Contact />
        <Education />
      </main>
    </SmoothScroll>
  )
}
