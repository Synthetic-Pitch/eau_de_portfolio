import web1 from "../assets/image/web1.png";
import web2 from "../assets/image/web2.png";
import web3 from "../assets/image/web3.png";
import web4 from "../assets/image/web4.png";
import web5 from "../assets/image/web5.png";
import web7 from "../assets/image/web7.png";
import web8 from "../assets/image/web8.png";
import web9 from "../assets/image/web9.png";
import web10 from "../assets/image/web10.png";
import web11 from "../assets/image/web11.png";
import web12 from "../assets/image/web12.png";
import web13 from "../assets/image/web13.png";
import web14 from "../assets/image/web14.png";
import web15 from "../assets/image/web15.png";
import web16 from "../assets/image/web16.png";
import web17 from "../assets/image/web17.png";

export type Project = {
  src: string;
  alt: string;
  title: string;
  description: string;
  url?: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const projects: Project[] = [
  {
    src: web1,
    alt: "Personal panel interface",
    title: "Personal panel",
    description:
      "A personal dashboard for managing account information and activity.",
    url: "https://opss-admin.vercel.app",
    x: 109,
    y: 25,
    w: 227,
    h: 110,
  },
  {
    src: web2,
    alt: "Mobile service form",
    title: "Service request",
    description: "A mobile friendly form for submitting service requests.",
    url: "https://barangay-digitalize.vercel.app/",
    x: 352,
    y: 78,
    w: 48,
    h: 106,
  },
  {
    src: web3,
    alt: "Website landing page",
    title: "OPSS Traffic website",
    description:
      "A clean landing page introducing a digital product and its features.",
    url: "https://capstone1-opss.vercel.app/",
    x: 434,
    y: 48,
    w: 152,
    h: 75,
  },
  {
    src: web4,
    alt: "Analytics dashboard",
    title: "Analytics dashboard",
    description:
      "A web dashboard for viewing metrics and business performance.",
    url: "https://stockroom-drab.vercel.app/",
    x: 600,
    y: 50,
    w: 360,
    h: 174,
  },
  {
    src: web5,
    alt: "Mobile login screen",
    title: "Mobile login",
    description:
      "A streamlined sign in experience designed for mobile screens.",
    x: 962,
    y: 14,
    w: 89,
    h: 171,
  },
  {
    src: web12,
    alt: "Biggest Sale mobile design",
    title: "Biggest Sale",
    description: "A mobile shopping experience for browsing a seasonal sale.",
    url: "https://next-markies.vercel.app/",
    x: 240,
    y: 156,
    w: 81,
    h: 161,
  },
  {
    src: web7,
    alt: "Bookstore website design",
    title: "Inventory management",
    description:
      "An inventory management online platform to make life much more easier and precisely accurate",
    url: "https://stockroom-drab.vercel.app/",
    x: 413,
    y: 137,
    w: 125,
    h: 70,
  },
  {
    src: web11,
    alt: "Barangay website design",
    title: "Barangay website",
    description:
      "A community website that helps residents find local services and information.",
    url: "https://barangay-digitalize.vercel.app/",
    x: 355,
    y: 219,
    w: 246,
    h: 115,
  },
  {
    src: web8,
    alt: "Traffic violation mobile interface",
    title: "Traffic violations",
    description:
      "A mobile interface for reviewing traffic violation information.",
    url: "https://capstone1-opss.vercel.app/",
    x: 648,
    y: 235,
    w: 62,
    h: 129,
  },
  {
    src: web9,
    alt: "Online courses website",
    title: "Online courses",
    description: "An online learning site for exploring courses and lessons.",
    url: "https://bytespace-indol.vercel.app/",
    x: 727,
    y: 258,
    w: 303,
    h: 163,
  },
  {
    src: web10,
    alt: "Pending requests form",
    title: "Request management",
    description: "A management screen for reviewing pending requests.",
    url: "https://opss-admin.vercel.app",
    x: 1048,
    y: 215,
    w: 109,
    h: 197,
  },
  {
    src: web13,
    alt: "Authority verification page",
    title: "Authority verification",
    description: "A verification page for confirming an authorized user.",
    url: "https://mmda.vercel.app",
    x: 275,
    y: 344,
    w: 152,
    h: 77,
  },
  {
    src: web14,
    alt: "Biggest Sale website",
    title: "Biggest Sale",
    description: "An online store campaign page for a major sale event.",
    url: "https://next-markies.vercel.app/",
    x: 462,
    y: 358,
    w: 176,
    h: 78,
  },
  {
    src: web15,
    alt: "Point Of Sale",
    title: "Point of sale",
    description:
      "A point of sale interface for handling in store transactions.",
    x: 92,
    y: 208,
    w: 176,
    h: 178,
  },
  {
    src: web16,
    alt: "FunFries Kios website",
    title: "FunFries Kios",
    description: "A website for FunFries Kios.",
    url: "https://reymarkdequito.live",
    x: 1070,
    y: 20,
    w: 98,
    h: 190,
  },
  {
    src: web17,
    alt: "Converthium",
    title: "Converthium",
    description: "A system let you convert or resize into smaller size your file",
    url: "https://converthium.vercel.app/",
    x: -170,
    y: 180,
    w: 388,
    h: 130,
  },
];
