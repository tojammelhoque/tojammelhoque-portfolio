"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Education", hash: "#education" },
];

function Navbar() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [activeSection, setActiveSection] = useState("");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  const handleScroll = (hash: string) => {
    const section = document.querySelector(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(hash);
      setTimeOfLastClick(Date.now());
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const currentTime = Date.now();
      if (currentTime - timeOfLastClick < 1000) return;

      let currentSection = "";
      links.forEach(({ hash }) => {
        const section = document.querySelector(hash);
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top < window.innerHeight / 2) {
            currentSection = hash;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [timeOfLastClick]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-md">
      <ul
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        className="relative mx-auto flex w-fit  rounded-full border-2 border-white bg-black p-1 mt-10"
      >
        {links.map(({ name, hash }) => (
          <Tab
            key={hash}
            hash={hash}
            setPosition={setPosition}
            onClick={handleScroll}
            active={activeSection === hash}
          >
            {name}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  );
}

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  onClick: (hash: string) => void;
  hash: string;
  active: boolean;
}

const Tab: React.FC<TabProps> = ({
  children,
  setPosition,
  onClick,
  hash,
  active,
}) => {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={() => onClick(hash)}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base ${
        active ? "font-bold " : ""
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 h-7 rounded-full bg-white mix-blend-difference md:h-12"
    />
  );
};

export default Navbar;
