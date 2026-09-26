"use client";
import { useState } from "react";
import SiteHeader from "@/app/components/SiteHeader";
import BackButton from "../components/BackButton";
import styles from "./gpa.module.css";

type Course = {
  id: number;
  credits: number;
  grade: string;
  repeated: boolean;
  previousGrade: string;
};

const gradePoints: Record<string, number> = {
  A: 4.0,
  "A-": 3.75,
  "B+": 3.5,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.0,
  "C-": 1.75,
  "D+": 1.5,
  D: 1.0,
  "D-": 0.75,
  F: 0,
};

export default function GPA() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const isArabic = language === "ar";

  const [currentGPA, setCurrentGPA] = useState("");
  const [currentCredits, setCurrentCredits] = useState("");

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      credits: 3,
      grade: "A",
      repeated: false,
      previousGrade: "C",
    },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        credits: 3,
        grade: "A",
        repeated: false,
        previousGrade: "C",
      },
    ]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const updateCourse = (
    id: number,
    field: keyof Course,
    value: string | number | boolean
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? { ...course, [field]: value }
          : course
      )
    );
  };

  const calculateGPA = () => {
    const oldGPA = Number(currentGPA);
    const oldCredits = Number(currentCredits);

    if (
      !currentGPA ||
      !currentCredits ||
      !Number.isFinite(oldGPA) ||
      !Number.isFinite(oldCredits) ||
      oldCredits <= 0 ||
      oldGPA < 0 ||
      oldGPA > 4
    ) {
      return "0.00";
    }

    let totalPoints = oldGPA * oldCredits;
    let totalCredits = oldCredits;

    courses.forEach((course) => {
      const newPoints = gradePoints[course.grade];
      const credits = Number(course.credits);

      if (course.repeated) {
        const oldPoints = gradePoints[course.previousGrade];

        totalPoints =
          totalPoints -
          oldPoints * credits +
          newPoints * credits;
      } else {
        totalPoints += newPoints * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits === 0) {
      return "0.00";
    }

    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    
    <>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      <main className={styles.container} dir={isArabic ? "rtl" : "ltr"}>
      <BackButton language={language} />
      <div className={styles.header}>
        <h1>{isArabic ? "حاسبة المعدل التراكمي" : "GPA Calculator"}</h1>
        <p>
          {isArabic
            ? "احسب معدلك التراكمي في الجامعة الأردنية"
            : "Calculate your University of Jordan GPA"}
        </p>
      </div>

      <div className={styles.card}>

        <div className={styles.currentGPA}>
          <h2>{isArabic ? "المعدل التراكمي الحالي" : "Current Cumulative GPA"}</h2>

          <div className={styles.currentInputs}>

            <div>
              <label htmlFor="current-gpa">
                {isArabic ? "المعدل الحالي" : "Current GPA"}
              </label>

              <input
                type="number"
                id="current-gpa"
                inputMode="decimal"
                min="0"
                max="4"
                step="0.01"
                placeholder="3.00"
                value={currentGPA}
                onChange={(e) =>
                  setCurrentGPA(e.target.value)
                }
              />
            </div>

            <div>
              <label htmlFor="completed-credits">
                {isArabic ? "الساعات المعتمدة المنجزة" : "Completed Credit Hours"}
              </label>

              <input
                type="number"
                id="completed-credits"
                inputMode="numeric"
                min="1"
                step="1"
                placeholder="30"
                value={currentCredits}
                onChange={(e) =>
                  setCurrentCredits(e.target.value)
                }
              />
            </div>

          </div>
        </div>

        <div className={styles.tableHeader}>
          <span>{isArabic ? "الساعات المعتمدة" : "Credit Hours"}</span>
          <span>{isArabic ? "التقدير" : "Grade"}</span>
          <span>{isArabic ? "مادة معادة؟" : "Repeated?"}</span>
          <span></span>
        </div>

        {courses.map((course) => (
          <div
            className={styles.courseRow}
            key={course.id}
          >

            <select
              value={course.credits}
              onChange={(e) =>
                updateCourse(
                  course.id,
                  "credits",
                  Number(e.target.value)
                )
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>

            <select
              value={course.grade}
              onChange={(e) =>
                updateCourse(
                  course.id,
                  "grade",
                  e.target.value
                )
              }
            >
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="D-">D-</option>
              <option value="F">F</option>
            </select>

            <select
              value={course.repeated ? "yes" : "no"}
              onChange={(e) =>
                updateCourse(
                  course.id,
                  "repeated",
                  e.target.value === "yes"
                )
              }
            >
              <option value="no">{isArabic ? "لا" : "No"}</option>
              <option value="yes">{isArabic ? "نعم" : "Yes"}</option>
            </select>

            {course.repeated && (
              <select
                value={course.previousGrade}
                onChange={(e) =>
                  updateCourse(
                    course.id,
                    "previousGrade",
                    e.target.value
                  )
                }
              >
                <option value="C+">{isArabic ? "التقدير السابق: C+" : "Previous: C+"}</option>
                <option value="C">{isArabic ? "التقدير السابق: C" : "Previous: C"}</option>
                <option value="C-">{isArabic ? "التقدير السابق: C-" : "Previous: C-"}</option>
                <option value="D+">{isArabic ? "التقدير السابق: D+" : "Previous: D+"}</option>
                <option value="D">{isArabic ? "التقدير السابق: D" : "Previous: D"}</option>
                <option value="D-">{isArabic ? "التقدير السابق: D-" : "Previous: D-"}</option>
                <option value="F">{isArabic ? "التقدير السابق: F" : "Previous: F"}</option>
              </select>
            )}

            {courses.length > 1 && (
              <button
                className={styles.removeButton}
                onClick={() =>
                  removeCourse(course.id)
                }
              >
                {isArabic ? "حذف" : "Remove"}
              </button>
            )}

          </div>
        ))}

        <button
          className={styles.addButton}
          onClick={addCourse}
        >
          {isArabic ? "+ إضافة مادة" : "+ Add Course"}
        </button>

        <div className={styles.result}>
          <p>{isArabic ? "معدلك التراكمي الجديد" : "Your New GPA"}</p>

          <h2>{calculateGPA()}</h2>

          <span>{isArabic ? "من 4.00" : "Out of 4.00"}</span>
        </div>

      </div>
      </main>
    </>
  );
}