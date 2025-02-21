import React, { useState, useEffect } from 'react';
import { Search, Book, Bookmark } from 'lucide-react';
import type { Hadith as HadithType } from '../types';

const hadiths: HadithType[] = [
  {
    id: '1',
    title: 'Actions are by Intentions',
    narrator: 'Umar ibn Al-Khattab',
    text: 'The Prophet ﷺ said: "Actions are but by intentions, and each person will have but that which they intended. So whoever emigrated for the sake of Allah and His Messenger, then his emigration was for Allah and His Messenger. And whoever emigrated to acquire some worldly gain or to marry a woman, then his emigration was for that which he emigrated."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Revelation',
    grade: 'Sahih'
  },
  {
    id: '2',
    title: 'The Best Among You',
    narrator: 'Uthman ibn Affan',
    text: 'The Prophet ﷺ said: "The best among you is the one who learns the Quran and teaches it."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Virtues of the Quran',
    grade: 'Sahih'
  },
  {
    id: '3',
    title: 'Kindness',
    narrator: 'Aisha',
    text: 'The Prophet ﷺ said: "Allah is kind and loves kindness in all matters."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Good Manners',
    grade: 'Sahih'
  },
  {
    id: '4',
    title: 'Paradise Under Mothers\' Feet',
    narrator: 'Abu Hurairah',
    text: 'A man came to the Prophet ﷺ and said: "O Messenger of Allah, who among people is most deserving of my good company?" He said: "Your mother." He asked: "Then who?" He said: "Your mother." He asked: "Then who?" He said: "Your mother." He asked: "Then who?" He said: "Then your father."',
    source: 'Sahih Muslim',
    chapter: 'Book of Virtue, Good Manners and Joining of the Ties of Kinship',
    grade: 'Sahih'
  },
  {
    id: '5',
    title: 'Smile is Charity',
    narrator: 'Abu Dharr',
    text: 'The Prophet ﷺ said: "Your smile for your brother is charity."',
    source: 'Sahih Muslim',
    chapter: 'Book of Zakat',
    grade: 'Sahih'
  },
  {
    id: '6',
    title: 'The Strong Believer',
    narrator: 'Abu Hurairah',
    text: 'The Prophet ﷺ said: "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both. Be eager for what benefits you, seek help from Allah, and do not be frustrated. If something befalls you, do not say: \'If only I had done such and such\' rather say: \'Allah has decreed what He wills.\' For verily, \'if only\' opens the door to the work of Satan."',
    source: 'Sahih Muslim',
    chapter: 'Book of Destiny',
    grade: 'Sahih'
  },
  {
    id: '7',
    title: 'Excellence of Character',
    narrator: 'Abdullah ibn Amr',
    text: 'The Prophet ﷺ said: "The best among you are those who have the best character."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Good Manners',
    grade: 'Sahih'
  },
  {
    id: '8',
    title: 'Signs of a Hypocrite',
    narrator: 'Abu Hurairah',
    text: 'The Prophet ﷺ said: "The signs of a hypocrite are three: when he speaks he lies, when he makes a promise he breaks it, and when he is trusted he betrays."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Faith',
    grade: 'Sahih'
  },
  {
    id: '9',
    title: 'Seeking Knowledge',
    narrator: 'Abu Hurairah',
    text: 'The Prophet ﷺ said: "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise."',
    source: 'Sahih Muslim',
    chapter: 'Book of Knowledge',
    grade: 'Sahih'
  },
  {
    id: '10',
    title: 'Rights of a Muslim',
    narrator: 'Abu Hurairah',
    text: 'The Prophet ﷺ said: "The rights of a Muslim upon another Muslim are six: When you meet him, greet him with peace; when he invites you, accept his invitation; when he seeks your advice, give him sincere advice; when he sneezes and praises Allah, respond to him with mercy; when he is sick, visit him; and when he dies, follow his funeral."',
    source: 'Sahih Muslim',
    chapter: 'Book of Greetings',
    grade: 'Sahih'
  },
  {
    id: '11',
    title: 'Cleanliness',
    narrator: 'Abu Malik Al-Ashari',
    text: 'The Prophet ﷺ said: "Cleanliness is half of faith."',
    source: 'Sahih Muslim',
    chapter: 'Book of Purification',
    grade: 'Sahih'
  },
  {
    id: '12',
    title: 'Good Words',
    narrator: 'Abu Hurairah',
    text: 'The Prophet ﷺ said: "Whoever believes in Allah and the Last Day, let him speak good or remain silent."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Good Manners',
    grade: 'Sahih'
  },
  {
    id: '13',
    title: 'Mercy to Creation',
    narrator: 'Abdullah ibn Amr',
    text: 'The Prophet ﷺ said: "The merciful ones will be shown mercy by the Most Merciful. Be merciful to those on earth, and the One in the heavens will be merciful to you."',
    source: 'Sunan Abu Dawud',
    chapter: 'Book of Good Manners',
    grade: 'Sahih'
  },
  {
    id: '14',
    title: 'Value of Time',
    narrator: 'Ibn Abbas',
    text: 'The Prophet ﷺ said: "There are two blessings which many people lose: health and free time."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Heart-Softeners',
    grade: 'Sahih'
  },
  {
    id: '15',
    title: 'Brotherhood in Islam',
    narrator: 'An-Numan bin Bashir',
    text: 'The Prophet ﷺ said: "The believers in their mutual kindness, compassion and sympathy are just like one body. When one of the limbs suffers, the whole body responds to it with wakefulness and fever."',
    source: 'Sahih al-Bukhari',
    chapter: 'Book of Good Manners',
    grade: 'Sahih'
  }
];

export function Hadith() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('hadith-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hadith-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev =>
      prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };

  const sources = Array.from(new Set(hadiths.map(h => h.source)));

  const filteredHadiths = hadiths.filter(hadith =>
    (selectedSource === 'all' || hadith.source === selectedSource) &&
    (hadith.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
     hadith.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-emerald-600 mr-3" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Hadith Collection</h1>
              <p className="text-gray-600 mt-1">Prophetic Traditions and Sayings</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search hadith..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Sources</option>
            {sources.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredHadiths.map((hadith) => (
            <div
              key={hadith.id}
              className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{hadith.title}</h3>
                  <p className="text-sm text-gray-600">Narrated by {hadith.narrator}</p>
                </div>
                <button
                  onClick={() => toggleBookmark(hadith.id)}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      bookmarks.includes(hadith.id)
                        ? 'fill-emerald-600 text-emerald-600'
                        : ''
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-700 mb-4">{hadith.text}</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <span>{hadith.source}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{hadith.chapter}</span>
                </div>
                {hadith.grade && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded w-fit">
                    {hadith.grade}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}