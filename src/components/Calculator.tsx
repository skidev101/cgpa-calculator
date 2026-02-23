import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  Code,
  Lightbulb,
  RefreshCcw,
  Server,
} from "lucide-react";
import { DEPARTMENTS } from "../lib/departments";
import type { Department } from "../types";
import { useState } from "react";

interface SemesterResults {
  lvl: number;
  semName: string;
  gpa: number;
  courses: Array<{
    grade: string;
    credits: string;
    code: string;
    title: string;
  }>;
}

interface FinalResults {
  semesterResults: SemesterResults[];
  cgpa: number;
  cls: {
    label: string;
    color: string;
    bg: string;
  };
}

const GRADE_POINTS: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};
const GRADES: string[] = ["A", "B", "C", "D", "E", "F"];

const calcCgpa = (
  grades: { grade: string; credits: number; code: string; title: string }[]
) => {
  let totalPoints = 0,
    totalCredits = 0;
  grades.forEach(({ grade, credits }) => {
    totalPoints += GRADE_POINTS[grade] * credits;
    totalCredits += credits;
  });

  return totalPoints === 0 ? 0 : totalPoints / totalCredits;
};

function getClass(cgpa: number) {
  if (cgpa >= 4.5)
    return { label: "First Class", color: "#22c55e", bg: "#052e16" };
  if (cgpa >= 3.5)
    return { label: "Second Class Upper", color: "#3b82f6", bg: "#0c1a3d" };
  if (cgpa >= 2.4)
    return { label: "Second Class Lower", color: "#f59e0b", bg: "#2d1b00" };
  if (cgpa >= 1.5)
    return { label: "Third Class", color: "#f97316", bg: "#2d0f00" };
  if (cgpa >= 1.0) return { label: "Pass", color: "#8b5cf6", bg: "#1e0b3d" };
  return { label: "Fail", color: "#ef4444", bg: "#2d0000" };
}

