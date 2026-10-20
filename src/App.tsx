import portrait from './assets/image/me-nobackground.png';
import signature from './assets/image/signature.png';
import barcode from './assets/image/barcode.png';
import fullstack from './assets/image/fullstack.png';
import mabangisIcon from './assets/icons/mabangis.png';
import linuxLogo from './assets/icons/linux.png';
import windowsLogo from './assets/icons/windows.png';
import web1 from './assets/image/web1.png';
import web2 from './assets/image/web2.png';
import web3 from './assets/image/web3.png';
import web4 from './assets/image/web4.png';
import web5 from './assets/image/web5.png';
import web7 from './assets/image/web7.png';
import web8 from './assets/image/web8.png';
import web9 from './assets/image/web9.png';
import web10 from './assets/image/web10.png';
import web11 from './assets/image/web11.png';
import web12 from './assets/image/web12.png';
import web13 from './assets/image/web13.png';
import web14 from './assets/image/web14.png';
import web15 from './assets/image/web15.png';
import web16 from './assets/image/web16.png';
import SmokeCursor from './components/SmokeCursor';
import { useEffect, useState, type FocusEvent, type PointerEvent } from 'react';

const projects = [
  { src: web1, alt: 'Personal panel interface', title: 'Personal panel', description: 'A personal dashboard for managing account information and activity.', url: 'https://opss-admin.vercel.app', x: 109, y: 25, w: 227, h: 110 },
  { src: web2, alt: 'Mobile service form', title: 'Service request', description: 'A mobile friendly form for submitting service requests.', url: 'https://barangay-digitalize.vercel.app/', x: 352, y: 78, w: 48, h: 106 },
  { src: web3, alt: 'Website landing page', title: 'OPSS Traffic website', description: 'A clean landing page introducing a digital product and its features.', url: 'https://capstone1-opss.vercel.app/', x: 434, y: 48, w: 152, h: 75 },
  { src: web4, alt: 'Analytics dashboard', title: 'Analytics dashboard', description: 'A web dashboard for viewing metrics and business performance.', url: 'https://stockroom-drab.vercel.app/', x: 600, y: 50, w: 360, h: 174 },
  { src: web5, alt: 'Mobile login screen', title: 'Mobile login', description: 'A streamlined sign in experience designed for mobile screens.', x: 962, y: 14, w: 89, h: 171 },
  { src: web12, alt: 'Biggest Sale mobile design', title: 'Biggest Sale', description: 'A mobile shopping experience for browsing a seasonal sale.', url: 'https://next-markies.vercel.app/', x: 240, y: 156, w: 81, h: 161 },
  { src: web7, alt: 'Bookstore website design', title: 'Inventory management', description: 'An inventory management online platform to make life much more easier and precisely accurate', url: 'https://stockroom-drab.vercel.app/', x: 413, y: 137, w: 125, h: 70 },
  { src: web11, alt: 'Barangay website design', title: 'Barangay website', description: 'A community website that helps residents find local services and information.', url: 'https://barangay-digitalize.vercel.app/', x: 355, y: 219, w: 246, h: 115 },
  { src: web8, alt: 'Traffic violation mobile interface', title: 'Traffic violations', description: 'A mobile interface for reviewing traffic violation information.', url: 'https://capstone1-opss.vercel.app/', x: 648, y: 235, w: 62, h: 129 },
  { src: web9, alt: 'Online courses website', title: 'Online courses', description: 'An online learning site for exploring courses and lessons.', url: 'https://bytespace-indol.vercel.app/', x: 727, y: 258, w: 303, h: 163 },
  { src: web10, alt: 'Pending requests form', title: 'Request management', description: 'A management screen for reviewing pending requests.', url: 'https://opss-admin.vercel.app', x: 1048, y: 215, w: 109, h: 197 },
  { src: web13, alt: 'Authority verification page', title: 'Authority verification', description: 'A verification page for confirming an authorized user.', url: 'https://mmda.vercel.app', x: 275, y: 344, w: 152, h: 77 },
  { src: web14, alt: 'Biggest Sale website', title: 'Biggest Sale', description: 'An online store campaign page for a major sale event.', url: 'https://next-markies.vercel.app/', x: 462, y: 358, w: 176, h: 78 },
  { src: web15, alt: 'Point Of Sale', title: 'Point of sale', description: 'A point of sale interface for handling in store transactions.', x: 92, y: 208, w: 176, h: 178 },
  { src: web16, alt: 'FunFries Kios website', title: 'FunFries Kios', description: 'A website for FunFries Kios.', url: 'https://reymarkdequito.live', x: 1070, y: 20, w: 98, h: 190 },
]

