import { useEffect } from 'react'
import Lenis from 'lenis'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import SmokeCursor from './components/SmokeCursor'
import Techstack from './components/Techstack'

// Adjust these values to change the scroll feel.
// A lower `lerp` is smoother/slower; a higher value responds more quickly.
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
    let animationFrameId = 0

    const animate = (time: number) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return <main className="w-full absolute bg-white">
      <SmokeCursor />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Techstack/>
      <div className='h-dvh w-full relative z-40 bg-[red]'/>
    </main>
}

export default App
