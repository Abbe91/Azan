import React, { useState } from 'react';
import { Search, BookOpen, Bookmark, Clock, Star } from 'lucide-react';
import type { Dhikr, Dua } from '../types';

const dhikrList: Dhikr[] = [
  {
    id: '1',
    category: 'Morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la shareeka lah",
    translation: 'We have reached the morning and kingship belongs to Allah, praise is to Allah. None has the right to be worshipped except Allah, alone, without partner',
    reference: 'Abu Dawud',
    repetitions: 1,
    timing: 'Morning'
  },
  {
    id: '2',
    category: 'Evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la shareeka lah",
    translation: 'We have reached the evening and kingship belongs to Allah, praise is to Allah. None has the right to be worshipped except Allah, alone, without partner',
    reference: 'Abu Dawud',
    repetitions: 1,
    timing: 'Evening'
  },
  {
    id: '3',
    category: 'After Prayer',
    arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ',
    transliteration: "Astaghfirullah, Astaghfirullah, Astaghfirullah",
    translation: 'I seek forgiveness from Allah [3 times]',
    reference: 'Muslim',
    repetitions: 3,
    timing: 'After Prayer',
    virtue: 'Seeking forgiveness after prayer erases minor sins'
  },
  {
    id: '4',
    category: 'After Prayer',
    arabic: 'اللَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالْإِكْرَامِ',
    transliteration: "Allahumma antas-salam, wa minkas-salam, tabarakta ya dhal-jalali wal-ikram",
    translation: 'O Allah, You are Peace, and from You comes peace. Blessed are You, O Owner of majesty and honor',
    reference: 'Muslim',
    repetitions: 1,
    timing: 'After Prayer'
  },
  {
    id: '5',
    category: 'General',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: "Subhanallahi wa bihamdihi",
    translation: 'Glory and praise is to Allah',
    reference: 'Bukhari',
    repetitions: 100,
    virtue: 'Whoever says this 100 times a day will have his sins forgiven even if they were like the foam of the sea'
  }
];

const duaList: Dua[] = [
  // Morning/Evening
  {
    id: '1',
    category: 'Morning/Evening',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyah fid-dunya wal-akhirah",
    translation: 'O Allah, I ask You for pardon and well-being in this life and the next',
    reference: 'Ibn Majah',
    occasion: 'Daily Protection'
  },
  {
    id: '2',
    category: 'Morning/Evening',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي',
    transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
    translation: 'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight',
    reference: 'Abu Dawud',
    occasion: 'Health and Well-being'
  },

  // Before Sleep
  {
    id: '3',
    category: 'Before Sleep',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: "Bismika Allahumma amootu wa ahya",
    translation: 'In Your name, O Allah, I die and I live',
    reference: 'Bukhari',
    occasion: 'Before Sleep'
  },
  {
    id: '4',
    category: 'Before Sleep',
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    transliteration: "Allahumma qini adhabaka yawma tab'athu 'ibadak",
    translation: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants',
    reference: 'Abu Dawud',
    occasion: 'Protection during Sleep'
  },

  // Seeking Knowledge
  {
    id: '5',
    category: 'Seeking Knowledge',
    arabic: 'رَبِّ زِدْنِي عِلْماً',
    transliteration: "Rabbi zidni ilma",
    translation: 'My Lord, increase me in knowledge',
    reference: 'Quran 20:114',
    occasion: 'Seeking Knowledge'
  },
  {
    id: '6',
    category: 'Seeking Knowledge',
    arabic: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا',
    transliteration: "Allahumma infa'ni bima 'allamtani wa 'allimni ma yanfa'uni wa zidni 'ilma",
    translation: 'O Allah, benefit me with what You have taught me, teach me what will benefit me, and increase me in knowledge',
    reference: 'Ibn Majah',
    occasion: 'Before Studying'
  },

  // Distress
  {
    id: '7',
    category: 'Distress',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers',
    reference: 'Quran 21:87',
    occasion: 'Times of Distress'
  },
  {
    id: '8',
    category: 'Distress',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul hazna idha shi'ta sahla",
    translation: 'O Allah, there is no ease except what You make easy, and You make the difficulty easy if You wish',
    reference: 'Ibn Hibban',
    occasion: 'Facing Difficulties'
  },

  // Protection
  {
    id: '9',
    category: 'Protection',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow',
    reference: 'Bukhari',
    occasion: 'Anxiety and Worry'
  },
  {
    id: '10',
    category: 'Protection',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shai'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
    translation: 'In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing',
    reference: 'Abu Dawud',
    occasion: 'General Protection'
  },

  // Forgiveness
  {
    id: '11',
    category: 'Forgiveness',
    arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
    transliteration: "Rabbigh-fir li wa tub 'alayya innaka antat-tawwabur-rahim",
    translation: 'My Lord, forgive me and accept my repentance, for You are the Ever-Accepting of repentance, the Most Merciful',
    reference: 'Tirmidhi',
    occasion: 'Seeking Forgiveness'
  },
  {
    id: '12',
    category: 'Forgiveness',
    arabic: 'اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي، وَإِسْرَافِي فِي أَمْرِي، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي',
    transliteration: "Allahummaghfir li khati'ati wa jahli, wa israfi fi amri, wa ma anta a'lamu bihi minni",
    translation: 'O Allah, forgive me for my sins, my ignorance, my immoderation in my affairs, and all that You know better than I',
    reference: 'Bukhari',
    occasion: 'General Forgiveness'
  },

  // Success & Guidance
  {
    id: '13',
    category: 'Success & Guidance',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    transliteration: "Rabbish-rah li sadri wa yassir li amri",
    translation: 'My Lord, expand for me my chest and ease for me my task',
    reference: 'Quran 20:25-26',
    occasion: 'Seeking Ease'
  },
  {
    id: '14',
    category: 'Success & Guidance',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
    translation: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency',
    reference: 'Muslim',
    occasion: 'Seeking Guidance'
  },

  // Family & Relationships
  {
    id: '15',
    category: 'Family & Relationships',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    translation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us a leader for the righteous',
    reference: 'Quran 25:74',
    occasion: 'Family Blessing'
  },
  {
    id: '16',
    category: 'Family & Relationships',
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    transliteration: "Rabbij'alni muqimas-salati wa min dhurriyyati rabbana wa taqabbal du'a",
    translation: 'My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication',
    reference: 'Quran 14:40',
    occasion: 'Family Guidance'
  }
];

