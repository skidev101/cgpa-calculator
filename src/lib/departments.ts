import type { Department } from "../types";

export const departments: Department[] = [
  {
    id: "DTS",
    name: "Data Science",
    levels: [
      {
        level: 100,
        semesters: [
          {
            name: "First",
            courses: [
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "MAT101", title: "Intro to Maath Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
            ],
          },

          {
            name: "Second",
            courses: [
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "MAT101", title: "Intro to Math Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
            ],
          },
        ],
      },

      {
        level: 200,
        semesters: [
          {
            name: "First",
            courses: [
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "MAT101", title: "Intro to Maath Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
            ],
          },

          {
            name: "Second",
            courses: [
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "MAT101", title: "Intro to Math Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
              { code: "DTS121", title: "Intro to Data Science", credits: 3 },
            ],
          },
        ],
      },
    ],
  },
];
