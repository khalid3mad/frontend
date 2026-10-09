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
    communityPopupTitle: "Join the Student Community",
communityPopupDescription:
  "Connect with other students, ask questions, and share useful study resources.",
joinWhatsApp: "Join WhatsApp Group",
closePopup: "Maybe later",
whatsappLinkMissing: "The WhatsApp invitation link has not been added yet.",

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
    communityPopupTitle: "انضم إلى مجتمع الطلبة",
    communityPopupDescription:
    "تواصل مع الطلبة وشارك المصادر الدراسية المفيدة عبر مجموعة واتساب.",
    joinWhatsApp: "انضم إلى مجموعة واتساب",
    closePopup: "ليس الآن",
    whatsappLinkMissing: "لم تتم إضافة رابط مجموعة واتساب بعد.",
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
const communityWhatsAppLinks = [
  "", // KASIT
  "", // Engineering
  "", // Business
  "", // General JU Students
];
export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
const [selectedCommunity, setSelectedCommunity] =
  useState<number | null>(null);

const selectedWhatsAppLink =
  selectedCommunity === null
    ? ""
    : communityWhatsAppLinks[selectedCommunity] ?? "";
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
            <button
  type="button"
  className="faculty-card"
  key={faculty}
  onClick={() => setSelectedCommunity(index)}
>
  <span className="faculty-number">
    {String(index + 1).padStart(2, "0")}
  </span>

  <div className="faculty-text">
    <h3>{faculty}</h3>
    <span>{t.join}</span>
  </div>

  <span className="faculty-arrow">→</span>
</button>
          ))}

        </div>

      </section>
{selectedCommunity !== null && (
  <div
    className="community-modal-backdrop"
    onClick={() => setSelectedCommunity(null)}
  >
    <section
      className="community-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-modal-title"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="community-modal-close"
        onClick={() => setSelectedCommunity(null)}
        aria-label="Close popup"
      >
        ×
      </button>

      <div className="whatsapp-mark">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.917-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.793.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.214 3.073.149.198 2.095 3.2 5.076 4.487.71.307 1.264.491 1.696.628.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.401h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.87 9.87 0 0 1-1.51-5.26c.002-5.45 4.438-9.884 9.89-9.884 2.64.001 5.12 1.03 6.985 2.897a9.825 9.825 0 0 1 2.892 6.99c-.002 5.45-4.438 9.883-9.884 9.883m8.411-18.294A11.815 11.815 0 0 0 12.045 0C5.495 0 .16 5.335.158 11.902c0 2.096.548 4.143 1.588 5.946L0 24l6.304-1.654a11.9 11.9 0 0 0 5.736 1.462h.005c6.551 0 11.886-5.335 11.889-11.902a11.82 11.82 0 0 0-3.472-8.417z"
          />
        </svg>
      </div>

      <p className="community-modal-eyebrow">
        JU STUDENT COMMUNITY
      </p>

      <h2 id="community-modal-title">
        {t.communityPopupTitle}
      </h2>

      <h3>
        {t.faculties[selectedCommunity]}
      </h3>

      <p className="community-modal-description">
        {t.communityPopupDescription}
      </p>

      {selectedWhatsAppLink ? (
        <a
          href={selectedWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="community-whatsapp-button"
        >
          {t.joinWhatsApp}
          <span>↗</span>
        </a>
      ) : (
        <p className="community-link-missing">
          {t.whatsappLinkMissing}
        </p>
      )}

      <button
        type="button"
        className="community-modal-secondary"
        onClick={() => setSelectedCommunity(null)}
      >
        {t.closePopup}
      </button>
    </section>
  </div>
)}
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