const Calculator = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [selectedLevels, setSelectedLevels] = useState<
    Record<number, string[]>
  >({});
  const [selectedSemesters, setSelectedSemesters] = useState<
    Record<number, string[]>
  >({});
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [results, setResults] = useState<FinalResults | null>(null);

  const department = DEPARTMENTS.find((d) => d.id === selectedId);

  const toggleLevel = (lvl: number) => {
    setSelectedLevels((prev) => {
      const updated = { ...prev };

      if (updated[lvl]) {
        delete updated[lvl];

        setSelectedSemesters((prev) => {
          const semCopy = { ...prev };
          delete updated[lvl];
          return semCopy;
        });

        return updated;
      }

      return { ...prev, [lvl]: [] };
    });
  };

  const toggleSemester = (lvl: number, semName: string) => {
    setSelectedSemesters((prev) => {
      const current = prev[lvl] || [];
      return {
        ...prev,
        [lvl]: current.includes(semName)
          ? current.filter((s) => s !== semName)
          : [...current, semName],
      };
    });
  };

  const getActiveSessions = () => {
    if (!department) return;

    const sessions: {
      lvl: number;
      semName: string;
      courses: any[];
    }[] = [];

    Object.entries(selectedSemesters).forEach(([lvlKey, semNames]) => {
      const lvl = Number(lvlKey);

      const level = department.levels.find((l) => l.level === lvl);
      if (!level) return;

      semNames.forEach((semName) => {
        const sem = level.semesters.find((s) => s.name === semName);
        if (!sem) return;

        sessions.push({
          lvl,
          semName,
          courses: sem.courses,
        });
      });
    });

    return sessions;
  };

  const setGrade = (courseCode: string, grade: string) => {
    setGrades((prev) => ({ ...prev, [courseCode]: grade }));
  };

  const allCoursesGraded = () => {
    const sessions = getActiveSessions();
    return sessions?.every(({ courses }) => {
      courses.every((c) => grades[c.code]);
    });
  };

  const calculate = () => {
    const sessions = getActiveSessions();
    const semesterResults: SemesterResults[] = [];
    let allGrades: any = [];

    sessions?.forEach(({ lvl, semName, courses }) => {
      const gradeList = courses.map((c) => ({
        grade: grades[c.code],
        credits: c.credits,
        code: c.code,
        title: c.title,
      }));
      const gpa = calcCgpa(gradeList);
      semesterResults.push({ lvl, semName, gpa, courses: gradeList });
      allGrades.push(...gradeList);
    });

    const cgpa = calcCgpa(allGrades);
    setResults({ semesterResults, cgpa, cls: getClass(cgpa) });
    setStep(4);

    console.log("all grades:", allGrades);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#080a08]">
      <div className="p-8 bg-card border border-white/10 rounded-3xl">
        {step === 1 && (
          <div>
            <p className="text-xs text-accent">STEP 01</p>

            <h1 className="text-3xl mt-2">
              Select your <br /> <em>Department</em>
            </h1>
            <p className="text-white/50 mt-2">
              Choose your registered department
            </p>

            <div className="flex gap-4 mt-6">
              {DEPARTMENTS.map((d: Department) => (
                <button
                  key={d.id}
                  className={`flex flex-col justify-center items-center text-center px-4 py-6 w-full max-w-40 ${
                    selectedId === d.id ? "bg-accent-alpha" : "bg-card"
                  } ${
                    selectedId === d.id ? "border-[#e8ff47]" : "border-white/10"
                  } hover:bg-card/60 border hover:cursor-pointer rounded-2xl transition-all`}
                  onClick={() => setSelectedId(d.id)}
                >
                  {d.id === "dts" ? (
                    <BarChart3 className="size-6 text-accent" />
                  ) : d.id === "cpt" ? (
                    <Code className="size-6 text-accent" />
                  ) : d.id === "ift" ? (
                    <Server className="size-6 text-accent" />
                  ) : (
                    <Lightbulb className="size-6 text-accent" />
                  )}

                  <p className="text-sm mt-4">{d.name}</p>
                  <p className="text-xs text-white/50 mt-2">
                    {d.levels.length} levels
                  </p>
                  {selectedId === d.id && (
                    <p className="text-xs text-accent mt-4">Selected</p>
                  )}
                </button>
              ))}
            </div>

            <button
              className="w-full border-0 py-3 mt-8 rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs text-accent">STEP 02</p>

            <h1 className="text-3xl mt-2">
              Levels & <br /> <em>Semesters</em>
            </h1>
            <p className="text-white/50 mt-2">
              Select the levels and semester you want included in your CGPA
            </p>

            <div className="flex flex-col gap-4 mt-6">
              {department?.levels.map((lvl: any) => {
                console.log("department level:", lvl);
                return (
                  <div key={lvl.level} className="flex items-center gap-2">
                    <button
                      className={`w-full max-w-max flex justify-center gap-1 items-center ${
                        selectedLevels[lvl.level]
                          ? "border-[#e8ff47] text-[#e8ff47]"
                          : "border-white/10 text-white/50"
                      } px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border hover:cursor-pointer transition-all`}
                      onClick={() => toggleLevel(lvl.level)}
                    >
                      <span>{lvl.level}L</span>
                      <span>{selectedLevels[lvl.level] ? "✓" : "+"}</span>
                    </button>

                    {selectedLevels[lvl.level] && (
                      <div className="flex items-center gap-2">
                        {lvl.semesters.map((sem: any) => {
                          const active = (
                            selectedSemesters[lvl.level] || []
                          ).includes(sem.name);

                          return (
                            <button
                              key={sem.name}
                              className={`w-full max-w-max flex justify-center gap-1 items-center px-6 py-2 rounded-xl ${
                                active
                                  ? "bg-[#e8ff47] text-black/80 font-semibold"
                                  : "bg-white/5 hover:bg-white/10 text-white/50"
                              } border border-white/10 hover:cursor-pointer transition-all`}
                              onClick={() =>
                                toggleSemester(lvl.level, sem.name)
                              }
                            >
                              {sem.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 items-center">
              <button
                className="w-full flex justify-center gap-1 items-center max-w-1/4 py-3 mt-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:cursor-pointer text-white/50 transition-all"
                onClick={() => setStep((prev) => prev - 1)}
              >
                <ChevronLeft className="size-4 -ml-2" />
                Back
              </button>
              <button
                className="w-full flex justify-center gap-1 items-center border-0 py-3 mt-8 rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
                onClick={() => setStep((prev) => prev + 1)}
              >
                Enter grades
                <ArrowRight className="size-4 " />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-xs text-accent">STEP 03</p>

            <h1 className="text-3xl mt-2">
              Enter your <br /> <em>Grades</em>
            </h1>
            <p className="text-white/50 mt-2">
              Select your grade for each course.
              <br /> A=5, B=4, C=3, D=2, E=1, F=0
            </p>

            <div className="w-full max-h-100 flex flex-col overflow-y-scroll gap-4 mt-6">
              {getActiveSessions()?.map(({ lvl, semName, courses }) => (
                <div key={`${lvl}-${semName}`} className="w-full flex flex-col">
                  <div className="text-[#e8ff47] uppercase font-semibold text-sm border-b border-[#e8ff47]/20">
                    {lvl}L — {semName} Semester
                  </div>

                  <div className="flex flex-col gap-4 mt-4">
                    {courses.map((course) => (
                      <div
                        key={course.code}
                        className="w-full flex justify-between px-4 py-6 bg-white/5 border-white/10 rounded-xl"
                      >
                        <div className="w-full flex justify-between items-center gap-4">
                          <div className="flex flex-col">
                            <p className="text-[#e8ff47] uppercase font-semibold text-sm">
                              {course.code}
                            </p>
                            <h1 className="text-white/90">{course.title}</h1>
                            <p className="text-xs text-white/50">
                              {course.credits} units
                            </p>
                          </div>

                          <div className="flex items-center gap-2 px-4">
                            {GRADES.map((grade) => (
                              <button
                                key={grade}
                                className={`w-10 h-10  ${
                                  grades[course.code] === grade
                                    ? "bg-[#e8ff47] text-black font-semibold"
                                    : "text-white/50 bg-white/10 hover:bg-white/20 hover:text-[#e8ff47]"
                                } rounded-xl hover:cursor-pointer transition-all`}
                                onClick={() => setGrade(course.code, grade)}
                              >
                                {grade}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <button
                className="w-full flex justify-center gap-1 items-center max-w-1/4 py-3 mt-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:cursor-pointer text-white/50 transition-all"
                onClick={() => setStep((prev) => prev - 1)}
              >
                <ChevronLeft className="size-4 -ml-2" />
                Back
              </button>
              <button
                className="w-full flex justify-center gap-1 items-center border-0 py-3 mt-8 rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
                onClick={calculate}
                disabled={!allCoursesGraded()}
              >
                Calculate CGPA
                <ArrowRight className="size-4 " />
              </button>
            </div>

            {!allCoursesGraded && (
              <p className="text-center mt-4 text-white/50">
                Grade all courses to continue
              </p>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-xs text-accent">RESULTS</p>

            <div className="w-full flex justify-center items-center ">
              <div
                className={`w-20 h-20 flex flex-col justify-center items-center rounded-full ring-2 ring-[${results?.cls.color}]`}
              >
                <p>CGPA</p>
                <h1>{results?.cgpa.toFixed(2)}</h1>
                <p>out of 5.00</p>
              </div>

              <div
                className={`px-2 py-4 rounded-full bg-[${results?.cls.bg}] border border-[${results?.cls.bg}]`}
              >
                {results?.cls.label}
              </div>
            </div>


            <p>SEMESTER BREAKDOWN</p>

            <div className="flex flex-col gap-2">
              {results?.semesterResults.map(({ lvl, semName, gpa, courses }) => {
                const cls = getClass(gpa);

                 return (
                  <div key={`${lvl}-${semName}`} className="w-full flex justify-between px-4 py-6 bg-white/5 border-white/10 rounded-xl">
                    <div>
                      <p className="text-md text-white/80">{lvl} - {semName}</p>

                    </div>
                    
                  </div>
                 )
              })}
            </div>

            <div className="flex gap-2 items-center">
              <button
                className="w-full flex justify-center gap-1 items-center border-0 py-3 mt-8 rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
                onClick={() => console.log("start over btn clicked")}
              >
                Start over
                <RefreshCcw className="size-4 " />
              </button>
            </div>

            {!allCoursesGraded && (
              <p className="text-center mt-4 text-white/50">
                Grade all courses to continue
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
