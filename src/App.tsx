import { useEffect } from 'react'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import SmokeCursor from './components/SmokeCursor'

function App() {
  useEffect(() => {
    const drawName = () => console.log('%cREYMARK', 'color: #fff; font-family: monospace; font-size: 12px;')
    drawName()
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'F12') drawName() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return <main className="w-full overflow-x-clip bg-white">
      <SmokeCursor />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
}

export default App
