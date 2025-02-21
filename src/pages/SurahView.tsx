import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Play, Pause, Volume2, Languages, Bookmark } from 'lucide-react';
import type { Ayah, Translation, BookmarkedVerse } from '../types';

interface SurahViewProps {
  bookmarkedVerses: BookmarkedVerse[];
  setBookmarkedVerses: React.Dispatch<React.SetStateAction<BookmarkedVerse[]>>;
}

export function SurahView({ bookmarkedVerses, setBookmarkedVerses }: SurahViewProps) {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState('en.asad');
  const [loading, setLoading] = useState(true);
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingFullSurah, setIsPlayingFullSurah] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [surahName, setSurahName] = useState('');
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surahResponse, translationResponse, translationsListResponse] = await Promise.all([
          axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`),
          axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/${selectedTranslation}`),
          axios.get('https://api.alquran.cloud/v1/edition/language/en')
        ]);

        const audioResponse = await axios.get(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
        );

        setSurahName(surahResponse.data.data.englishName);
        setAyahs(surahResponse.data.data.ayahs.map((ayah: any, index: number) => ({
          ...ayah,
          translation: translationResponse.data.data.ayahs[index].text,
          audio: audioResponse.data.data.ayahs[index].audio,
          surahNumber: Number(surahNumber),
          surahName: surahResponse.data.data.englishName
        })));

        setTranslations(translationsListResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surah:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [surahNumber, selectedTranslation]);

  const handleAudioPlay = (ayah: Ayah) => {
    if (audioRef.current) {
      if (currentAyah === ayah.number && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsPlayingFullSurah(false);
      } else {
        setAudioSrc(ayah.audio || '');
        setCurrentAyah(ayah.number);
        audioRef.current.src = ayah.audio || '';
        audioRef.current.play();
        setIsPlaying(true);
        setIsPlayingFullSurah(false);
      }
    }
  };

  const playFullSurah = () => {
    if (!ayahs.length) return;
    
    setIsPlayingFullSurah(true);
    setCurrentAyahIndex(0);
    setCurrentAyah(ayahs[0].number);
    
    if (audioRef.current) {
      audioRef.current.src = ayahs[0].audio || '';
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopFullSurah = () => {
    setIsPlayingFullSurah(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleAudioEnded = () => {
    if (isPlayingFullSurah && currentAyahIndex < ayahs.length - 1) {
      const nextIndex = currentAyahIndex + 1;
      setCurrentAyahIndex(nextIndex);
      setCurrentAyah(ayahs[nextIndex].number);
      
      if (audioRef.current) {
        audioRef.current.src = ayahs[nextIndex].audio || '';
        audioRef.current.play();
      }
    } else {
      setIsPlaying(false);
      setIsPlayingFullSurah(false);
      setCurrentAyah(null);
    }
  };

  const toggleVerseBookmark = (ayah: Ayah) => {
    const isBookmarked = bookmarkedVerses.some(v => v.ayah.number === ayah.number);
    
    if (isBookmarked) {
      setBookmarkedVerses(prev => prev.filter(v => v.ayah.number !== ayah.number));
    } else {
      setBookmarkedVerses(prev => [...prev, {
        ayah,
        surahNumber: Number(surahNumber),
        surahName,
        timestamp: Date.now()
      }]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/quran')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Surah {surahName}</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={isPlayingFullSurah ? stopFullSurah : playFullSurah}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              {isPlayingFullSurah ? (
                <>
                  <Pause className="h-5 w-5" />
                  <span>Stop Surah</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Play Surah</span>
                </>
              )}
            </button>
            
            <select
              value={selectedTranslation}
              onChange={(e) => setSelectedTranslation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              {translations.map((translation) => (
                <option key={translation.identifier} value={translation.identifier}>
                  {translation.englishName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {ayahs.map((ayah) => (
            <div
              key={ayah.number}
              className={`p-4 rounded-lg ${
                currentAyah === ayah.number ? 'bg-emerald-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {ayah.numberInSurah}
                  </div>
                  <button
                    onClick={() => toggleVerseBookmark(ayah)}
                    className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        bookmarkedVerses.some(v => v.ayah.number === ayah.number)
                          ? 'fill-emerald-600 text-emerald-600'
                          : 'text-gray-400 hover:text-emerald-600'
                      }`}
                    />
                  </button>
                </div>
                {!isPlayingFullSurah && (
                  <button
                    onClick={() => handleAudioPlay(ayah)}
                    className="p-2 hover:bg-emerald-100 rounded-full transition-colors"
                  >
                    {currentAyah === ayah.number && isPlaying ? (
                      <Pause className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Play className="h-5 w-5 text-emerald-600" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xl mb-4 leading-relaxed text-right font-arabic">{ayah.text}</p>
              <p className="text-gray-600">{ayah.translation}</p>
            </div>
          ))}
        </div>
      </div>
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
      />
    </div>
  );
}