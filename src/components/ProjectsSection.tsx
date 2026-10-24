import { useState, type FocusEvent, type PointerEvent } from "react";
import { projects, type Project } from "../data/projects";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const movePopup = (event: PointerEvent<HTMLImageElement>) => {
    const gap = 20;
    const popupWidth = Math.min(350, window.innerWidth - 32);
    const popupHeight = 150;
    let x = event.clientX + gap;
    let y = event.clientY + gap;
    if (x + popupWidth > window.innerWidth - 12)
      x = event.clientX - popupWidth - gap;
    if (y + popupHeight > window.innerHeight - 12)
      y = event.clientY - popupHeight - gap;
    setPopupPosition({ x: Math.max(12, x), y: Math.max(12, y) });
  };
  const openProject = (project: Project) => {
    if (project.url) window.open(project.url, "_blank", "noopener,noreferrer");
  };
  return (
    <section
      className="relative flex h-dvh max-h-210 w-full justify-center bg-[#d2cec9] aspect-[1260/443]"
      aria-label="Selected projects"
    >
      <div className="relative h-full w-650 shrink-0 ">
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
              setActiveProject(project);
              movePopup(event);
            }}
            onPointerMove={movePopup}
            onPointerLeave={() => setActiveProject(null)}
            onFocus={(event: FocusEvent<HTMLImageElement>) => {
              setActiveProject(project);
              const rect = event.currentTarget.getBoundingClientRect();
              setPopupPosition({
                x: Math.max(12, rect.left),
                y: Math.max(12, rect.top),
              });
            }}
            onBlur={() => setActiveProject(null)}
            onClick={() => openProject(project)}
            onKeyDown={(event) => {
              if (project.url && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                openProject(project);
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
          <h2 className="m-0 mb-3 font-jura text-xl font-bold tracking-[0.04em]">
            {activeProject.title}
          </h2>
          <p className="m-0 font-jura text-xs leading-[1.3] tracking-[0.025em]">
            {activeProject.description}
          </p>
        </aside>
      )}
    </section>
  );
}
