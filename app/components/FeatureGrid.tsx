import Link from "next/link";

type FeatureGridProps = {
  language?: "en" | "ar";
};

const content = {
  en: {
    title: "Explore JU Student",
    subtitle: "Everything you need in one place.",
    button: "Explore",
    sections: [
      {
        icon: "01",
        title: "Course Materials",
        description:
          "Find slides, notes, summaries, past exams and other course resources.",
        href: "/course-materials",
      },
      {
        icon: "02",
        title: "Study Plans",
        description:
          "Explore your faculty, major and university study plans.",
        href: "/study-plans",
      },
      {
        icon: "03",
        title: "GPA Calculator",
        description:
          "Calculate your GPA and see how future grades could affect it.",
        href: "/gpa",
      },
      {
        icon: "04",
        title: "General University Requirements",
        description:
          "Find common courses, university requirements, and more.",
        href: "/requirements",
      },
    ],
  },

  ar: {
    title: "استكشف JU Student",
    subtitle: "كل ما تحتاجه في مكان واحد.",
    button: "استكشف",
    sections: [
      {
        icon: "01",
        title: "محتوى المواد",
        description:
          "اعثر على السلايدات، الملخصات، النوتات، الامتحانات السابقة والمواد المفيدة.",
        href: "/course-materials",
      },
      {
        icon: "02",
        title: "الخطط الدراسية",
        description:
          "استعرض الخطة الدراسية الخاصة بكليتك وتخصصك.",
        href: "/study-plans",
      },
      {
        icon: "03",
        title: "حساب المعدل",
        description:
          "احسب معدلك وشاهد تأثير العلامات المستقبلية عليه.",
        href: "/gpa",
      },
      {
        icon: "04",
        title: "متطلبات الجامعة العامة",
        description:
          "اعثر على مواد المتطلبات الجامعية العامة.",
        href: "/requirements",
      },
    ],
  },
};

export default function FeatureGrid({
  language = "en",
}: FeatureGridProps) {
  const t = content[language];

  return (
    <section className="resources">
      <div className="section-heading">
        <div>
          <span className="section-number">01</span>

          <h2>{t.title}</h2>
        </div>

        <p>{t.subtitle}</p>
      </div>

      <div className="resource-grid">
        {t.sections.map((section) => (
          <Link
            href={section.href}
            className="resource-card"
            key={section.title}
          >
            <div className="resource-top">
              <span className="resource-number">
                {section.icon}
              </span>

              <span className="card-arrow">
                ↗
              </span>
            </div>

            <h3>{section.title}</h3>

            <p>{section.description}</p>

            <span className="text-button">
              {t.button} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}