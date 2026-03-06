import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
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
  grades: { grade: string; credits: number; code: string; title: string }[],
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
  const [stepError, setStepError] = useState<string | null>(null);

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
    if (!sessions || sessions.length === 0) return false;

    return sessions.every(({ courses }) =>
      courses.every((c) => !!grades[c.code]),
    );
  };

  const isComplete = allCoursesGraded();

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
    setStep((p) => p + 1);

    console.log("all grades:", allGrades);
  };

  const toStep2 = () => {
    if (!selectedId) {
      setStepError("Please select a department to continue");
      return;
    }

    setStepError(null);
    setStep(2);
  };

  const toStep3 = () => {
    const hasSelectedLevels = Object.keys(selectedLevels).length > 0;
    const hasSelectedSemesters = Object.values(selectedSemesters).some(
      (s) => s.length > 0,
    );

    if (!hasSelectedLevels || !hasSelectedSemesters) {
      setStepError("Please select at least one level and semester to continue");
      return;
    }

    setStepError(null);
    setStep(3);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen pt-20 pb-10 px-4 bg-[#080a08]">
      <div className="w-full max-w-2xl px-6 py-8 sm:p-8 bg-card border border-white/10 rounded-3xl">
        {step === 1 && (
          <div>
            <p className="text-[11px] sm:text-xs text-accent">STEP 01</p>

            <h1 className="text-2xl sm:text-3xl mt-2">
              Select your <br /> <em>Department</em>
            </h1>
            <p className="text-sm text-white/50 mt-2">
              Choose your registered department
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {DEPARTMENTS.map((d: Department) => (
                <button
                  key={d.id}
                  className={`flex flex-col justify-center items-center text-center px-4 py-6 w-full sm:max-w-60 ${
                    selectedId === d.id ? "bg-accent-alpha" : "bg-card"
                  } ${
                    selectedId === d.id ? "border-[#e8ff47]" : "border-white/10"
                  } hover:bg-card/60 border hover:cursor-pointer rounded-2xl transition-all`}
                  onClick={() => {
                    setSelectedId(d.id);
                    setStepError(null);
                  }}
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
              className="w-full border-0 py-3 mt-8 text-sm sm:text-base rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
              onClick={toStep2}
            >
              Continue
            </button>

            {stepError && (
              <p className="text-xs text-center mt-4 text-white/50">
                {stepError}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-[11px] text-xs text-accent">STEP 02</p>

            <h1 className="text-2xl sm:text-3xl mt-2">
              Levels & <br /> <em>Semesters</em>
            </h1>
            <p className="text-[12px] sm:text-sm text-white/50 mt-2">
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
                      } px-2 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border hover:cursor-pointer transition-all`}
                      onClick={() => toggleLevel(lvl.level)}
                    >
                      <span className="text-xs sm:text-sm">{lvl.level}L</span>
                      <span className="text-xs sm:text-sm">
                        {selectedLevels[lvl.level] ? "✓" : "+"}
                      </span>
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
                              className={`w-full max-w-max flex justify-center gap-1 items-center px-4 sm:px-6 py-2 rounded-xl ${
                                active
                                  ? "bg-[#e8ff47] text-black/80 font-semibold"
                                  : "bg-white/5 hover:bg-white/10 text-white/50"
                              } border border-white/10 hover:cursor-pointer transition-all`}
                              onClick={() => {
                                toggleSemester(lvl.level, sem.name);
                                setStepError(null);
                              }}
                            >
                              <span className="text-xs sm:text-sm">
                                {sem.name}
                              </span>
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
                className="w-full flex justify-center gap-1 items-center max-w-1/4 px-3 py-2 sm:py-3 mt-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:cursor-pointer text-white/50 transition-all"
                onClick={() => setStep((p) => p - 1)}
              >
                <ChevronLeft className="size-4 -ml-2 shrink-0" />
                <span className="text-sm">Back</span>
              </button>
              <button
                className="w-full flex justify-center gap-1 items-center border-0 py-2 sm:py-3 mt-8 rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
                onClick={toStep3}
              >
                <span className="text-sm">Enter grades</span>
                <ChevronRight className="size-4" />
              </button>
            </div>

            {stepError && (
              <p className="text-xs text-center mt-4 text-white/50">
                {stepError}
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-xs text-accent">STEP 03</p>

            <h1 className="text-2xl sm:text-3xl mt-2">
              Enter your <br /> <em>Grades</em>
            </h1>
            <p className="text-xs sm:text-sm text-white/50 mt-2">
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
                        className="w-full flex flex-col sm:justify-between sm:px-4 py-4 sm:py-6 bg-white/5 border-white/10 rounded-xl"
                      >
                        <div className="w-full flex flex-col px-4 sm:px-2 sm:flex-row sm:justify-between sm:items-center">
                          <div className="flex flex-col">
                            <p className="text-xs sm:text-sm text-[#e8ff47] uppercase font-semibold">
                              {course.code}
                            </p>
                            <h1 className="text-sm text-white/90">
                              {course.title}
                            </h1>
                            <p className="text-[11px] text-white/50">
                              {course.credits} units
                            </p>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2 sm:px-4 mt-3 sm:mt-0">
                            {GRADES.map((grade) => (
                              <button
                                key={grade}
                                className={`w-8 h-8 sm:w-10 sm:h-10  ${
                                  grades[course.code] === grade
                                    ? "bg-[#e8ff47] text-black font-semibold"
                                    : "text-white/50 bg-white/10 hover:bg-white/20 hover:text-[#e8ff47]"
                                } rounded-xl hover:cursor-pointer transition-all`}
                                onClick={() => setGrade(course.code, grade)}
                              >
                                <span className="text-sm">{grade}</span>
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
                className="w-full flex justify-center gap-1 items-center max-w-1/4 px-3 py-2 sm:py-3 mt-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:cursor-pointer text-white/50 transition-all"
                onClick={() => setStep((prev) => prev - 1)}
              >
                <ChevronLeft className="size-4 -ml-2" />
                <span className="text-sm">Back</span>
              </button>
              <button
                className="w-full flex justify-center gap-1 items-center border-0 py-2 sm:py-3 mt-8 rounded-xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 hover:cursor-pointer text-black transition-all"
                onClick={calculate}
                disabled={!isComplete}
              >
                <span className="text-sm">Calculate CGPA</span>
                <ChevronRight className="size-4 " />
              </button>
            </div>

            {!isComplete && (
              <p className="text-xs text-center mt-4 text-white/50">
                Grade all courses to continue
              </p>
            )}
          </div>
        )}

        {step === 4 && results && (
          <div className="w-full max-w-2xl mx-auto space-y-10">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-xs text-accent tracking-widest">RESULTS</p>
              <h1 className="text-3xl font-semibold text-white">
                Your CGPA Summary
              </h1>
              <p className="text-white/50 text-sm">
                Here's a breakdown of your academic performance
              </p>
            </div>

            {/* CGPA Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center space-y-6">
              <div
                className="w-36 h-36 flex flex-col justify-center items-center rounded-full border-4"
                style={{ borderColor: results.cls.color }}
              >
                <p className="text-xs text-white/50 uppercase">CGPA</p>
                <h1 className="text-4xl font-bold text-white">
                  {results.cgpa.toFixed(2)}
                </h1>
                <p className="text-xs text-white/50">out of 5.00</p>
              </div>

              <div
                className="px-4 sm:px-6 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: results.cls.bg,
                  color: results.cls.color,
                  border: `1px solid ${results.cls.color}`,
                }}
              >
                {results.cls.label}
              </div>
            </div>

            {/* Semester Breakdown */}
            <div className="space-y-4">
              <h2 className="text-white text-lg font-semibold">
                Semester Breakdown
              </h2>

              <div className="space-y-3">
                {results.semesterResults.map(({ lvl, semName, gpa }) => {
                  const cls = getClass(gpa);

                  return (
                    <div
                      key={`${lvl}-${semName}`}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center hover:bg-white/10 transition-all"
                    >
                      <div>
                        <p className="text-sm text-white font-medium">
                          {lvl}L — {semName}
                        </p>
                        <p className="text-xs text-white/50 mt-1">
                          GPA Performance
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-semibold text-white">
                          {gpa.toFixed(2)}
                        </p>
                        <p
                          className="text-xs font-medium mt-1"
                          style={{ color: cls.color }}
                        >
                          {cls.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Start Over Button */}
            <button
              className="w-full flex justify-center gap-2 items-center py-4 rounded-2xl bg-[#e8ff47] hover:bg-[#e8ff47]/80 text-black font-semibold hover:cursor-pointer transition-all"
              onClick={() => {
                setStep(1);
                setSelectedId(null);
                setSelectedLevels({});
                setSelectedSemesters({});
                setGrades({});
                setResults(null);
              }}
            >
              Start Over
              <RefreshCcw className="size-4" />
            </button>
          </div>
        )}
      </div>

      {step === 1 && (
        <div className="flex gap-2 mt-4 text-sm text-white/60">
          <p>
            Don't see your department?
          </p>
          <a href="https://wa.me/2347056776830?text=Hello%20monaski.%20I%20would%20like%20to%20add%20my%20courses%20to%20the%20calculator" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#e8ff47]">Message me</a>
        </div>
      )}

      {step === 2 && (
        <div className="flex gap-2 mt-4 text-sm text-white/60">
          <p>
            Don't see your level?
          </p>
          <a href="https://wa.me/2347056776830?text=Hello%20monaski.%20I%20would%20like%20to%20add%20my%20courses%20to%20the%20calculator" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#e8ff47]">Message me</a>
        </div>
      )}
    </div>
  );
};

export default Calculator;
