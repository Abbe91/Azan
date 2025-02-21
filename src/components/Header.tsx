import React, { useState } from 'react';
import { Book, Heart, Star, Menu, X, Download, Moon, BookOpen } from 'lucide-react';
import { Link } from './Link';
import { Logo } from './Logo';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-emerald-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/" icon={Moon} active={location.pathname === '/'}>
                Azan
              </Link>
              <Link href="/quran" icon={Book} active={location.pathname.startsWith('/quran')}>
                Quran
              </Link>
              <Link href="/hadith" icon={Star} active={location.pathname === '/hadith'}>
                Hadith
              </Link>
              <Link href="/asma-allah" icon={Heart} active={location.pathname === '/asma-allah'}>
                Asma Allah
              </Link>
              <Link href="/azkar-dua" icon={BookOpen} active={location.pathname === '/azkar-dua'}>
                Azkar & Dua
              </Link>
              <Link href="/install" icon={Download} active={location.pathname === '/install'}>
                Install App
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" icon={Moon} active={location.pathname === '/'}>
                Azan
              </Link>
              <Link href="/quran" icon={Book} active={location.pathname.startsWith('/quran')}>
                Quran
              </Link>
              <Link href="/hadith" icon={Star} active={location.pathname === '/hadith'}>
                Hadith
              </Link>
              <Link href="/asma-allah" icon={Heart} active={location.pathname === '/asma-allah'}>
                Asma Allah
              </Link>
              <Link href="/azkar-dua" icon={BookOpen} active={location.pathname === '/azkar-dua'}>
                Azkar & Dua
              </Link>
              <Link href="/install" icon={Download} active={location.pathname === '/install'}>
                Install App
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}