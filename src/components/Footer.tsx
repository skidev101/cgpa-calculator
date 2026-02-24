import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#080a08] border-t border-white/10 py-8">
      <div className="sm:max-w-5xl sm:mx-auto flex flex-col px-4 md:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-lg">
            <span className="text-[#e8ff47]">◈</span>
            <span className="text-white">
              <em className="font-bold">CGPA</em>calc
            </span>
          </div>

          <p className="text-white/50 text-sm text-left sm:text-center">
            ~ Built for lazy nerds
          </p>
          <p className="hidden sm:block text-white/40 text-xs mt-4">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        <div className="flex flex-col gap-2 text-center mt-4 sm:mt-0">
          <a
            href="https://github.com/skidev101/cgpa-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#e8ff47] hover:text-white font-mono hover:cursor-pointer transition-all"
          >
            Source code
            <Github className="size-4 ml-1 inline" />
          </a>
        </div>
      </div>

      <p className="block text-center sm:hidden text-white/40 text-xs mt-1">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>

      {/* <p>Built for lazy students who want to calculate their CGPA without the hassle of using a calculator or spreadsheet. Just select your levels, semesters, and courses, and let the magic happen!</p> */}
    </footer>
  );
};

export default Footer;
