import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger,SplitText);

const services = [
  {
    label: "01",
    title: "Product interfaces",
    copy: "Clean dashboards, forms, and storefronts that stay easy to use on any screen.",
  },
  {
    label: "02",
    title: "Fullstack delivery",
    copy: "Front to back implementation with a focus on performance, accuracy, and maintainability.",
  },
  {
    label: "03",
    title: "Local systems",
    copy: "Community, inventory, and operations tools built for real day-to-day work.",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wording = useRef<HTMLHeadingElement>(null);
  const number = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (wording.current) {
        const split = new SplitText(wording.current, { type: "chars" });
        gsap.from(split.chars, {
          rotateX: 60,
          stagger: 0.06,
          duration: 0.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: wording.current,
            start: "top bottom",
            end: "+=300",
          },
        });

        const tl = gsap.timeline({ repeat: -1 });

        tl.to(split.chars, {
          color: "#F2D865",
          duration: 0.5,
          ease: "power4.inOut",
          stagger: 0.05,
        }).to(split.chars, {
          color: "#ffffff", // your original color
          duration: 0.5,
          ease: "power4.inOut",
          stagger: 0.02,
        });

        // pad so one full loop = 4s
        tl.to({}, { duration: Math.max(0, 4 - tl.duration()) });
      }

      if (number.current) {
        gsap.to(number.current, {
          keyframes: {
            x: [0, -6, 6, -4, 4, -2, 2, 0],
            easeEach: "none",
          },
          duration: 0.4,
          repeat: -1,
          repeatDelay: 6,
          scrollTrigger: {
            trigger: number.current,
            start: "top bottom",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-10 flex h-dvh w-full items-center overflow-hidden bg-[#333333] px-[8%] py-24 text-[#e7dbc8]"
      aria-label="About and contact"
    >
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-16">
        <header className="flex flex-col gap-6">
          <p className="m-0 font-inria text-[0.75rem] tracking-[0.28em] text-white/55">
            DEQUITO / REYMARK
          </p>
          <h2 ref={wording} className="m-0 font-italiana text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.04em] text-white overflow-hidden">
            LET&apos;S BUILD
          </h2>
          <p className="m-0 max-w-[38rem] font-jura text-[1.05rem] leading-[1.7] text-[#c0baa6]">
            End-to-end web development for products that need to look sharp,
            stay fast, and scale without getting messy. Dashboards, public
            sites, and mobile-ready flows — from first screen to production.
          </p>
          <p>contact no.- <span ref={number} className="inline-block">09707331334</span></p>
        </header>
        <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-3">
          {services.map((item) => (
            <li key={item.label} className="border-t border-[#e7dbc8]/25 pt-5">
              <span className="font-iosevka text-[0.7rem] tracking-[0.18em] text-white/40">
                {item.label}
              </span>
              <h3 className="mt-3 mb-2 font-jura text-[1.05rem] font-semibold tracking-[0.04em] text-white">
                {item.title}
              </h3>
              <p className="m-0 font-jura text-[0.85rem] leading-[1.55] text-[#969593]">
                {item.copy}
              </p>
            </li>
          ))}
        </ul>
        <footer className="flex flex-col items-start justify-between gap-6 border-t border-[#e7dbc8]/20 pt-8 sm:flex-row sm:items-end">
          <div>
            <p className="m-0 font-jura text-[0.8rem] tracking-[0.16em] text-[#c0baa6]">
              AVAILABLE FOR WORK
            </p>
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
  );
}
