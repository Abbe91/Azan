import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "sv", name: "Svenska" },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    document.documentElement.dir = languageCode === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle(
      "font-arabic",
      languageCode === "ar"
    );
  };

  return (
    <div className="relative group">
      <button
        className="p-1.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        aria-label="Change language"
      >
        <Languages className="h-4 w-4" />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              i18n.language === language.code
                ? "text-emerald-600 font-medium"
                : "text-gray-700"
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
}
