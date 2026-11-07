import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useRef, type ReactNode } from "react";
import securityImg from "../assets/image/security.png";
import cloudImg from "../assets/image/cloud.png";
import coreImg from "../assets/image/core.png";

gsap.registerPlugin(ScrollTrigger, Flip);

const SECURITY_PILLS = [
  "Authentication",
  "Sanitization",
  "Encryption",
  "RateLimit",
] as const;

const BACKUP_PILLS = [
  "Storage",
  "Database",
  "Indexing",
] as const;

interface SecuritySectionProps {
  children?: ReactNode;
}

const SecuritySection = ({ children }: SecuritySectionProps) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const hackerImgRef = useRef<HTMLImageElement>(null);
  const secondCardRef = useRef<HTMLDivElement>(null);
  const cloudImgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (
        !wrapper.current ||
        !firstCardRef.current ||
        !hackerImgRef.current ||
        !secondCardRef.current ||
        !cloudImgRef.current
      )
        return;

      const panelDist = () => window.innerHeight / 2;
      const ampDist = () =>
        window.innerHeight / 2 +
        ((wrapper.current?.querySelector(".ampUp") as HTMLElement)?.offsetHeight || 0);

      const getMiniDimensions = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          return {
            width: Math.min(170, window.innerWidth * 0.44),
            height: Math.min(138, window.innerHeight * 0.24),
          };
        }
        return {
          width: Math.min(300, Math.max(200, window.innerWidth * 0.18)),
          height: Math.min(240, Math.max(150, window.innerHeight * 0.33)),
        };
      };

      const getHackerCoords = () => {
        if (!hackerImgRef.current || !wrapper.current) {
          return { deltaX: 0, deltaY: 0, scale: 1 };
        }

        const prevTransform = hackerImgRef.current.style.transform;
        hackerImgRef.current.style.transform = "none";

        const wrapperRect = wrapper.current.getBoundingClientRect();
        const hackerRect = hackerImgRef.current.getBoundingClientRect();

        hackerImgRef.current.style.transform = prevTransform;

        const startX = hackerRect.left - wrapperRect.left;
        const startY = hackerRect.top - wrapperRect.top;
        const startW = hackerRect.width || 380;

        const mini = getMiniDimensions();
        const cardLeft = wrapperRect.width - mini.width;
        const cardTop = wrapperRect.height - mini.height;

        const targetW = mini.width * 0.65;
        const targetScale = targetW / startW;

        const targetX = cardLeft + (mini.width - targetW) / 2;
        const targetY = cardTop + (mini.height - targetW) - 14;

        return {
          deltaX: targetX - startX,
          deltaY: targetY - startY,
          scale: targetScale,
        };
      };

      const getCloudCoords = () => {
        if (!cloudImgRef.current || !wrapper.current) {
          return { deltaX: 0, deltaY: 0, scale: 1 };
        }

        const prevTransform = cloudImgRef.current.style.transform;
        cloudImgRef.current.style.transform = "none";

        const wrapperRect = wrapper.current.getBoundingClientRect();
        const cloudRect = cloudImgRef.current.getBoundingClientRect();

        cloudImgRef.current.style.transform = prevTransform;

        const startX = cloudRect.left - wrapperRect.left;
        const startY = cloudRect.top - wrapperRect.top;
        const startW = cloudRect.width || 380;
        const startH = cloudRect.height || 240;

        const mini = getMiniDimensions();
        const cardLeft = wrapperRect.width - mini.width;
        const cardTop = wrapperRect.height - mini.height;

        const targetW = mini.width * 0.72;
        const targetScale = targetW / startW;
        const targetH = startH * targetScale;

        const targetX = cardLeft + (mini.width - targetW) / 2;
        const targetY = cardTop + (mini.height - targetH) / 2;

        return {
          deltaX: targetX - startX,
          deltaY: targetY - startY,
          scale: targetScale,
        };
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "+=360%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // =======================================================================
      // PHASE 1: Split black doors open ("Security & Backup")
      // =======================================================================
      tl.to(".goesUP", { y: () => -panelDist(), duration: 1 })
        .to(".goesDown", { y: () => panelDist(), duration: 1 }, "<")
        .to(".ampUp", { y: () => -ampDist(), duration: 1 }, "<")
        .to(".ampDown", { y: () => ampDist(), duration: 1 }, "<");

      // Pause / Hold on Page 1 (Security Section)
      tl.to({}, { duration: 0.35 });

      // =======================================================================
      // PHASE 2: Transition Page 1 (Security) -> Page 2 (Backup)
      // =======================================================================
      // Fade out Page 1 text and pills
      tl.to(".p1-text-fade", { opacity: 0, y: -20, duration: 0.35, ease: "power1.in" });

      // Shrink Page 1 beige card into bottom-right corner
      tl.to(
        firstCardRef.current,
        {
          left: () => `${window.innerWidth - getMiniDimensions().width}px`,
          top: () => `${window.innerHeight - getMiniDimensions().height}px`,
          width: () => `${getMiniDimensions().width}px`,
          height: () => `${getMiniDimensions().height}px`,
          borderTopLeftRadius: "16px",
          boxShadow: "-8px -8px 35px rgba(0, 0, 0, 0.4)",
          duration: 1.0,
          ease: "power2.inOut",
        },
        "<+=0.05"
      );

      // Glide and scale the single Hacker icon into the bottom-right card
      tl.to(
        hackerImgRef.current,
        {
          x: () => getHackerCoords().deltaX,
          y: () => getHackerCoords().deltaY,
          scale: () => getHackerCoords().scale,
          duration: 1.0,
          ease: "power2.inOut",
        },
        "<"
      );

      // Reveal Page 2 (Backup / Cloud) content
      tl.fromTo(
        ".p2-heading",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      )
        .fromTo(
          ".p2-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".p2-pills",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          cloudImgRef.current,
          { opacity: 0, scale: 0.88, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.6"
        );

      // Pause / Hold on Page 2 (Backup Section)
      tl.to({}, { duration: 0.4 });

      // =======================================================================
      // PHASE 3: Transition Page 2 (Backup) -> Page 3 (System Design Principles)
      // =======================================================================
      // Fade out Page 2 text, pills, and the previous Page 1 card in bottom-right
      tl.to(".p2-text-fade", { opacity: 0, y: -20, duration: 0.35, ease: "power1.in" })
        .to(
          [firstCardRef.current, hackerImgRef.current],
          { opacity: 0, duration: 0.35, ease: "power1.in" },
          "<"
        );

      // Shrink Page 2 slate card into bottom-right corner
      tl.to(
        secondCardRef.current,
        {
          left: () => `${window.innerWidth - getMiniDimensions().width}px`,
          top: () => `${window.innerHeight - getMiniDimensions().height}px`,
          width: () => `${getMiniDimensions().width}px`,
          height: () => `${getMiniDimensions().height}px`,
          borderTopLeftRadius: "16px",
          boxShadow: "-8px -8px 35px rgba(0, 0, 0, 0.4)",
          duration: 1.0,
          ease: "power2.inOut",
        },
        "<+=0.05"
      );

      // Glide and scale the single Cloud icon into the bottom-right card
      tl.to(
        cloudImgRef.current,
        {
          x: () => getCloudCoords().deltaX,
          y: () => getCloudCoords().deltaY,
          scale: () => getCloudCoords().scale,
          duration: 1.0,
          ease: "power2.inOut",
        },
        "<"
      );

      // Reveal Page 3 (System Design Principles) content
      tl.fromTo(
        ".p3-header",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      ).fromTo(
        ".p3-para",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

      // Hold on Page 3 before unpinning
      tl.to({}, { duration: 0.45 });
    },
    { scope: wrapper }
  );

  return (
    <div
      ref={wrapper}
      className="relative h-dvh w-full text-white flex flex-col overflow-hidden z-40"
    >
      {/* =========================================================================
          PAGE 3: SYSTEM DESIGN PRINCIPLES (Light silver/gray #e3e4e6)
         ========================================================================= */}
      <div className="absolute inset-0 z-0 bg-[#e3e4e6] text-[#1a1a1a] flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16 select-text overflow-hidden">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-14 ">
          {/* Top Header: core.png on left, Title + Contact on right */}
          <div className="p3-header flex items-center justify-between w-full max-w-3xl gap-6 sm:gap-8 md:gap-12">
            <img
              src={coreImg}
              alt="System Design Core"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain shrink-0 select-none pointer-events-none drop-shadow-sm"
              draggable={false}
            />
            <div className="flex flex-col items-end text-right">
              <h2 className="font-pompiere text-[#1a1a1a] text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap leading-none">
                System Design Principles
              </h2>
              <div className="font-poppins text-xs sm:text-[13px] text-[#4a4a4a] mt-2 sm:mt-2.5 flex flex-col items-end tracking-tight">
                <span>genuinepower123@gmail.com</span>
                <span>reymark_dequito</span>
              </div>
            </div>
          </div>

          {/* Mission statement paragraph */}
          <div className="p3-para w-full max-w-3xl text-left">
            <p className="font-poppins text-lg sm:text-xl md:text-2xl text-[#1f1f1f] leading-relaxed font-normal">
              My mission is to build applications with a focus on performance, security, scalability, reliability, observability, maintainability, disaster recovery, and cost efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PAGE 2 BACKGROUND CARD: (Slate navy #364561, animates to bottom-right)
         ========================================================================= */}
      <div
        ref={secondCardRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        className="z-10 bg-[#364561] overflow-hidden pointer-events-none"
      />

      {/* =========================================================================
          PAGE 2 CONTENT LAYER: (Text, Pills, and Cloud Illustration)
         ========================================================================= */}
      <div className="absolute inset-0 z-15 flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16 select-text pointer-events-none overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 md:gap-10 lg:gap-16 h-full max-h-[580px]">
          {/* Left Column: Pompiere Heading & Poppins Subtitle */}
          <div className="p2-text-fade flex flex-col items-start justify-center w-full md:w-[52%] lg:w-[55%] text-left pointer-events-auto">
            <h2 className="p2-heading font-pompiere text-white text-5xl leading-[1.12] tracking-wide">
              Beyond designing robust security<br className="hidden sm:inline" />
              perimeters, I architect redundant<br className="hidden sm:inline" />
              backup systems engineered to<br className="hidden sm:inline" />
              guarantee data integrity and zero-<br className="hidden sm:inline" />
              downtime recovery.
            </h2>

            <p className="p2-subtitle font-poppins text-xs sm:text-sm md:text-[15px] font-normal text-white/80 tracking-normal mt-6 sm:mt-8 pt-4">
              To me, security isn't a feature—it's a foundational requirement.
            </p>
          </div>

          {/* Right Column: White Pills & Cloud Illustration */}
          <div className="flex flex-col items-start justify-center w-full md:w-[45%] lg:w-[42%] shrink-0 ">
            {/* Pills row */}
            <div className="p2-pills p2-text-fade flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap pointer-events-auto">
              {BACKUP_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="font-poppins text-[11px] sm:text-xs md:text-[13px] font-medium bg-white text-black px-3.5 py-1.5 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full shadow-sm tracking-tight transition-transform hover:scale-105 select-none"
                >
                  {pill}
                </span>
              ))}
              <button
                type="button"
                aria-label="Add backup feature"
                className="font-poppins text-lg sm:text-xl md:text-2xl font-light text-white flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:rotate-90 transition-transform duration-300 cursor-pointer select-none"
              >
                +
              </button>
            </div>

            {/* The ONE and ONLY Cloud Illustration */}
            <div className="w-full flex items-center justify-center mt-6 pt-4 ">
              <img
                ref={cloudImgRef}
                src={cloudImg}
                alt="Cloud Backup Systems"
                className="w-[280px] max-w-full h-auto object-contain select-none pointer-events-none drop-shadow-md origin-top-left"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PAGE 1 BACKGROUND CARD: (Beige #D2CEC9, animates to bottom-right corner)
         ========================================================================= */}
      <div
        ref={firstCardRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        className="z-20 bg-[#D2CEC9] overflow-hidden pointer-events-none"
      />

      {/* =========================================================================
          PAGE 1 CONTENT LAYER: (Pills, Heading, and the ONE Hacker Image)
         ========================================================================= */}
      <div className="absolute inset-0 z-25 flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16 select-text pointer-events-none">
        {children ? (
          children
        ) : (
          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 md:gap-10 lg:gap-16 h-full max-h-[580px]">
            {/* Left Column: Pills & The Single Hacker Illustration */}
            <div className="flex flex-col items-start justify-between w-full md:w-[45%] lg:w-[42%] shrink-0">
              {/* Pills row */}
              <div className="p1-text-fade flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap pointer-events-auto">
                {SECURITY_PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="font-poppins text-[11px] sm:text-xs md:text-[13px] font-medium bg-black text-white px-3.5 py-1.5 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full shadow-sm tracking-tight transition-transform hover:scale-105 select-none"
                  >
                    {pill}
                  </span>
                ))}
                <button
                  type="button"
                  aria-label="Add security feature"
                  className="font-poppins text-lg sm:text-xl md:text-2xl font-light text-black flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:rotate-90 transition-transform duration-300 cursor-pointer select-none"
                >
                  +
                </button>
              </div>

              {/* The ONE and ONLY Hacker Illustration */}
              <div className="w-full flex items-end justify-start mt-6 sm:mt-8 md:mt-auto pt-4">
                <img
                  ref={hackerImgRef}
                  src={securityImg}
                  alt="Security illustration"
                  className="w-[280px] sm:w-[330px] md:w-[380px] lg:w-[420px] max-w-full h-auto object-contain select-none pointer-events-none drop-shadow-sm origin-top-left"
                  draggable={false}
                />
              </div>
            </div>

            {/* Right Column: Statement & Subtitle */}
            <div className="p1-text-fade flex flex-col items-start justify-center w-full md:w-[52%] lg:w-[55%] text-left pointer-events-auto">
              {/* Main Statement in Pompiere */}
              <h2 className="font-pompiere text-[#1a1a1a] text-5xl leading-[1.12] tracking-wide">
                Beyond creating functional,<br className="hidden sm:inline" />
                purpose-driven systems, I<br className="hidden sm:inline" />
                engineer resilient architectures<br className="hidden sm:inline" />
                designed to withstand the modern<br className="hidden sm:inline" />
                threat landscape.
              </h2>

              {/* Subtitle in Poppins */}
              <p className="font-poppins text-xs sm:text-sm md:text-[15px] font-normal text-[#242424] tracking-normal mt-6 sm:mt-8 pt-4">
                To me, security isn't a feature—it's a foundational requirement.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          SLIDING DOORS: ("Security", "&", "Backup")
         ========================================================================= */}
      <section className="relative z-30 w-full h-1/2 flex items-center bg-[#0b0b0b] justify-center text-9xl font-playfair goesUP pointer-events-none">
        <h1 className="-translate-x-80">Security</h1>
      </section>

      <div className="font-play text-9xl absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex pointer-events-none">
        <h1 className="ampUp">&</h1>
        <h1 className="ampDown">&</h1>
      </div>

      <section className="relative z-30 w-full h-1/2 flex items-center bg-[#0b0b0b] justify-center text-9xl font-playwrite goesDown pointer-events-none">
        <h1 className="translate-x-80">Backup</h1>
      </section>
    </div>
  );
};

export default SecuritySection;
