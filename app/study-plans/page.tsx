"use client";
import SiteHeader from "@/app/components/SiteHeader";
import BackButton from "../components/BackButton";
import { useState } from "react";
import styles from "./study-plans.module.css";

const faculties = [
  {
    id: "kasit",
    name: "King Abdullah II School of Information Technology",
    nameAr: "كلية الملك عبدالله الثاني لتكنولوجيا المعلومات",
    majors: [
      {
        name: "Business Information Technology",
        nameAr: "تكنولوجيا معلومات الأعمال",
       

      },
      {
         name: "Computer Science",
        nameAr: "علوم الحاسوب",
      },
      {
         name: "Computer Information Systems",
        nameAr: "أنظمة المعلومات الحاسوبية",
      },
    {

      name: "Artificial Intelligence",
        nameAr: "الذكاء الاصطناعي",
    }
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    nameAr: "كلية الهندسة",
    majors: 
    
    [
      {
        name: "Civil Engineering",
        nameAr: "الهندسة المدنية",},
      {
        name: "Electrical Engineering",
        nameAr: "الهندسة الكهربائية", 
      },
      {
        name: "Mechanical Engineering", 
        nameAr: "الهندسة الميكانيكية",
      },
      {
        name: "Industrial Engineering",
        nameAr: "الهندسة الصناعية",
      },
      {
        name: "Computer Engineering",
        nameAr: "هندسة الحاسوب",
      },
      {
        name: "Mechatronics Engineering",
        nameAr: "هندسة الميكاترونيكس",
      },
      {
        name: "Architectural Engineering",
        nameAr: "هندسة العمارة",  
      },
      {
        name: "Chemical Engineering",
        nameAr: "الهندسة الكيميائية",
      }

    ],
  },
  {
    id: "business",
    name: "Business",
    nameAr: "كلية الأعمال",
    majors: [
      {
        name: "Business Administration",
        nameAr: "إدارة الأعمال",
      },
      {
        name: "Accounting",
        nameAr: "المحاسبة", 
      },
      {
        name: "Finance",
        nameAr: "التمويل",
      },
      {
        name: "Marketing",
        nameAr: "التسويق",
      },
      {
        name: "Management Information Systems",
        nameAr: "نظم المعلومات الإدارية",

      },
      {
        name: "General Administration",
        nameAr: "الإدارة العامة",
      },
      {
        name: "Business Economics",
        nameAr: "اقتصاد الأعمال",
      }
    ],
  },
];

export default function StudyPlans() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [selectedFaculty, setSelectedFaculty] =
    useState<string | null>(null);

  const isArabic = language === "ar";

  const selected = faculties.find(
    (faculty) => faculty.id === selectedFaculty
  );

  return (
    <main
    
    
      className={`${styles.page} ${isArabic ? styles.rtl : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
      
    >
      <SiteHeader language={language} onLanguageChange={setLanguage} />

      <section className={styles.container}>
        <BackButton language={language} />

        <div className={styles.header}>

          <span className={styles.eyebrow}>
            {isArabic
              ? "الخطط الدراسية"
              : "STUDY PLANS"}
          </span>

          <h1>
            {isArabic
              ? "اختر كليتك"
              : "Choose your faculty"}
          </h1>

          <p>
            {isArabic
              ? "اختر الكلية للوصول إلى التخصصات والخطط الدراسية."
              : "Choose your faculty to explore its majors and study plans."}
          </p>

        </div>

        <div className={styles.facultyGrid}>

          {faculties.map((faculty, index) => (

            <button
              key={faculty.id}
              className={
                selectedFaculty === faculty.id
                  ? `${styles.facultyCard} ${styles.selected}`
                  : styles.facultyCard
              }
              onClick={() =>
                setSelectedFaculty(faculty.id)
              }
            >

              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2>
                {isArabic
                  ? faculty.nameAr
                  : faculty.name}
              </h2>

              <span className={styles.arrow}>
                →
              </span>

            </button>

          ))}

        </div>

        {selected && (

          <section className={styles.majorSection}>

            <div className={styles.majorHeader}>

              <div>

                <span className={styles.eyebrow}>
                  {isArabic
                    ? "الكلية المختارة"
                    : "SELECTED FACULTY"}
                </span>

                <h2>
                  {isArabic
                    ? selected.nameAr
                    : selected.name}
                </h2>

              </div>

            </div>

            {selected.majors.length > 0 ? (

              <div className={styles.majorList}>

                {selected.majors.map((major) => (

                  <button
                    className={styles.majorCard}
                    key={major.name}
                  >

                    <div>

                      <span>
                        {isArabic
                          ? "التخصص"
                          : "MAJOR"}
                      </span>

                      <h3>
                        {isArabic
                          ? major.nameAr
                          : major.name}
                      </h3>

                    </div>

                    <span>
                      →
                    </span>

                  </button>

                ))}

              </div>

            ) : (

              <div className={styles.empty}>

                <h3>
                  {isArabic
                    ? "ستتم إضافة الخطط الدراسية هنا"
                    : "Study plans will be added here"}
                </h3>

                <p>
                  {isArabic
                    ? "هذه الصفحة جاهزة لإضافة الخطط الرسمية الخاصة بهذه الكلية."
                    : "This page is ready for the official study plans for this faculty."}
                </p>

              </div>

            )}

          </section>

        )}

      </section>

    </main>
  );
}