import type { Department } from "../types";

export const DEPARTMENTS: Department[] = [
  {
    id: "dts",
    name: "Data Science",
    levels: [
      {
        level: 100,
        semesters: [
          {
            name: "First",
            courses: [
              { code: "MAT101", title: "Elementary Mathematics 1", credits: 2 },
              { code: "PHY101", title: "General physics 1", credits: 2 },
              { code: "PHY107", title: "General Practical Physics 1", credits: 1 },
              { code: "GST111", title: "Communication in English", credits: 2 },
              { code: "STA121", title: "Descriptive Statistics", credits: 3 },
              { code: "COS101", title: "Intro to Computing Science", credits: 3 },
              { code: "FUTM-DTS111", title: "Probability 1", credits: 2 },
              { code: "FUTM-DTS112", title: "Statistical Inference 1", credits: 2 },
            ],
          },

          {
            name: "Second",
            courses: [
              { code: "GST112", title: "Nigerian People and Culture", credits: 2 },
              { code: "MAT102", title: "Elementary Mathematics 2", credits: 2 },
              { code: "PHY102", title: "General physics 2", credits: 2 },
              { code: "PHY108", title: "General Practical Physics 2", credits: 1 },
              { code: "COS102", title: "Problem Solving", credits: 3 },
              { code: "FUTM-DTS121", title: "Statistical Computing 1", credits: 2 },
              { code: "FUTM-DTS123", title: "Probability 2", credits: 2 },
              { code: "FUTM-DTS124", title: "Fundamentals of Data Structures", credits: 3 },
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
              { code: "ENT211", title: "Entrepreneurship and Innovation", credits: 2 },
              { code: "MAT201", title: "Mathematical Methods 1", credits: 2 },
              { code: "MAT203", title: "Sets, Logic and Algebra 1", credits: 2 },
              { code: "COS201", title: "Computer Programming 1", credits: 3 },
              { code: "DTS201", title: "Intro to Data Science", credits: 2 },
              { code: "DTS211", title: "Intro to R Programming", credits: 2 },
              { code: "CYB201", title: "Intro to Cyber Security and Strategy", credits: 2 },
            ],
          },

          {
            name: "Second",
            courses: [
              { code: "GST212", title: "Philosophy, Logic and Human Existence", credits: 2 },
              { code: "MAT209", title: "Intro to Numerical Analysis", credits: 2 },
              { code: "COS202", title: "Computer Programming 2", credits: 3 },
              { code: "DTS204", title: "Statistical Computing Inference and Modelling", credits: 3 },
              { code: "CSC203", title: "Discrete Structures", credits: 2 },
              { code: "FUTM-DTS211", title: "Statistical Computing 2", credits: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    "id": "cpt",
    "name": "Computer Science",
    "levels": [
      {
        "level": 100,
        "semesters": [
          {
            "name": "First",
            "courses": [
              { "code": "GST111", "title": "Communication in English", "credits": 2 },
              { "code": "MTH101", "title": "Elementary Mathematics I", "credits": 3 },
              { "code": "PHY101", "title": "General Physics I", "credits": 2 },
              { "code": "PHY107", "title": "General Practical Physics I", "credits": 1 },
              { "code": "COS101", "title": "Introduction to Computing Sciences", "credits": 3 },
              { "code": "FUTM-CPT111", "title": "Probability for Computer Science", "credits": 3 },
              { "code": "FUTM-CPT112", "title": "Front-End Web Development", "credits": 3 }
            ]
          },
          {
            "name": "Second",
            "courses": [
              { "code": "GST112", "title": "Nigerian Peoples & Culture", "credits": 2 },
              { "code": "MTH102", "title": "Elementary Mathematics II", "credits": 3 },
              { "code": "PHY102", "title": "General Physics II", "credits": 2 },
              { "code": "PHY108", "title": "General Practical Physics II", "credits": 1 },
              { "code": "STA 111", "title": "Descriptive Statistics", "credits": 3 },
              { "code": "COS102", "title": "Introduction to Problem Solving", "credits": 3 },
              { "code": "FUTM-CPT122", "title": "Introduction to Computer Hardware", "credits": 3 }
            ]
          }
        ]
      },
      {
        "level": 200,
        "semesters": [
          {
            "name": "First",
            "courses": [
              { "code": "GST 212", "title": "Philosophy, Logic and Human Existence", "credits": 2 },
              { "code": "ENT 211", "title": "Entrepreneurship and Innovation", "credits": 2 },
              { "code": "MTH 201", "title": "Mathematical Methods I", "credits": 2 },
              { "code": "COS 201", "title": "Computer Programming I", "credits": 3 },
              { "code": "IFT 211", "title": "Digital Logic Design", "credits": 2 },
              { "code": "SEN 201", "title": "Introduction to Software Engineering", "credits": 2 },
              { "code": "FUTM-CPT 211", "title": "Back -End Web Development", "credits": 2 },
              { "code": "FUTM-CPT 212", "title": "Inferential Statistics for Computer Science", "credits": 2 }
            ]
          },
          {
            "name": "Second",
            "courses": [
              { "code": "MTH 202", "title": "Elementary Differential Equations", "credits": 2 },
              { "code": "COS 202", "title": "Computer Programming II", "credits": 3 },
              { "code": "CSC 203", "title": "Discrete Structures", "credits": 2 },
              { "code": "IFT 212", "title": "Computer Architecture and Organization", "credits": 2 },
              { "code": "FUTM-CPT 221", "title": "Numerical Computation for Computer Science", "credits": 2 },
              { "code": "FUTM-CPT 222", "title": "Server-Side Web Development", "credits": 3 },
              { "code": "FUTM-CPT 223", "title": "System Concept and Design", "credits": 3 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ift",
    name: "Information Technology",
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
