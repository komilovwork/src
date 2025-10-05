import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonViewPage from './pages/LessonViewPage';
import { Project } from './services/api';

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
}

function AppContent() {
  const { user, isLoading } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Project | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (selectedLesson) {
    return (
      <LessonViewPage
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  if (selectedCourse) {
    return (
      <CourseDetailPage
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        onSelectLesson={(lesson) => setSelectedLesson(lesson)}
      />
    );
  }

  return <CoursesPage onSelectCourse={(course) => setSelectedCourse(course)} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
