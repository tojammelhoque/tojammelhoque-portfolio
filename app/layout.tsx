import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Tojammel Hoque | Full-Stack Developer",
  description:
    "Full-stack web developer specializing in MERN stack development. Building high-performance, scalable, and user-friendly web applications.",
  keywords: [
    "Full-Stack Developer",
    "MERN Stack",
    "Web Developer",
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
  ],
  openGraph: {
    title: "Tojammel Hoque | Full-Stack Developer",
    description:
      "Full-stack web developer specializing in MERN stack development. Building high-performance, scalable, and user-friendly web applications.",
    url: "https://tojammelhoque.com",
    siteName: "Tojammel Hoque Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tojammel Hoque | Full-Stack Developer",
    description:
      "Full-stack web developer specializing in MERN stack development. Building high-performance, scalable, and user-friendly web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="py-5">
          <Navbar />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
