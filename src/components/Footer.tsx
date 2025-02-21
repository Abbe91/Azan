import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Prayer Times</h3>
            <ul className="space-y-2">
              <li>Daily Prayer Schedule</li>
              <li>Qibla Direction</li>
              <li>Calendar</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quran</h3>
            <ul className="space-y-2">
              <li>Read Quran</li>
              <li>Listen to Quran</li>
              <li>Translations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Hadith</h3>
            <ul className="space-y-2">
              <li>Collections</li>
              <li>Search Hadith</li>
              <li>Daily Hadith</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} Islamic Hub . All rights reserved
            to{" "}
            <a
              href="https://centrum-foralla.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              centrum-foralla.se
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
