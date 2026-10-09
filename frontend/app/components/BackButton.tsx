"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  language: "en" | "ar";
};

export default function BackButton({ language }: BackButtonProps) {
  const router = useRouter();
  const isArabic = language === "ar";

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <button
      className="back-button"
      onClick={goBack}
      aria-label={isArabic ? "العودة إلى الصفحة السابقة" : "Go back"}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <span aria-hidden="true">{isArabic ? "→" : "←"}</span>
      {isArabic ? "رجوع" : "Back"}
    </button>
  );
}