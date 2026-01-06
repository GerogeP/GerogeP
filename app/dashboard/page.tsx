'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Lesson } from '../../types/lesson';
import { lessonService } from '../../services/lessonService';
import LessonCard from '../../components/LessonCard';
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Loading...</div>
  </div>
);
import FilterBar from '../../components/FilterBar';
import ProtectedRoute from '../../components/ProtectedRoute';

const DashboardPage: React.FC = () => {
  const { theme } = useTheme();
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const lessons = await lessonService.getLessons();
      setAllLessons(lessons);
      setError('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch lessons';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeLesson = async (lessonId: string) => {
    try {
      await lessonService.takeLesson(lessonId);
      // Refresh lessons after taking a lesson
      await fetchLessons();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to take lesson';
      setError(errorMessage);
    }
  };

  const filteredLessons = allLessons.filter(lesson => {
    // Filter by type
    if (selectedFilter !== 'all' && lesson.type.toLowerCase() !== selectedFilter.toLowerCase()) {
      return false;
    }

    // Filter by month
    if (selectedMonth && !lesson.date.startsWith(selectedMonth)) {
      return false;
    }

    return true;
  });

  const historicLessons = filteredLessons.filter(lesson => lesson.type === 'Historic');
  const upcomingLessons = filteredLessons.filter(lesson => lesson.type === 'Upcoming');
  const availableLessons = filteredLessons.filter(lesson => lesson.type === 'Available');
  const todayLessons = filteredLessons.filter(lesson => lesson.type === 'Today');

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col items-center space-y-8 p-6">
          <div className="text-center w-fit mx-auto border-2 border-red-500 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
            <h1 className="text-3xl w-fit mx-auto font-bold text-gray-900 dark:text-white transition-colors duration-300">Tutor Dashboard</h1>
            <p className="mt-2 w-fit mx-auto text-gray-600 dark:text-gray-300 transition-colors duration-300">Manage your teaching schedule and available classes</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 transition-colors duration-300">
              <div className="text-red-800 dark:text-red-200 transition-colors duration-300">{error}</div>
            </div>
          )}

          <FilterBar
            selectedFilter={selectedFilter}
            selectedMonth={selectedMonth}
            onFilterChange={setSelectedFilter}
            onMonthChange={setSelectedMonth}
          />

          {/* Today's Lessons Section */}
          {todayLessons.length > 0 && (
            <section className="w-full max-w-7xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Today&apos;s Lessons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onTakeLesson={handleTakeLesson}
                />
              ))}
            </div>
          </section>
          )}

          {/* Upcoming Lessons Section */}
          {upcomingLessons.length > 0 && (
            <section className="w-full max-w-7xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Upcoming Lessons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onTakeLesson={handleTakeLesson}
                />
              ))}
            </div>
          </section>
          )}

        {/* Historic Lessons Section */}
        {historicLessons.length > 0 && (
            <section className="w-full max-w-7xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Historic Lessons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onTakeLesson={handleTakeLesson}
                />
              ))}
            </div>
          </section>
        )}

          {/* Available Lessons Section */}
          {availableLessons.length > 0 && (
            <section className="w-full max-w-7xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Available Lessons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableLessons.map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onTakeLesson={handleTakeLesson}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No lessons match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;