"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { IoLogoHtml5 } from "react-icons/io";
import { FaCss3Alt } from "react-icons/fa";
import { AiOutlineJavaScript } from "react-icons/ai";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaBootstrap } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import { motion } from "framer-motion";

function About() {
  return (
    <div
      id="about"
      className="container text-white py-3 px-1 flex flex-col items-center justify-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-10 md:mt-0 text-center text-2xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
      >
        About Me
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 text-base md:text-lg lg:text-xl text-neutral-300 text-center leading-relaxed tracking-wide max-w-4xl mx-auto"
      >
        Hi, I&apos;m{" "}
        <span className="font-semibold text-white">Tojammel Hoque</span>, a
        passionate
        <span className="font-semibold text-white">
          {" "}
          Full-Stack Web Developer
        </span>{" "}
        specializing in the
        <span className="text-teal-400"> MERN stack</span>. I enjoy building
        <span className="font-medium text-gray-200">
          scalable, high-performance, and user-friendly{" "}
        </span>
        web applications.
        <br />
        <br />
        My journey started with full-stack development, and I&apos;m currently
        focused on improving my skills I&apos;m always eager to learn new
        technologies and explore areas like{" "}
        <span className="text-blue-400">DevOps, AI, and cybersecurity</span> in
        the future.
        <br />
        <br />
        Apart from coding, I love{" "}
        <span className="italic">solving mathematical problems</span>,
        <span className="italic">exploring new tech</span>, and{" "}
        <span className="italic">photography</span>.
      </motion.p>

      <div className="container relative py-10 w-full flex justify-center">
        <Marquee speed={100} delay={1} className="py-4 opacity-75 w-full">
          <div className="flex items-center space-x-7 md:space-x-14">
            <div className="ml-8 md:ml-10 lg:ml-10 xl:ml-12">
              <IoLogoHtml5 className="text-3xl text-white md:text-5xl" />
            </div>
            <FaCss3Alt className="text-3xl text-white md:text-5xl" />
            <AiOutlineJavaScript className="text-3xl text-white md:text-5xl" />
            <SiTypescript className="text-[25px] text-white md:text-[41px]" />
            <FaReact className="text-3xl text-white md:text-5xl" />
            <RiTailwindCssFill className="text-3xl text-white md:text-5xl" />
            <FaBootstrap className="text-3xl text-white md:text-5xl" />
            <RiNextjsFill className="text-3xl text-white md:text-5xl" />
            <FaNodeJs className="text-3xl text-white md:text-5xl" />
            <SiExpress className="text-3xl text-white md:text-5xl" />
            <TbBrandFramerMotion className="text-3xl text-white md:text-5xl" />
            <FaGithub className="text-3xl text-white md:text-5xl" />
            <DiMongodb className="text-3xl text-white md:text-5xl" />
            <FaAws className="text-3xl text-white md:text-[52px]" />
            <SiKubernetes className="text-3xl text-white md:text-[50px]" />
            <div className="mr-8 md:mr-10 lg:mr-10 xl:mr-12">
              <FaDocker className="text-3xl text-white md:text-[52px]" />
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default About;