export function AzkarDua() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDuas, setShowDuas] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('azkar-dua-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const categories = Array.from(
    new Set([
      ...dhikrList.map(d => d.category),
      ...duaList.map(d => d.category)
    ])
  );

  const filteredItems = showDuas
    ? duaList.filter(dua =>
        (selectedCategory === 'all' || dua.category === selectedCategory) &&
        (dua.arabic.includes(searchTerm) ||
         dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
         dua.translation.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : dhikrList.filter(dhikr =>
        (selectedCategory === 'all' || dhikr.category === selectedCategory) &&
        (dhikr.arabic.includes(searchTerm) ||
         dhikr.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
         dhikr.translation.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-emerald-600 mr-3" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {showDuas ? 'Daily Duas' : 'Daily Azkar'}
              </h1>
              <p className="text-gray-600 mt-1">
                {showDuas ? 'Islamic Supplications' : 'Words of Remembrance'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDuas(!showDuas)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Show {showDuas ? 'Azkar' : 'Duas'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={`Search ${showDuas ? 'duas' : 'azkar'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {item.timing && <Clock className="h-5 w-5 text-emerald-600" />}
                  <span className="text-sm font-medium text-emerald-600">
                    {item.category}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Star
                    className={`h-5 w-5 ${
                      favorites.includes(item.id)
                        ? 'fill-emerald-600 text-emerald-600'
                        : ''
                    }`}
                  />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl text-right font-arabic leading-loose">
                  {item.arabic}
                </p>
                <p className="text-gray-600 italic">
                  {item.transliteration}
                </p>
                <p className="text-gray-800">
                  {item.translation}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {'repetitions' in item && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                    {item.repetitions}x
                  </span>
                )}
                {item.reference && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {item.reference}
                  </span>
                )}
                {'occasion' in item && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                    {item.occasion}
                  </span>
                )}
              </div>

              {'virtue' in item && item.virtue && (
                <p className="mt-3 text-sm text-emerald-600 italic">
                  Virtue: {item.virtue}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}