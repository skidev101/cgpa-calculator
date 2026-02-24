import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#080a08] border-t border-white/10 py-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-lg">
            <span className="text-[#e8ff47]">◈</span>
            <span className="text-white">
              <em className="font-bold">CGPA</em>calc
            </span>
          </div>

          <p className="text-white/50 text-sm text-center">
            ~ Built for lazy nerds
          </p>
          <p className="text-white/40 text-xs mt-4">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <a
            href="https://github.com/skidev101/cgpa-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#e8ff47] hover:text-white font-mono hover:cursor-pointer transition-all"
          >
            Source code
          </a>
        </div>
      </div>

      {/* <p>Built for lazy students who want to calculate their CGPA without the hassle of using a calculator or spreadsheet. Just select your levels, semesters, and courses, and let the magic happen!</p> */}
    </footer>
  );
};

export default Footer;
