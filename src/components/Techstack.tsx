import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import backblaze from "../assets/image/techstack/backblaze.png";
import claudinary from "../assets/image/techstack/claudinary.png";
import css from "../assets/image/techstack/css.png";
import docker from "../assets/image/techstack/docker.png";
import drawio from "../assets/image/techstack/drawio.png";
import expo from "../assets/image/techstack/expo.png";
import express from "../assets/image/techstack/express.png";
import figma from "../assets/image/techstack/figma.png";
import framermotion from "../assets/image/techstack/framermotion.png";
import github from "../assets/image/techstack/github.png";
import gsapLogo from "../assets/image/techstack/gsap.png";
import html from "../assets/image/techstack/html.png";
import javascript from "../assets/image/techstack/javascript.png";
import lucidapp from "../assets/image/techstack/lucidapp.png";
import mongodb from "../assets/image/techstack/mongodb.png";
import neon from "../assets/image/techstack/neon.png";
import nextjs from "../assets/image/techstack/nextjs.png";
import nodejs from "../assets/image/techstack/nodejs.png";
import paymongo from "../assets/image/techstack/paymongo.png";
import posgresql from "../assets/image/techstack/posgresql.png";
import reactjs from "../assets/image/techstack/reactjs.png";
import reactnative from "../assets/image/techstack/reactnative.png";
import redux from "../assets/image/techstack/redux.png";
import render from "../assets/image/techstack/render.png";
import supabase from "../assets/image/techstack/supabase.png";
import tailwind from "../assets/image/techstack/tailwind.png";
import typescript from "../assets/image/techstack/typescript.png";
import vercel from "../assets/image/techstack/vercel.png";
import vscode from "../assets/image/techstack/vscode.png";
import zustand from "../assets/image/techstack/zustand.png";

gsap.registerPlugin(ScrollTrigger);

const featuredStack = [
  { src: nodejs, alt: "Node.js", className: "h-32 w-32" },
  { src: reactjs, alt: "React", className: "h-26 w-26" },
  { src: typescript, alt: "TypeScript", className: "h-26 w-26" },
  { src: javascript, alt: "JavaScript", className: "h-26 w-26" },
];

const technologies = [
  [vscode, "Visual Studio Code"], [css, "CSS"], [gsapLogo, "GSAP"], [github, "GitHub"], [redux, "Redux"], [expo, "Expo"], [drawio, "Draw.io"],
  [figma, "Figma"], [html, "HTML"], [lucidapp, "Lucidchart"], [tailwind, "Tailwind CSS"], [zustand, "Zustand"], [render, "Render"], [reactnative, "React Native"],
  [nextjs, "Next.js"], [express, "Express"], [backblaze, "Backblaze"], [neon, "Neon"], [paymongo, "PayMongo"], [vercel, "Vercel"],
  [docker, "Docker"], [claudinary, "Cloudinary"], [reactjs, "React"], [posgresql, "PostgreSQL"], [mongodb, "MongoDB"], [supabase, "Supabase"], [framermotion, "Framer Motion"],
] as const;

export default function Techstack() {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapper.current || !content.current) return;

    const getDistance = () => Math.max(0, content.current!.scrollWidth - window.innerWidth);
    const holdDistance = 400;
    const animation = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: wrapper.current,
        start: "top top",
        end: () => `+=${getDistance() + holdDistance * 2}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    animation
      .to({}, { duration: holdDistance })
      .to(content.current, { x: () => -getDistance(), duration: getDistance() })
      .to({}, { duration: holdDistance });

    return () => animation.kill();
  }, { scope: wrapper });

  return (
    <section ref={wrapper} className="relative z-20 h-dvh w-full overflow-hidden bg-[#d2cec9] text-[#171717]" aria-label="Technology stack">
      <div ref={content} className="flex h-full w-[200dvw] min-w-[1100px] will-change-transform">
        <div className="flex h-full w-[80dvw] min-w-[880px] shrink-0 items-center bg-[#d2cec9] px-[clamp(5rem,12vw,11rem)]">
          <div className="w-full max-w-[610px]">
            <header>
              <h2 className="m-0 font-italiana text-[clamp(3.25rem,5.5vw,5.8rem)] leading-none text-[#424242]">TECH STACK</h2>
              <div className="mt-4 h-px w-44 bg-[#a7a39d]" />
              <div className="mt-2 h-px w-26 bg-[#a7a39d]" />
            </header>
            <div className="mt-[clamp(4rem,10vh,9rem)] font-inria text-[clamp(1.05rem,1.45vw,1.55rem)] leading-[1.45]">
              <p className="m-0">Here are some of technologies I used during my development</p>
              <p className="mt-8 mb-0">The learning curve doesn&apos;t end on present time,<br />But only to keep</p>
              <p className="my-12 font-iosevka text-[clamp(2.2rem,3.5vw,4rem)] font-bold italic leading-none tracking-[-0.08em]">UPGRADE</p>
              <p className="m-0">and Improve day by day.</p>
            </div>
          </div>
        </div>

        <aside className="flex h-full w-[20dvw] min-w-[220px] shrink-0 flex-col items-center justify-center gap-[clamp(2.4rem,6vh,6rem)] bg-[#ada08e]" aria-label="Core technologies">
          {featuredStack.map((technology) => (
            <img key={technology.alt} src={technology.src} alt={technology.alt} className={`${technology.className} object-contain`} draggable={false} />
          ))}
        </aside>

        <div
          className="grid h-full w-dvw min-w-[1100px] shrink-0 grid-cols-7 place-items-center bg-[#ada08e] py-[4%] pr-[2%]"
          style={{ gridTemplateRows: "repeat(4, minmax(0, 1fr))" }}
        >
          {technologies.map(([src, alt]) => (
            <img key={alt} src={src} alt={alt} className="h-26 w-26 object-contain transition-transform duration-300 hover:scale-110" draggable={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
