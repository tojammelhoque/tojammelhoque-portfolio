"use client";
import Link from "next/link";
import { Button } from "./ui/button";

interface projectsData {
  title: string;
  description: string;
  link: string;
  code: string;
  previewVideo: string;
  technologies: string[];
}

const projectsData = [
  {
    title: "FormVibe",
    description:
      "FormVibe is a platform that allows users to create and share forms with their friends.",
    link: "",
    code: "",
    previewVideo: "",
    technologies: [
      "Next.js",
      "React",
      "Appwrite",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "EmojiGit CLI Tool",
    description:
      "EmojiGit is a CLI tool that allows you to add emojis to your git commits.",
    link: "",
    code: "",
    previewVideo: "",
    technologies: ["JavaScript", "Node.js", "Git", "Emoji", "Meow", "Inquirer"],
  },
  {
    title: "CloudSpace",
    description:
      "CloudSpace is a platform that allows users to create and share spaces with their friends.",
    link: "",
    code: "",
    previewVideo: "",
    technologies: [
      "Next.js",
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "BlogBuddy",
    description:
      "BlogBuddy is a platform that allows users to create and share blogs with their friends.",
    link: "",
    code: "",
    previewVideo: "",
    technologies: [
      "Next.js",
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
] as const;

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
            <video
              src={project.previewVideo}
              autoPlay
              muted
              loop
              className="rounded-t-md"
            />
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
