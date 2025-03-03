"use client";

import { BoxReveal } from "./magicui/box-reveal";

import { FaArrowRight } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function HeroSection() {
  const downloadResume = () => {
    const resumePath = "/TojammelHoque.pdf";
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "TojammelHoque.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleContactClick = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.location.href = "mailto:contact@tojammelhoque.com";
    } else {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=contact@tojammelhoque.com",
        "_blank"
      );
    }
  };

  return (
    <section
      id="home"
      className="relative mt-0  flex flex-col items-center justify-center overflow-hidden py-10 md:py-0 h-auto md:h-screen"
    >
      {/* hero content */}
      <div className="container relative z-20 mx-auto px-4 text-center flex flex-col items-center justify-center mb-10 md:mb-0">
        <BoxReveal boxColor="#ccc" duration={0.75}>
          <h1 className="mt-10 md:mt-0 text-2xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Hi, I&apos;m Tojammel Hoque
          </h1>
        </BoxReveal>
        <BoxReveal boxColor="#ccc" duration={0.75}>
          <p className="mt-4 text-sm md:text-lg text-neutral-300 max-w-2xl mx-auto">
            A passionate{" "}
            <span className="font-semibold text-white">
              Full-Stack Web Developer
            </span>{" "}
            with expertise in the{" "}
            <span className="text-teal-400">MERN stack</span>. I love building{" "}
            <span className="font-medium text-gray-200">
              high-performance, scalable, and user-friendly
            </span>{" "}
            web applications.
          </p>
        </BoxReveal>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "linear" }}
        className="text-3xl md:text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 md:py-5 mb-4"
      >
        Let&apos; Connect
      </motion.h1>
      <motion.div className="contact-section flex justify-center gap-4 mt-2">
        {/* contact button */}
        <motion.button
          onClick={() => handleContactClick()}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="relative text-sm md:text-base font-medium border-2 border-neutral-50 px-6 py-3 rounded-full flex items-center gap-2 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white w-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          <span className="relative z-10 text-white transition-colors duration-300 group-hover:text-black">
            Contact Me
          </span>
          <FaArrowRight className="relative z-10 text-white transition-colors duration-300 group-hover:text-black" />
        </motion.button>
        {/* cv button */}
        <motion.button
          onClick={downloadResume}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="relative text-sm md:text-base font-medium px-6 py-3 rounded-full bg-white flex items-center gap-2 text-black overflow-hidden border border-transparent transition-all duration-300 ease-in-out group hover:border-white"
        >
          <span className="absolute inset-0 bg-black w-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
            Download CV
          </span>
          <GoDownload className="relative z-10 text-black transition-colors duration-300 group-hover:text-white" />
        </motion.button>
      </motion.div>
      <div className="flex flex-col items-center justify-center mt-10 text-white">
        <h3 className="text-2xl font-bold">Get In Touch</h3>
        <div className="flex gap-5 py-4">
          <a href="https://github.com/TojammelHoque" target="_blank">
            <FaGithub className="text-3xl " />
          </a>
          <a href="https://www.linkedin.com/in/tojammelhoque/" target="_blank">
            <FaLinkedin className="text-3xl " />
          </a>
          <a href="https://twitter.com/_tojammelhoque" target="_blank">
            <FaTwitter className="text-3xl " />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
