import { useState } from 'react';
import { Project } from '../services/api';
import { ChevronLeft, Menu, CheckCircle2 } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
}

const mockModules: Module[] = [
  {
    id: '1',
    title: 'Modul 1',
    lessons: [
      { id: '1-1', title: 'Dars 1 - Cloud yaratish', type: 'video', duration: '10 daqiqa', completed: true },
      { id: '1-2', title: 'Dars 2 - Server yaratish', type: 'video', duration: '15 daqiqa', completed: false },
      { id: '1-3', title: 'Dars 3 - VPS yaratish', type: 'video', duration: '12 daqiqa', completed: false },
      { id: '1-4', title: 'Dars 4 - VPS yaratish', type: 'video', duration: '20 daqiqa', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Modul 2',
    lessons: [
      { id: '2-1', title: 'Dars 1 - Cloud yaratish', type: 'video', duration: '10 daqiqa', completed: false },
      { id: '2-2', title: 'Dars 2 - Server yaratish', type: 'video', duration: '15 daqiqa', completed: false },
      { id: '2-3', title: 'Dars 3 - DNS yaratish', type: 'video', duration: '18 daqiqa', completed: false },
    ],
  },
];

export default function CourseDetailPage({
  course,
  onBack,
  onSelectLesson
}: {
  course: Project;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}) {
  const [expandedModule, setExpandedModule] = useState<string | null>('1');

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

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
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">IMG</span>
              </div>
              <h2 className="font-semibold text-gray-900 mb-2">{course.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="text-sm text-gray-700">
                <p>Kurs narxi: <span className="font-semibold">250$</span></p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              {mockModules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                  >
                    <span>{module.title}</span>
                    <ChevronLeft
                      className={`w-5 h-5 transition-transform ${expandedModule === module.id ? '-rotate-90' : 'rotate-180'}`}
                    />
                  </button>

                  {expandedModule === module.id && (
                    <div className="border-t border-gray-200">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          className="w-full px-6 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="mt-0.5">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
