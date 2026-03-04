# CGPAcalc: Comprehensive Grade Point Average Calculator 📊

## Overview
CGPAcalc is a sleek and intuitive web application built with **React** and **TypeScript** that simplifies the process of calculating your Cumulative Grade Point Average (CGPA) and semester GPAs. Designed for students, it offers a multi-step workflow to easily input grades and visualize academic performance.

## Features
-   **Intuitive Multi-Step Workflow**: Guides users seamlessly through department, level, and semester selection.
-   **Dynamic Grade Input**: Provides an easy-to-use interface for entering grades (A, B, C, D, E, F) for individual courses across selected semesters.
-   **Accurate CGPA Calculation**: Precisely computes both overall Cumulative Grade Point Average and individual semester GPAs based on standard grading scales.
-   **Academic Class Classification**: Automatically assigns academic classifications such as First Class, Second Class Upper, Second Class Lower, Third Class, or Pass based on the calculated CGPA.
-   **Responsive User Interface**: Crafted with **Tailwind CSS** to ensure a beautiful and functional experience across all devices, from desktops to mobile phones.
-   **Modular Component Design**: Utilizes React's component-based architecture for enhanced maintainability, scalability, and reusability of UI elements.

## Getting Started

### Installation
To get a local copy up and running, follow these simple steps.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/skidev101/cgpa-calculator.git
    ```
2.  **Navigate to Project Directory**:
    ```bash
    cd cgpa-calculator
    ```
3.  **Install Dependencies**:
    ```bash
    npm install # Or use yarn install if you prefer yarn
    ```

### Usage
Once the project is set up, you can start the development server and interact with the CGPA calculator.

1.  **Start the Development Server**:
    ```bash
    npm run dev # Or yarn dev
    ```
    This will launch the application, typically accessible at `http://localhost:5173/`.

2.  **Select Your Department**:
    On the first step, choose your academic department from the provided list. This helps tailor the course structure for subsequent steps.

3.  **Choose Levels & Semesters**:
    Proceed to the second step to select the specific academic levels (e.g., 100L, 200L) and semesters (First, Second) you wish to include in your CGPA calculation.

4.  **Enter Your Grades**:
    In the third step, you will see a list of courses from your selected levels and semesters. For each course, select your corresponding grade (A, B, C, D, E, F) using the interactive buttons. The application follows a standard 5-point grading scale (A=5, B=4, C=3, D=2, E=1, F=0).

5.  **Calculate CGPA**:
    After entering all your grades, click the "Calculate CGPA" button. The application will then display your comprehensive results.

6.  **Review Your Results**:
    The final step presents a summary of your academic performance, including your overall CGPA, the academic class you fall into (e.g., First Class, Second Class Upper), and a detailed breakdown of your GPA for each selected semester. You can click "Start Over" to perform a new calculation.

## Technologies Used

| Technology       | Description                                              |
| :--------------- | :------------------------------------------------------- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)         | A JavaScript library for building user interfaces.       |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | A typed superset of JavaScript that compiles to plain JavaScript. |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)           | Next Generation Frontend Tooling.                        |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) | A utility-first CSS framework for rapid UI development.  |
| Lucide React     | A beautiful and simply designed icon library for React.  |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)         | Pluggable JavaScript linter.                             |

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:
*   🍴 Fork the repository to your GitHub account.
*   🌿 Create a new branch for your feature or bugfix: `git checkout -b feature/AmazingFeature`.
*   💻 Make your changes and ensure they adhere to the project's coding standards.
*   ✅ Commit your changes with a clear and descriptive message: `git commit -m 'feat: Add amazing new feature'`.
*   🚀 Push your branch to your forked repository: `git push origin feature/AmazingFeature`.
*   📥 Open a Pull Request from your branch to the `main` branch of this repository, describing your changes.

## Author
**skidev101**

*   **X (Twitter)**: [Your X Profile](https://x.com/monaski_)

---

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/skidev101/cgpa-calculator/actions)
[![GitHub stars](https://img.shields.io/github/stars/skidev101/cgpa-calculator?style=social)](https://github.com/skidev101/cgpa-calculator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/skidev101/cgpa-calculator?style=social)](https://github.com/skidev101/cgpa-calculator/network/members)

