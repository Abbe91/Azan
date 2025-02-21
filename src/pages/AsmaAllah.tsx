import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import type { Name } from '../types';

const names: Name[] = [
  {
    number: 1,
    name: 'الله',
    transliteration: 'Allah',
    meaning: 'The Greatest Name',
    explanation: 'The name of the One True God, the Almighty. This is Allah\'s greatest name, encompassing all His other beautiful names and attributes.'
  },
  {
    number: 2,
    name: 'الرَّحْمَنُ',
    transliteration: 'Ar-Rahman',
    meaning: 'The Most Gracious',
    explanation: 'The One who has perfect mercy for all creation and provides them with all they need.'
  },
  {
    number: 3,
    name: 'الرَّحِيمُ',
    transliteration: 'Ar-Raheem',
    meaning: 'The Most Merciful',
    explanation: 'The One who has plenty of mercy for the believers.'
  },
  {
    number: 4,
    name: 'الْمَلِكُ',
    transliteration: 'Al-Malik',
    meaning: 'The King',
    explanation: 'The One with complete dominion, the absolute ruler.'
  },
  {
    number: 5,
    name: 'الْقُدُّوسُ',
    transliteration: 'Al-Quddus',
    meaning: 'The Most Holy',
    explanation: 'The One who is pure and free from all imperfections.'
  },
  {
    number: 6,
    name: 'السَّلاَمُ',
    transliteration: 'As-Salam',
    meaning: 'The Source of Peace',
    explanation: 'The One who is free from every imperfection and defect.'
  },
  {
    number: 7,
    name: 'الْمُؤْمِنُ',
    transliteration: 'Al-Mu\'min',
    meaning: 'The Guardian of Faith',
    explanation: 'The One who gives security and confirms the truth.'
  },
  {
    number: 8,
    name: 'الْمُهَيْمِنُ',
    transliteration: 'Al-Muhaymin',
    meaning: 'The Protector',
    explanation: 'The One who watches over and protects all things.'
  },
  {
    number: 9,
    name: 'الْعَزِيزُ',
    transliteration: 'Al-Aziz',
    meaning: 'The Almighty',
    explanation: 'The One who is mighty in His strength and power.'
  },
  {
    number: 10,
    name: 'الْجَبَّارُ',
    transliteration: 'Al-Jabbar',
    meaning: 'The Compeller',
    explanation: 'The One who repairs, improves, and makes things right.'
  },
  {
    number: 11,
    name: 'الْمُتَكَبِّرُ',
    transliteration: 'Al-Mutakabbir',
    meaning: 'The Greatest',
    explanation: 'The One who is supreme in glory, pride, and greatness.'
  },
  {
    number: 12,
    name: 'الْخَالِقُ',
    transliteration: 'Al-Khaliq',
    meaning: 'The Creator',
    explanation: 'The One who brings everything into existence.'
  },
  {
    number: 13,
    name: 'الْبَارِئُ',
    transliteration: 'Al-Bari\'',
    meaning: 'The Maker',
    explanation: 'The One who creates out of nothing, the Maker.'
  },
  {
    number: 14,
    name: 'الْمُصَوِّرُ',
    transliteration: 'Al-Musawwir',
    meaning: 'The Fashioner',
    explanation: 'The One who shapes and designs all things.'
  },
  {
    number: 15,
    name: 'الْغَفَّارُ',
    transliteration: 'Al-Ghaffar',
    meaning: 'The Forgiver',
    explanation: 'The One who forgives repeatedly.'
  },
  {
    number: 16,
    name: 'الْقَهَّارُ',
    transliteration: 'Al-Qahhar',
    meaning: 'The Subduer',
    explanation: 'The One who has absolute power over all creation.'
  },
  {
    number: 17,
    name: 'الْوَهَّابُ',
    transliteration: 'Al-Wahhab',
    meaning: 'The Bestower',
    explanation: 'The One who gives freely without limits.'
  },
  {
    number: 18,
    name: 'الرَّزَّاقُ',
    transliteration: 'Ar-Razzaq',
    meaning: 'The Provider',
    explanation: 'The One who provides all creatures with sustenance.'
  },
  {
    number: 19,
    name: 'الْفَتَّاحُ',
    transliteration: 'Al-Fattah',
    meaning: 'The Opener',
    explanation: 'The One who opens the way for hearts and minds to receive the truth.'
  },
  {
    number: 20,
    name: 'اَلْعَلِيْمُ',
    transliteration: 'Al-Alim',
    meaning: 'The All-Knowing',
    explanation: 'The One who has full knowledge of all things.'
  },
  {
    number: 21,
    name: 'الْقَابِضُ',
    transliteration: 'Al-Qabid',
    meaning: 'The Constrictor',
    explanation: 'The One who constricts and withholds.'
  },
  {
    number: 22,
    name: 'الْبَاسِطُ',
    transliteration: 'Al-Basit',
    meaning: 'The Expander',
    explanation: 'The One who extends and expands.'
  },
  {
    number: 23,
    name: 'الْخَافِضُ',
    transliteration: 'Al-Khafid',
    meaning: 'The Abaser',
    explanation: 'The One who lowers whoever He wills.'
  },
  {
    number: 24,
    name: 'الرَّافِعُ',
    transliteration: 'Ar-Rafi',
    meaning: 'The Exalter',
    explanation: 'The One who raises and elevates.'
  },
  {
    number: 25,
    name: 'الْمُعِزُّ',
    transliteration: 'Al-Mu\'iz',
    meaning: 'The Honorer',
    explanation: 'The One who gives honor and esteem.'
  },
  {
    number: 26,
    name: 'المُذِلُّ',
    transliteration: 'Al-Mudhill',
    meaning: 'The Humiliator',
    explanation: 'The One who humiliates and degrades.'
  },
  {
    number: 27,
    name: 'السَّمِيعُ',
    transliteration: 'As-Sami',
    meaning: 'The All-Hearing',
    explanation: 'The One who hears all things.'
  },
  {
    number: 28,
    name: 'الْبَصِيرُ',
    transliteration: 'Al-Basir',
    meaning: 'The All-Seeing',
    explanation: 'The One who sees all things.'
  },
  {
    number: 29,
    name: 'الْحَكَمُ',
    transliteration: 'Al-Hakam',
    meaning: 'The Judge',
    explanation: 'The One who judges between His creatures.'
  },
  {
    number: 30,
    name: 'الْعَدْلُ',
    transliteration: 'Al-Adl',
    meaning: 'The Just',
    explanation: 'The One who is absolutely just in His dealings.'
  },
  {
    number: 31,
    name: 'اللَّطِيفُ',
    transliteration: 'Al-Latif',
    meaning: 'The Subtle One',
    explanation: 'The One who is gentle and subtle in His actions.'
  },
  {
    number: 32,
    name: 'الْخَبِيرُ',
    transliteration: 'Al-Khabir',
    meaning: 'The All-Aware',
    explanation: 'The One who is aware of the minutest details.'
  },
  {
    number: 33,
    name: 'الْحَلِيمُ',
    transliteration: 'Al-Halim',
    meaning: 'The Forbearing',
    explanation: 'The One who is clement and forbearing.'
  },
  {
    number: 34,
    name: 'الْعَظِيمُ',
    transliteration: 'Al-Azim',
    meaning: 'The Magnificent',
    explanation: 'The One who is mighty and magnificent in His attributes.'
  },
  {
    number: 35,
    name: 'الْغَفُورُ',
    transliteration: 'Al-Ghafur',
    meaning: 'The All-Forgiving',
    explanation: 'The One who forgives all sins.'
  },
  {
    number: 36,
    name: 'الشَّكُورُ',
    transliteration: 'Ash-Shakur',
    meaning: 'The Appreciative',
    explanation: 'The One who appreciates and rewards abundantly.'
  },
  {
    number: 37,
    name: 'الْعَلِيُّ',
    transliteration: 'Al-Ali',
    meaning: 'The Most High',
    explanation: 'The One who is transcendently high.'
  },
  {
    number: 38,
    name: 'الْكَبِيرُ',
    transliteration: 'Al-Kabir',
    meaning: 'The Greatest',
    explanation: 'The One who is greater than all creation.'
  },
  {
    number: 39,
    name: 'الْحَفِيظُ',
    transliteration: 'Al-Hafiz',
    meaning: 'The Preserver',
    explanation: 'The One who protects and preserves all things.'
  },
  {
    number: 40,
    name: 'المُقيِت',
    transliteration: 'Al-Muqit',
    meaning: 'The Nourisher',
    explanation: 'The One who provides nourishment for all creation.'
  },
  {
    number: 41,
    name: 'الْحَسِيبُ',
    transliteration: 'Al-Hasib',
    meaning: 'The Reckoner',
    explanation: 'The One who is sufficient and takes account of all things.'
  },
  {
    number: 42,
    name: 'الْجَلِيلُ',
    transliteration: 'Al-Jalil',
    meaning: 'The Majestic',
    explanation: 'The One who is mighty and majestic.'
  },
  {
    number: 43,
    name: 'الْكَرِيمُ',
    transliteration: 'Al-Karim',
    meaning: 'The Most Generous',
    explanation: 'The One who is generous and gives abundantly.'
  },
  {
    number: 44,
    name: 'الرَّقِيبُ',
    transliteration: 'Ar-Raqib',
    meaning: 'The Watchful',
    explanation: 'The One who watches over and observes all things.'
  },
  {
    number: 45,
    name: 'الْمُجِيبُ',
    transliteration: 'Al-Mujib',
    meaning: 'The Responsive',
    explanation: 'The One who responds to supplications and prayers.'
  },
  {
    number: 46,
    name: 'الْوَاسِعُ',
    transliteration: 'Al-Wasi',
    meaning: 'The All-Encompassing',
    explanation: 'The One whose mercy and knowledge encompass all things.'
  },
  {
    number: 47,
    name: 'الْحَكِيمُ',
    transliteration: 'Al-Hakim',
    meaning: 'The Wise',
    explanation: 'The One who is wise in all His actions.'
  },
  {
    number: 48,
    name: 'الْوَدُودُ',
    transliteration: 'Al-Wadud',
    meaning: 'The Most Loving',
    explanation: 'The One who is full of love for His righteous servants.'
  },
  {
    number: 49,
    name: 'الْمَجِيدُ',
    transliteration: 'Al-Majid',
    meaning: 'The Most Glorious',
    explanation: 'The One who is most glorious and praiseworthy.'
  },
  {
    number: 50,
    name: 'الْبَاعِثُ',
    transliteration: 'Al-Ba\'ith',
    meaning: 'The Resurrector',
    explanation: 'The One who raises the dead to life.'
  },
  {
    number: 51,
    name: 'الشَّهِيدُ',
    transliteration: 'Ash-Shahid',
    meaning: 'The Witness',
    explanation: 'The One who witnesses all things.'
  },
  {
    number: 52,
    name: 'الْحَقُّ',
    transliteration: 'Al-Haqq',
    meaning: 'The Truth',
    explanation: 'The One who is the absolute truth.'
  },
  {
    number: 53,
    name: 'الْوَكِيلُ',
    transliteration: 'Al-Wakil',
    meaning: 'The Trustee',
    explanation: 'The One who is trusted with all affairs.'
  },
  {
    number: 54,
    name: 'الْقَوِيُّ',
    transliteration: 'Al-Qawiyy',
    meaning: 'The Most Strong',
    explanation: 'The One who is perfect in strength and power.'
  },
  {
    number: 55,
    name: 'الْمَتِينُ',
    transliteration: 'Al-Matin',
    meaning: 'The Firm',
    explanation: 'The One who is firm and unshakeable.'
  },
  {
    number: 56,
    name: 'الْوَلِيُّ',
    transliteration: 'Al-Waliyy',
    meaning: 'The Protecting Friend',
    explanation: 'The One who supports and protects the righteous.'
  },
  {
    number: 57,
    name: 'الْحَمِيدُ',
    transliteration: 'Al-Hamid',
    meaning: 'The Praiseworthy',
    explanation: 'The One who is praised for His perfect attributes.'
  },
  {
    number: 58,
    name: 'الْمُحْصِي',
    transliteration: 'Al-Muhsi',
    meaning: 'The Counter',
    explanation: 'The One who knows the number of all things.'
  },
  {
    number: 59,
    name: 'الْمُبْدِئُ',
    transliteration: 'Al-Mubdi',
    meaning: 'The Originator',
    explanation: 'The One who originates creation.'
  },
  {
    number: 60,
    name: 'الْمُعِيدُ',
    transliteration: 'Al-Mu\'id',
    meaning: 'The Restorer',
    explanation: 'The One who brings back and restores creation.'
  },
  {
    number: 61,
    name: 'الْمُحْيِي',
    transliteration: 'Al-Muhyi',
    meaning: 'The Giver of Life',
    explanation: 'The One who gives life to the dead.'
  },
  {
    number: 62,
    name: 'اَلْمُمِيتُ',
    transliteration: 'Al-Mumit',
    meaning: 'The Bringer of Death',
    explanation: 'The One who causes death.'
  },
  {
    number: 63,
    name: 'الْحَيُّ',
    transliteration: 'Al-Hayy',
    meaning: 'The Ever Living',
    explanation: 'The One who is eternally living.'
  },
  {
    number: 64,
    name: 'الْقَيُّومُ',
    transliteration: 'Al-Qayyum',
    meaning: 'The Self-Subsisting',
    explanation: 'The One who sustains and protects all that exists.'
  },
  {
    number: 65,
    name: 'الْوَاجِدُ',
    transliteration: 'Al-Wajid',
    meaning: 'The Finder',
    explanation: 'The One who finds what He wills.'
  },
  {
    number: 66,
    name: 'الْمَاجِدُ',
    transliteration: 'Al-Majid',
    meaning: 'The Noble',
    explanation: 'The One who is noble and glorious.'
  },
  {
    number: 67,
    name: 'الْواحِدُ',
    transliteration: 'Al-Wahid',
    meaning: 'The One',
    explanation: 'The One who is unique and has no partners.'
  },
  {
    number: 68,
    name: 'الْأَحَد',
    transliteration: 'Al-Ahad',
    meaning: 'The Unique',
    explanation: 'The One who is absolutely unique.'
  },
  {
    number: 69,
    name: 'الصَّمَدُ',
    transliteration: 'As-Samad',
    meaning: 'The Eternal',
    explanation: 'The One who is depended upon by all creation.'
  },
  {
    number: 70,
    name: 'الْقَادِرُ',
    transliteration: 'Al-Qadir',
    meaning: 'The Able',
    explanation: 'The One who has power over all things.'
  },
  {
    number: 71,
    name: 'الْمُقْتَدِرُ',
    transliteration: 'Al-Muqtadir',
    meaning: 'The Powerful',
    explanation: 'The One who has absolute power.'
  },
  {
    number: 72,
    name: 'الْمُقَدِّمُ',
    transliteration: 'Al-Muqaddim',
    meaning: 'The Expediter',
    explanation: 'The One who brings forward whom He wills.'
  },
  {
    number: 73,
    name: 'الْمُؤَخِّرُ',
    transliteration: 'Al-Mu\'akhkhir',
    meaning: 'The Delayer',
    explanation: 'The One who delays whom He wills.'
  },
  {
    number: 74,
    name: 'الْأَوَّلُ',
    transliteration: 'Al-Awwal',
    meaning: 'The First',
    explanation: 'The One who is the first without beginning.'
  },
  {
    number: 75,
    name: 'الْآخِرُ',
    transliteration: 'Al-Akhir',
    meaning: 'The Last',
    explanation: 'The One who is the last without end.'
  },
  {
    number: 76,
    name: 'الظَّاهِرُ',
    transliteration: 'Az-Zahir',
    meaning: 'The Manifest',
    explanation: 'The One who is manifest in His signs.'
  },
  {
    number: 77,
    name: 'الْبَاطِنُ',
    transliteration: 'Al-Batin',
    meaning: 'The Hidden',
    explanation: 'The One who is hidden from vision.'
  },
  {
    number: 78,
    name: 'الْوَالِي',
    transliteration: 'Al-Wali',
    meaning: 'The Governor',
    explanation: 'The One who governs and manages all affairs.'
  },
  {
    number: 79,
    name: 'الْمُتَعَالِي',
    transliteration: 'Al-Muta\'ali',
    meaning: 'The Most Exalted',
    explanation: 'The One who is high and exalted above creation.'
  },
  {
    number: 80,
    name: 'الْبَرُّ',
    transliteration: 'Al-Barr',
    meaning: 'The Source of All Goodness',
    explanation: 'The One who is the source of all goodness.'
  },
  {
    number: 81,
    name: 'التَّوَّابُ',
    transliteration: 'At-Tawwab',
    meaning: 'The Ever-Returning',
    explanation: 'The One who constantly turns in forgiveness.'
  },
  {
    number: 82,
    name: 'الْمُنْتَقِمُ',
    transliteration: 'Al-Muntaqim',
    meaning: 'The Avenger',
    explanation: 'The One who justly avenges.'
  },
  {
    number: 83,
    name: 'العَفُوُّ',
    transliteration: 'Al-Afuw',
    meaning: 'The Pardoner',
    explanation: 'The One who pardons all who sincerely repent.'
  },
  {
    number: 84,
    name: 'الرَّؤُوفُ',
    transliteration: 'Ar-Ra\'uf',
    meaning: 'The Compassionate',
    explanation: 'The One who is full of kindness.'
  },
  {
    number: 85,
    name: 'مَالِكُ الْمُلْكِ',
    transliteration: 'Malik-al-Mulk',
    meaning: 'Master of the Kingdom',
    explanation: 'The One who is the eternal owner of all.'
  },
  {
    number: 86,
    name: 'ذُوالْجَلَالِ وَالْإِكْرَامِ',
    transliteration: 'Dhul-Jalali-wal-Ikram',
    meaning: 'Lord of Majesty and Generosity',
    explanation: 'The One who possesses majesty and bounty.'
  },
  {
    number: 87,
    name: 'الْمُقْسِطُ',
    transliteration: 'Al-Muqsit',
    meaning: 'The Equitable',
    explanation: 'The One who acts with justice.'
  },
  {
    number: 88,
    name: 'الْجَامِعُ',
    transliteration: 'Al-Jami',
    meaning: 'The Gatherer',
    explanation: 'The One who gathers all mankind for the Day of Judgment.'
  },
  {
    number: 89,
    name: 'الْغَنِيُّ',
    transliteration: 'Al-Ghani',
    meaning: 'The Self-Sufficient',
    explanation: 'The One who is free of all needs.'
  },
  {
    number: 90,
    name: 'الْمُغْنِي',
    transliteration: 'Al-Mughni',
    meaning: 'The Enricher',
    explanation: 'The One who satisfies the needs of His creation.'
  },
  {
    number: 91,
    name: 'اَلْمَانِعُ',
    transliteration: 'Al-Mani',
    meaning: 'The Preventer',
    explanation: 'The One who prevents harm.'
  },
  {
    number: 92,
    name: 'الضَّارَّ',
    transliteration: 'Ad-Darr',
    meaning: 'The Creator of Harm',
    explanation: 'The One who creates harm for whom He wills.'
  },
  {
    number: 93,
    name: 'النَّافِعُ',
    transliteration: 'An-Nafi',
    meaning: 'The Creator of Good',
    explanation: 'The One who creates benefit for whom He wills.'
  },
  {
    number: 94,
    name: 'النُّورُ',
    transliteration: 'An-Nur',
    meaning: 'The Light',
    explanation: 'The One who is the light of the heavens and the earth.'
  },
  {
    number: 95,
    name: 'الْهَادِي',
    transliteration: 'Al-Hadi',
    meaning: 'The Guide',
    explanation: 'The One who provides guidance.'
  },
  {
    number: 96,
    name: 'الْبَدِيعُ',
    transliteration: 'Al-Badi',
    meaning: 'The Originator',
    explanation: 'The One who creates in unprecedented ways.'
  },
  {
    number: 97,
    name: 'اَلْبَاقِي',
    transliteration: 'Al-Baqi',
    meaning: 'The Everlasting',
    explanation: 'The One who remains after all creation has perished.'
  },
  {
    number: 98,
    name: 'الْوَارِثُ',
    transliteration: 'Al-Warith',
    meaning: 'The Inheritor',
    explanation: 'The One who remains after all creation has perished.'
  },
  {
    number: 99,
    name: 'الرَّشِيدُ',
    transliteration: 'Ar-Rashid',
    meaning: 'The Guide to the Right Path',
    explanation: 'The One who guides with wisdom and justice.'
  }
];

export function AsmaAllah() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('asma-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (number: number) => {
    const newFavorites = favorites.includes(number)
      ? favorites.filter(n => n !== number)
      : [...favorites, number];
    setFavorites(newFavorites);
    localStorage.setItem('asma-favorites', JSON.stringify(newFavorites));
  };

  const filteredNames = names.filter(name =>
    name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Asma Allah Al-Husna</h1>
            <p className="text-gray-600 mt-2">The Beautiful Names of Allah</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNames.map((name) => (
            <div
              key={name.number}
              className="bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {name.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-arabic">{name.name}</h3>
                    <p className="text-sm font-medium text-emerald-600">{name.transliteration}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(name.number)}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Star
                    className={`h-5 w-5 ${
                      favorites.includes(name.number)
                        ? 'fill-emerald-600 text-emerald-600'
                        : ''
                    }`}
                  />
                </button>
              </div>
              <div className="mt-3">
                <p className="font-medium text-gray-800">{name.meaning}</p>
                <p className="text-sm text-gray-600 mt-1">{name.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}