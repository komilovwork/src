import { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import TestModal from '../components/TestModal';

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
}

const codeExample = `# İş, cd, touch, mkdir

İş teşkilatchiligini qurish va fayllar sistemasi va arxiv fayl əvvəzləndirə.

hello hello.txt
hello
hello.txt

mkdir newdir
mkdir newdir
...`;

export default function LessonViewPage({
  lesson,
  onBack
}: {
  lesson: Lesson;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'content' | 'tasks'>('content');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testsCompleted, setTestsCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">O.AVG</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-gray-900">Bosh sahifa</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Kurslar</a>
            </nav>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Orqaga</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <span className="text-white text-lg">Video Player</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 flex">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'content'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mavzu
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'tasks'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Topshiriqlar
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'content' ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{lesson.title}</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-4">
                        İş teşkilatchiligini qurish va fayllar sistemasi va arxiv fayl əvvəzləndirə analiz əsas parametrləri.
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="text-gray-700">
                          <span className="font-medium">mkdir</span> - manual katalog yaratish sayıları parametrğa va arxiv fayl parametrlərdə analiz
                        </li>
                      </ul>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm font-mono whitespace-pre">
                          {codeExample}
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Topshiriqlar</h2>
                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Topshiriq 1</h3>
                        <p className="text-gray-700 text-sm">
                          mkdir buyrug'i yordamida yangi papka yarating va uning ichiga 3ta fayl joylang.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Topshiriq 2</h3>
                        <p className="text-gray-700 text-sm">
                          cd buyrug'i bilan yaratilgan papkaga kiring va touch buyrug'i yordamida 3ta fayl yarating.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsTestModalOpen(true)}
                      className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Tekshirish
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Darslar ro'yxati</h3>
              <div className="space-y-2 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                </div>
                <button
                  disabled={!testsCompleted}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    testsCompleted
                      ? 'hover:bg-gray-50 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed bg-gray-100'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-700">Keyingi dars</p>
                  <p className="text-xs text-gray-500">
                    {testsCompleted ? '15 daqiqa' : 'Testlardan o\'ting'}
                  </p>
                </button>
              </div>
              {testsCompleted && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    Tabriklaymiz! Keyingi darsga o'tishingiz mumkin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <TestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onComplete={() => {
          setTestsCompleted(true);
          setIsTestModalOpen(false);
        }}
      />
    </div>
  );
}
