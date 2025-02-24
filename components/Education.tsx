
"use client";

import React from "react";

interface CollegeEducation {
  startDate: string;
  endDate: string;
  collegeName: string;
  courseName: string;
  address: string;
}

interface SchoolEducation {
  startDate: string;
  endDate: string;
  schoolName: string;
  courseName: string;
  address: string;
}

type Education = CollegeEducation | SchoolEducation;

const EducationData: Education[] = [
  {
    startDate: "2022",
    endDate: "Expected Graduation in 2025",
    collegeName: "Krishnath College",
    courseName: "B.Sc. (Hons.) in Mathematics",
    address: "Berhampore, West Bengal",
  },
  {
    startDate: "2018",
    endDate: "2020",
    schoolName: "Rukapur High School (H.S.)",
    address: "Rukapur, West Bengal",
    courseName:
      "12th Science (PCMB - Physics, Chemistry, Mathematics, Biology)",
  },
];

function Education() {
  return (
    <div
      id="education"
      className="flex flex-col gap-4 w-full px-2 bg-black text-white p-6"
    >
      <h1 className="text-2xl font-bold">Education</h1>

      <ol className="relative border-s border-gray-500">
        {EducationData.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === EducationData.length - 1 ? "mb-0" : ""
            }`}
          >
            <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400">
              {item.startDate} - {item.endDate || "Present"}
            </time>
            <h3 className="text-lg font-semibold text-white">
              {item.courseName} at{" "}
              {"collegeName" in item ? item.collegeName : item.schoolName}
            </h3>
            <p className="text-sm text-gray-400">{item.address}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Education;
