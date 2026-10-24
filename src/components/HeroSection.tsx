import portrait from '../assets/image/me-nobackground.png'
import signature from '../assets/image/signature.png'
import barcode from '../assets/image/barcode.png'
import fullstack from '../assets/image/fullstack.png'
import mabangisIcon from '../assets/icons/mabangis.png'

export default function HeroSection() {
  return <section className="relative flex w-full justify-center">
    <div className="relative isolate mx-auto w-full max-w-[2020px] aspect-[2020/804] [container-type:inline-size] text-[#353535]" aria-label="Reymark portfolio">
      <div className="absolute -z-10 inset-y-0 left-[43.87%] bg-[#e7dbc8] rounded-tl-[11%]" style={{ right: 'min(0px, calc((2020px - 100vw) / 2))' }} aria-hidden="true" />
      <svg className="absolute inset-0 -z-5 h-full w-full pointer-events-none" viewBox="0 0 2020 804" fill="none">
        <polygon points="268,60 770,89 476,440 264,440 27,261" fill="#696161" />
        <polygon points="1653,37 2258,208 1858,804 1370,804" fill="#b5ab9a" />
      </svg>
      <header className="absolute z-20 top-[30.69%] left-[27.19%] flex flex-col text-left font-inria leading-[1.08]">
        <span className="text-[0.79cqw] text-white/80">DEQUITO</span><strong className="text-[1.24cqw] font-normal tracking-[0.02em] text-black">REYMARK</strong>
      </header>
      <h1 className="absolute z-10 top-[40.75%] left-[26.3%] m-0 origin-top-left scale-x-140 scale-y-110 select-none whitespace-nowrap font-italiana text-[7.7cqw] leading-[0.9] tracking-[-0.045em] text-[#111]">PORTFOLIO</h1>
      <img className="absolute z-20 right-[26.7%] top-[6%] h-[69.2%] w-auto object-contain object-bottom" src={portrait} alt="Reymark wearing sunglasses and a dark jacket" draggable={false} />
      <img className="absolute z-20 left-[15.4%] top-[35.4%] h-[36.2%] w-auto select-none object-contain" src={mabangisIcon} alt="Mabangis icon" draggable={false} />
      <img className="absolute z-20 left-[14.1%] bottom-[9.7%] h-auto w-[6.9%] select-none" src={barcode} alt="Barcode" draggable={false} />
      <footer className="absolute z-30 left-[25.44%] right-[22.55%] bottom-[2.74%] flex h-[27.99%] items-center justify-between bg-[#353535] px-[3.11%] py-[1.59%]">
        <div className="flex h-[81.33%] w-[25%] flex-col items-center justify-center rounded-[4px] border border-[rgba(231,219,200,0.75)] text-center font-iosevka text-[0.73cqw] leading-[1.4] text-white"><p className="m-0 mb-[7px]">End-to-end web<br />development built for<br />scale and performance</p><img className="h-[43.33%] w-[82%] object-contain" src={signature} alt="Reymark's signature" /></div>
        <img className="h-[71.11%] w-[52.5%] object-contain" src={fullstack} alt="Fullstack" draggable={false} />
      </footer>
    </div>
  </section>
}
