import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrayerTimes } from './pages/PrayerTimes';
import { Quran } from './pages/Quran';
import { Hadith } from './pages/Hadith';
import { AsmaAllah } from './pages/AsmaAllah';
import { AzkarDua } from './pages/AzkarDua';
import { InstallGuide } from './pages/InstallGuide';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<PrayerTimes />} />
          <Route path="/quran/*" element={<Quran />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/asma-allah" element={<AsmaAllah />} />
          <Route path="/azkar-dua" element={<AzkarDua />} />
          <Route path="/install" element={<InstallGuide />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;