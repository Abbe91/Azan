import React, { useState } from "react";
import {
  Book,
  Heart,
  Star,
  Menu,
  X,
  Download,
  Moon,
  BookOpen,
} from "lucide-react";
import { Link } from "./Link";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-emerald-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-14">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" icon={Moon} active={location.pathname === "/"}>
              {t("common.prayerTimes")}
            </Link>
            <Link
              href="/quran"
              icon={Book}
              active={location.pathname.startsWith("/quran")}
            >
              {t("common.quran")}
            </Link>
            <Link
              href="/hadith"
              icon={Star}
              active={location.pathname === "/hadith"}
            >
              {t("common.hadith")}
            </Link>
            <Link
              href="/asma-allah"
              icon={Heart}
              active={location.pathname === "/asma-allah"}
            >
              {t("common.asmaAllah")}
            </Link>
            <Link
              href="/azkar-dua"
              icon={BookOpen}
              active={location.pathname === "/azkar-dua"}
            >
              {t("common.azkarDua")}
            </Link>
            <Link
              href="/install"
              icon={Download}
              active={location.pathname === "/install"}
            >
              {t("common.installApp")}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1.5">
              <Link href="/" icon={Moon} active={location.pathname === "/"}>
                {t("common.prayerTimes")}
              </Link>
              <Link
                href="/quran"
                icon={Book}
                active={location.pathname.startsWith("/quran")}
              >
                {t("common.quran")}
              </Link>
              <Link
                href="/hadith"
                icon={Star}
                active={location.pathname === "/hadith"}
              >
                {t("common.hadith")}
              </Link>
              <Link
                href="/asma-allah"
                icon={Heart}
                active={location.pathname === "/asma-allah"}
              >
                {t("common.asmaAllah")}
              </Link>
              <Link
                href="/azkar-dua"
                icon={BookOpen}
                active={location.pathname === "/azkar-dua"}
              >
                {t("common.azkarDua")}
              </Link>
              <Link
                href="/install"
                icon={Download}
                active={location.pathname === "/install"}
              >
                {t("common.installApp")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
