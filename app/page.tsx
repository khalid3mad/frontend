"use client";

import { useState } from "react";
import Link from "next/link";
import FeatureGrid from "@/app/components/FeatureGrid";
import SiteHeader from "@/app/components/SiteHeader";

const content = {
  en: {
    university: "University of Jordan",
    title: "Everything you need at JU",
    subtitle: "A student platform built around your university experience.",

    aiTitle: "How can JU AI help you?",
    aiDescription:
      "Ask about courses, doctor emails, course material, university regulations, study plans and more.",
    aiPlaceholder: "Ask JU AI anything...",

    suggestions: [
      "What can I register next semester?",
      "Build my study plan",
      "Help me study Database",
    ],

    communityTitle: "Student Communities",
    communitySubtitle: "Connect with students across JU.",

    faculties: [
      "King Abdullah II School of Information Technology",
      "Engineering",
      "Business",
      "General JU Students",
    ],

    join: "Join community",
  },

  ar: {
    university: "الجامعة الأردنية",
    title: "كل ما تحتاجه في الجامعة الأردنية",
    subtitle: "منصة طلابية مصممة لتسهيل حياتك الجامعية.",

    aiTitle: "كيف يمكن لـ JU AI مساعدتك؟",
    aiDescription:
      "اسأل عن المواد، إيميلات الدكاترة، المواد الدراسية، أنظمة الجامعة، الخطط الدراسية والمزيد.",
    aiPlaceholder: "اسأل JU AI عن أي شيء...",

    suggestions: [
      "ما المواد التي أستطيع تسجيلها؟",
      "ابنِ لي خطة دراسية",
      "ساعدني في دراسة مادة قواعد البيانات",
    ],

    communityTitle: "مجتمعات الطلبة",
    communitySubtitle: "تواصل مع الطلبة من مختلف كليات الجامعة.",

    faculties: [
      "كلية الملك عبدالله الثاني لتكنولوجيا المعلومات",
      "كلية الهندسة",
      "كلية الأعمال",
      "طلبة الجامعة الأردنية عامة",
    ],

    join: "انضم للمجتمع",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const t = content[language];
  const isArabic = language === "ar";

  return (
    <main
      className={isArabic ? "app rtl" : "app"}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <SiteHeader language={language} onLanguageChange={setLanguage} />

      <section className="hero">

        <div className="hero-container">

          <div className="hero-text">

            <p className="eyebrow">
              {t.university}
            </p>

            <h1>
              {t.title}
            </h1>

            <p className="hero-subtitle">
              {t.subtitle}
            </p>

          </div>

          <div className="ai-card">

            <div className="ai-label">
              <span className="status-dot"></span>
              JU AI
            </div>

            <h2>
              {t.aiTitle}
            </h2>

            <p>
              {t.aiDescription}
            </p>

            <div className="ai-search">

              <input
                type="text"
                placeholder={t.aiPlaceholder}
              />

              <button>
                →
              </button>

            </div>

            <div className="suggestions">

              {t.suggestions.map((suggestion) => (
                <button key={suggestion}>
                  {suggestion}
                </button>
              ))}

            </div>

          </div>

        </div>

      </section>

      <FeatureGrid language={language} />

      <section className="communities">

        <div className="section-heading">

          <div>

            <span className="section-number">
              02
            </span>

            <h2>
              {t.communityTitle}
            </h2>

          </div>

          <p>
            {t.communitySubtitle}
          </p>

        </div>

        <div className="faculty-grid">

          {t.faculties.map((faculty, index) => (
            <Link
              href="#"
              className="faculty-card"
              key={faculty}
            >

              <span className="faculty-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="faculty-text">

                <h3>
                  {faculty}
                </h3>

                <span>
                  {t.join}
                </span>

              </div>

              <span className="faculty-arrow">
                →
              </span>

            </Link>
          ))}

        </div>

      </section>

      <footer className="footer">

        <div>

          <strong>
            JU Student
          </strong>

          <span>
            {t.university}
          </span>

        </div>

        <p>
          Student platform for the University of Jordan
        </p>

      </footer>

    </main>
  );
}