function App() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const drawName = () => {
      console.log(
        '%c' +
          '███╗   ███╗  █████╗  ██████╗ ██╗  ██╗\n' +
          '████╗ ████║ ██╔══██╗ ██╔══██╗██║ ██╔╝\n' +
          '██╔████╔██║ ███████║ ██████╔╝█████╔╝\n' +
          '██║╚██╔╝██║ ██╔══██║ ██╔══██╗██╔═██╗\n' +
          '██║ ╚═╝ ██║ ██║  ██║ ██║  ██║██║  ██╗\n' +
          '╚═╝     ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝╚═╝  ╚═╝',
        'color: #fff; font-family: monospace; font-size: 12px; line-height: 1.2;',
      )
    }
    
    drawName()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F12') drawName()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const movePopup = (event: PointerEvent<HTMLImageElement>) => {
    const gap = 20
    const popupWidth = Math.min(350, window.innerWidth - 32)
    const popupHeight = 150
    let x = event.clientX + gap
    let y = event.clientY + gap
    if (x + popupWidth > window.innerWidth - 12) x = event.clientX - popupWidth - gap
    if (y + popupHeight > window.innerHeight - 12) y = event.clientY - popupHeight - gap
    setPopupPosition({ x: Math.max(12, x), y: Math.max(12, y) })
  }
  
  return (
    <main className="w-full bg-white overflow-x-hidden">
      {/* Cursor smoke trail */}
      <SmokeCursor />
      {/* First Section: Hero */}
      <section className="relative w-full flex justify-center ">
        <div className="relative isolate w-full max-w-[2020px] aspect-[2020/804] [container-type:inline-size] mx-auto text-[#353535]" aria-label="Reymark portfolio">
          {/* Beige Backdrop */}
          <div
            className="absolute -z-10 inset-y-0 left-[43.87%] bg-[#e7dbc8] rounded-tl-[11%]"
            style={{ right: 'min(0px, calc((2020px - 100vw) / 2))' }}
            aria-hidden="true"
          />

          {/* 2 Added Geometric Shapes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-5" viewBox="0 0 2020 804" fill="none">
            {/* Shape 1: Left polygon (#696161) */}
            <polygon points="268,60 770,89 476,440 264,440 27,261" fill="#696161" />
            <polygon points="1653,37 2258,208 1858,804 1370,804" fill="#b5ab9a" />
          </svg>
          
          {/* Identity Header */}
          <header className="absolute z-20 top-[16.69%] left-[27.19%] flex flex-col text-left font-inria leading-[1.08]">
            <span className="text-[0.79cqw] text-white/80">DEQUITO</span>
            <strong className="text-[1.24cqw] font-normal tracking-[0.02em] text-black">REYMARK</strong>
          </header>

          {/* Portfolio Title */}
          <h1 className="absolute z-10 top-[23.75%] left-[26.3%] m-0 text-[#111] font-normal text-[7.7cqw] leading-[0.9] font-italiana tracking-[-0.045em] whitespace-nowrap scale-x-140 scale-y-110 origin-top-left select-none">
            PORTFOLIO
          </h1>

          {/* Portrait Image */}
          <img
            className="absolute z-20 right-[25.7%] top-[5.3%] h-[65.2%] w-auto object-contain object-bottom"
            src={portrait}
            alt="Reymark wearing sunglasses and a dark jacket"
            draggable={false}
          />

          {/* Mabangis Icon */}
          <img
            className="absolute z-20 left-[15.4%] top-[35.4%] h-[36.2%] w-auto object-contain select-none"
            src={mabangisIcon}
            alt="Mabangis icon"
            draggable={false}
          />

          {/* Barcode (repositioned to left side) */}
          <img
            className="absolute z-20 left-[14.1%] bottom-[9.7%] w-[6.9%] h-auto select-none"
            src={barcode}
            alt="Barcode"
            draggable={false}
          />

          {/* Intro Bottom Strip */}
          <footer className="absolute z-30 left-[25.44%] right-[22.55%] bottom-[2.74%] h-[27.99%] bg-[#353535] flex items-center justify-between px-[3.11%] py-[1.59%]">
            <div className="w-[25%] h-[81.33%] border border-[rgba(231,219,200,0.75)] rounded-[4px] flex flex-col justify-center items-center text-white text-center font-iosevka text-[0.73cqw] leading-[1.4]">
              <p className="m-0 mb-[7px]">
                End-to-end web<br />development built for<br />scale and performance
              </p>
              <img className="w-[82%] h-[43.33%] object-contain" src={signature} alt="Reymark's signature" />
            </div>
            <img className="w-[52.5%] h-[71.11%] object-contain" src={fullstack} alt="Fullstack" draggable={false} />
          </footer>
        </div>
      </section>
      <section
        className="flex h-60 w-full items-center justify-center bg-[linear-gradient(110deg,#334662_0%,#1F304A_100%)] px-[8%]"
        aria-label="Experience progression"
      >
        <div className="flex w-full max-w-[1080px] items-center justify-center gap-[14%] text-white">
          <img className="w-[clamp(42px,6vw,64px)] object-contain" src={linuxLogo} alt="Linux" />
          <div className='flex flex-col items-center'>
            <p className="m-0 font-jura font-semibold text-[1.2em] tracking-[0.04em] text-[#C0BAA6]">
              3 years progression
            </p>
            <p className='font-jura text-[#969593]'>engineering</p>
          </div>
          <img className="w-[clamp(46px,7vw,64px)] object-contain" src={windowsLogo} alt="Windows" />
        </div>
      </section>
      <section className="relative w-full h-dvh max-h-210 aspect-[1260/443] bg-[#d2cec9] flex justify-center " aria-label="Selected projects">
        <div className="relative h-full w-650 shrink-0 overflow-hidden">
          {projects.map((project) => (
            <img
              key={project.alt}
              src={project.src}
              alt={project.alt}
              className="absolute block cursor-pointer object-contain"
              style={{
                left: `${(project.x / 1260) * 100}%`,
                top: `${(project.y / 443) * 100}%`,
                width: `${(project.w / 1260) * 100}%`,
                height: `${(project.h / 443) * 100}%`,
              }}
              draggable={false}
              onPointerEnter={(event) => {
                setActiveProject(project)
                movePopup(event)
              }}
              onPointerMove={movePopup}
              onPointerLeave={() => setActiveProject(null)}
              onFocus={(event: FocusEvent<HTMLImageElement>) => {
                setActiveProject(project)
                const rect = event.currentTarget.getBoundingClientRect()
                setPopupPosition({ x: Math.max(12, rect.left), y: Math.max(12, rect.top) })
              }}
              onBlur={() => setActiveProject(null)}
              onClick={() => {
                if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer')
              }}
              onKeyDown={(event) => {
                if (project.url && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault()
                  window.open(project.url, '_blank', 'noopener,noreferrer')
                }
              }}
              tabIndex={0}
            />
          ))}
        </div>
        {activeProject && (
          <aside
            className="pointer-events-none fixed z-50 w-[min(350px,calc(100vw-24px))] rounded-[22px] bg-[#dddbdb] px-7 py-6 shadow-xl"
            style={{ left: popupPosition.x, top: popupPosition.y }}
            aria-live="polite"
          >
            <h2 className="m-0 mb-3 font-jura text-xl tracking-[0.04em] font-bold">{activeProject.title}</h2>
            <p className="m-0 font-jura text-xs leading-[1.3] tracking-[0.025em]">{activeProject.description}</p>
          </aside>
        )}
      </section>
      <section
        className="flex min-h-dvh w-full items-center bg-[#333333] px-[8%] py-24 text-[#e7dbc8]"
        aria-label="About and contact"
      >
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-16">
          <header className="flex flex-col gap-6">
            <p className="m-0 font-inria text-[0.75rem] tracking-[0.28em] text-white/55">
              DEQUITO / REYMARK
            </p>
            <h2 className="m-0 font-italiana text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.04em] text-white">
              LET&apos;S BUILD
            </h2>
            <p className="m-0 max-w-[38rem] font-jura text-[1.05rem] leading-[1.7] text-[#c0baa6]">
              End-to-end web development for products that need to look sharp, stay fast,
              and scale without getting messy. Dashboards, public sites, and mobile-ready
              flows — from first screen to production.
            </p>
          </header>

          <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-3">
            {[
              { label: '01', title: 'Product interfaces', copy: 'Clean dashboards, forms, and storefronts that stay easy to use on any screen.' },
              { label: '02', title: 'Fullstack delivery', copy: 'Front to back implementation with a focus on performance, accuracy, and maintainability.' },
              { label: '03', title: 'Local systems', copy: 'Community, inventory, and operations tools built for real day-to-day work.' },
            ].map((item) => (
              <li key={item.label} className="border-t border-[#e7dbc8]/25 pt-5">
                <span className="font-iosevka text-[0.7rem] tracking-[0.18em] text-white/40">{item.label}</span>
                <h3 className="mt-3 mb-2 font-jura text-[1.05rem] font-semibold tracking-[0.04em] text-white">
                  {item.title}
                </h3>
                <p className="m-0 font-jura text-[0.85rem] leading-[1.55] text-[#969593]">{item.copy}</p>
              </li>
            ))}
          </ul>

          <footer className="flex flex-col items-start justify-between gap-6 border-t border-[#e7dbc8]/20 pt-8 sm:flex-row sm:items-end">
            <div>
              <p className="m-0 font-jura text-[0.8rem] tracking-[0.16em] text-[#c0baa6]">AVAILABLE FOR WORK</p>
              <p className="mt-2 mb-0 max-w-[28rem] font-inria text-sm leading-[1.6] text-white/70">
                Open to freelance, collaboration, and product builds.
              </p>
            </div>
            <p className="m-0 font-iosevka text-[0.7rem] tracking-[0.2em] text-white/35">
              PORTFOLIO / 2026
            </p>
          </footer>
        </div>
      </section>
    </main>
  )
}

export default App
