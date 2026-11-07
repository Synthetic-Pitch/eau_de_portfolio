import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import SmokeCursor from './components/SmokeCursor'
import Techstack from './components/Techstack'
import SecuritySection from './components/SecuritySection'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const LENIS_OPTIONS = {
  lerp: 0.09,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.15,
  syncTouch: false,
}

function App() {
  useEffect(() => {
    // Keep native scrolling for visitors who ask for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis(LENIS_OPTIONS)

    // Keep ScrollTrigger in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker (GSAP time is seconds, Lenis wants ms)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Re-measure once images/fonts have loaded
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="w-full relative bg-white">
      <SmokeCursor />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Techstack />
      <SecuritySection />
    </main>
  )
}

export default App