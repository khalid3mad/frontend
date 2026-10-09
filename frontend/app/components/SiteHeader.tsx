"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteHeaderProps = {
  language: "en" | "ar";
  onLanguageChange: (language: "en" | "ar") => void;
};

const navigation = {
  en: [
    { label: "Home", href: "/" },
    { label: "Course Materials", href: "/course-materials" },
    { label: "Study Plans", href: "/study-plans" },
    { label: "GPA Calculator", href: "/gpa" },
    { label: "General University Requirements", href: "/requirements" },
    { label: "Student Community", href: "#" },
    { label: "JU AI", href: "#" },
  ],
  ar: [
    { label: "الرئيسية", href: "/" },
    { label: "محتوى المواد", href: "/course-materials" },
    { label: "الخطط الدراسية", href: "/study-plans" },
    { label: "حساب المعدل", href: "/gpa" },
    { label: "متطلبات الجامعة العامة", href: "/requirements" },
    { label: "مجتمع الطلبة", href: "#" },
    { label: "JU AI", href: "#" },
  ],
};

export default function SiteHeader({
  language,
  onLanguageChange,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const isArabic = language === "ar";

  return (
    <header className="navbar" dir={isArabic ? "rtl" : "ltr"}>
      <div className="navbar-inner">
        <Link href="/" className="brand">
          <div className="brand-logo">JU</div>
          <div>
            <strong>JU Student</strong>
            <span>{isArabic ? "الجامعة الأردنية" : "University of Jordan"}</span>
          </div>
        </Link>

        <nav
          className="top-navigation"
          aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}
        >
          {navigation[language].map((item) => (
            <Link
              href={item.href}
              className={pathname === item.href ? "nav-link active" : "nav-link"}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="language-switcher">
          <button
            className={language === "en" ? "language active-language" : "language"}
            onClick={() => onLanguageChange("en")}
            aria-pressed={language === "en"}
          >
            EN
          </button>
          <span aria-hidden="true">|</span>
          <button
            className={language === "ar" ? "language active-language" : "language"}
            onClick={() => onLanguageChange("ar")}
            aria-pressed={language === "ar"}
          >
            عربي
          </button>
        </div>
      </div>
    </header>
  );
}