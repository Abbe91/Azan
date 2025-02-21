export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface TimeAdjustments {
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Isha: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  translation?: string;
  audio?: string;
  surahNumber?: number;
  surahName?: string;
}

export interface Translation {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
}

export interface BookmarkedVerse {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  timestamp: number;
}

export interface Name {
  number: number;
  name: string;
  transliteration: string;
  meaning: string;
  explanation: string;
}

export interface Hadith {
  id: string;
  title: string;
  narrator: string;
  text: string;
  source: string;
  chapter: string;
  grade?: string;
}

export interface Dhikr {
  id: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  repetitions?: number;
  virtue?: string;
  timing?: string;
}

export interface Dua {
  id: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  occasion?: string;
}