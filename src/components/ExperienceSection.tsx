import linuxLogo from "../assets/icons/linux.png";
import windowsLogo from "../assets/icons/windows.png";

export default function ExperienceSection() {
  return (
    <section
      className="flex h-60 w-full items-center justify-center bg-[linear-gradient(110deg,#334662_0%,#1F304A_100%)] px-[8%]"
      aria-label="Experience progression"
    >
      <div className="flex w-full max-w-[1080px] items-center justify-center gap-[14%] text-white">
        <img
          className="w-[clamp(42px,6vw,64px)] object-contain"
          src={linuxLogo}
          alt="Linux"
        />
        <div className="flex flex-col items-center">
          <p className="m-0 font-jura text-[1.2em] font-semibold tracking-[0.04em] text-[#C0BAA6]">
            3 years progression
          </p>
          <p className="font-jura text-[#969593]">for engineering</p>
        </div>
        <img
          className="w-[clamp(46px,7vw,64px)] object-contain"
          src={windowsLogo}
          alt="Windows"
        />
      </div>
    </section>
  );
}
