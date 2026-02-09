"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

interface projectsData {
  title: string;
  description: string;
  link: string;
  code: string;
  previewVideo: string;
  technologies: string[];
}

const projectsData: projectsData[] = [
  {
    title: "MERN Stack Authentication",
    description:
      "MERN Stack Authentication is a full-stack authentication platform that allows users to register, login, and manage their accounts.",
    link: "https://mern-auth-frontend-yi1u.onrender.com/",
    code: "https://github.com/tojammelhoque/mern-stack-authentication",
    previewVideo: "/videos/Mern-Auth.mp4",
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "React",
      "Vite",
      "Tailwind CSS",
      "JWT (JSON Web Tokens)",
      "bcryptjs",
      "HTTP-only Cookies",
      "Resend API",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Axios",
      "React Icons",
      "React Hot Toast",
      "React Router DOM",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "express-rate-limit",
      "validator",
      "cookie-parser",
      "cors",
      "dotenv",
    ],
  },
  {
    title: "MERN Ecommerce Store",
    description:
      "MERN Ecommerce Store is a full-stack ecommerce platform that allows users to browse products, add them to the cart, and securely complete purchases.",
    link: "https://mern-ecommerce-store-amt1.onrender.com",
    code: "https://github.com/tojammelhoque/MERN-ecommerce-website",
    previewVideo: "/videos/mern-e-com.mp4",
    technologies: [
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
      "React",
      "Tailwind CSS",
      "JWT",
      "Stripe",
    ],
  },
  {
    title: "Password Manager",
    description:
      "Password Manager is a platform that allows users to create and store passwords.",
    link: "https://tojammelhoque.github.io/PasswordManager/",
    code: "https://github.com/tojammelhoque/PasswordManager",
    previewVideo: "/videos/PasswordManager.mp4",
    technologies: ["React", "Tailwind CSS"],
  },
  {
    title: "Dice Roller Game",
    description:
      "Dice Roller Game is a fun game that allows users to roll dice and predict the outcome.",
    link: "https://tojammelhoque.github.io/dice-game/",
    code: "https://github.com/tojammelhoque/dice-game",
    previewVideo: "/videos/dice-game.mp4",
    technologies: ["React", "Tailwind CSS"],
  },
];

function Project() {
  return (
    <div id="projects" className="px-2 mb-5 flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="flex flex-col border rounded-md dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {project.previewVideo.endsWith(".mp4") ? (
              <div className="relative w-full h-[300px]">
                {" "}
                <video
                  src={project.previewVideo}
                  autoPlay
                  muted
                  loop
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-md"
                />
              </div>
            ) : (
              <div className="relative w-full h-[300px]">
                {" "}
                <Image
                  src={project.previewVideo}
                  alt={project.title}
                  className="rounded-t-md object-cover"
                  fill
                />
              </div>
            )}

            <div className="flex flex-col gap-3 p-4 grow">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-[4px]">
                {project.technologies.map((technology, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <Link href={project.link}>
                  <Button className="transition-opacity hover:opacity-80">
                    View
                  </Button>
                </Link>
                <Link href={project.code}>
                  <Button
                    variant="outline"
                    className="transition-opacity hover:opacity-80"
                  >
                    Code
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
