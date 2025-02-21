import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Book, Bookmark, Play, Pause, Volume2 } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SurahView } from './SurahView';
import type { Surah, BookmarkedVerse } from '../types';

export function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showBookmarkedVerses, setShowBookmarkedVerses] = useState(false);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<BookmarkedVerse[]>(() => {
    const saved = localStorage.getItem('quran-verse-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('quran-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surahs:', error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  useEffect(() => {
    localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('quran-verse-bookmarks', JSON.stringify(bookmarkedVerses));
  }, [bookmarkedVerses]);

  const toggleBookmark = (surahNumber: number) => {
    setBookmarks(prev => 
      prev.includes(surahNumber)
        ? prev.filter(n => n !== surahNumber)
        : [...prev, surahNumber]
    );
  };

  const removeVerseBookmark = (verseNumber: number) => {
    setBookmarkedVerses(prev => prev.filter(v => v.ayah.number !== verseNumber));
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center">
                <Book className="h-8 w-8 text-emerald-600 mr-3" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">The Holy Quran</h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search Surah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowBookmarkedVerses(!showBookmarkedVerses)}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    showBookmarkedVerses
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Saved Verses ({bookmarkedVerses.length})
                </button>
              </div>
            </div>

            {showBookmarkedVerses && bookmarkedVerses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Verses</h2>
                <div className="space-y-4">
                  {bookmarkedVerses.map((bookmark) => (
                    <div
                      key={bookmark.ayah.number}
                      className="bg-emerald-50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">
                            {bookmark.ayah.numberInSurah}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              Surah {bookmark.surahName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Verse {bookmark.ayah.numberInSurah}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeVerseBookmark(bookmark.ayah.number)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Bookmark className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                      <p className="text-lg mb-2 text-right font-arabic">
                        {bookmark.ayah.text}
                      </p>
                      <p className="text-gray-600">{bookmark.ayah.translation}</p>
                      <button
                        onClick={() => navigate(`/quran/${bookmark.surahNumber}`)}
                        className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        Go to Surah
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bookmarks.length > 0 && !showBookmarkedVerses && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Bookmarked Surahs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {surahs
                    .filter(surah => bookmarks.includes(surah.number))
                    .map(surah => (
                      <div
                        key={`bookmark-${surah.number}`}
                        onClick={() => navigate(`/quran/${surah.number}`)}
                        className="bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            {surah.number}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{surah.englishName}</h3>
                            <p className="text-sm text-gray-600">{surah.englishNameTranslation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {!showBookmarkedVerses && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start">
                      <div 
                        onClick={() => navigate(`/quran/${surah.number}`)}
                        className="flex-1"
                      >
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            {surah.number}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{surah.englishName}</h3>
                            <p className="text-sm text-gray-600">{surah.englishNameTranslation}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {surah.numberOfAyahs} verses • {surah.revelationType}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(surah.number);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            bookmarks.includes(surah.number)
                              ? 'fill-emerald-600 text-emerald-600'
                              : 'text-gray-400 hover:text-emerald-600'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      } />
      <Route path="/:surahNumber" element={<SurahView bookmarkedVerses={bookmarkedVerses} setBookmarkedVerses={setBookmarkedVerses} />} />
    </Routes>
  );
}