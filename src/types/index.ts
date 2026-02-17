export type Grade = "A" | "B" | "C" | "D" | "F";

interface Course {
  code: string;
  title: string;
  credits: number;
}

interface Semester {
  name: "First" | "Second";
  courses: Course[];
}

interface Level {
  level: 100 | 200 | 300 | 400 | 500;
  semesters: Semester[];
}

export interface Department {
  id: string;
  name: string;
  levels: Level[]
}