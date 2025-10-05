import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api, Project } from '../services/api';
import { BookOpen, Menu } from 'lucide-react';

export default function CoursesPage({ onSelectCourse }: { onSelectCourse: (course: Project) => void }) {
  const [courses, setCourses] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, logout } = useAuth();

  useEffect(() => {
    if (accessToken) {
      api.getProjects(accessToken)
        .then(response => {
          setCourses(response.results);
        })
        .catch(error => {
          console.error('Failed to fetch courses:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [accessToken]);

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
            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Chiqish
              </button>
              <button className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Kurslar</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow text-left"
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600">Darslar soni: 10</p>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
