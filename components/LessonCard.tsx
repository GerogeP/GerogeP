'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { Lesson } from '../types/lesson';

interface LessonCardProps {
  lesson: Lesson;
  onTakeLesson: (lessonId: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onTakeLesson }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy • h:mm a');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string, type: string) => {
    if (type === 'Available') return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (type === 'Historic') return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    if (status === 'In Progress') return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200';
  };

  const canTakeLesson = lesson.type === 'Available' && !lesson.tutor;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            {lesson.subject}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 transition-colors duration-300">
            📅 {formatDate(lesson.date)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 transition-colors duration-300">
            👤 Tutor: {lesson.tutor || 'Unassigned'}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status, lesson.type)}`}>
          {lesson.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
          <span className="font-medium">Students:</span>
          {lesson.students.length > 0 ? (
            <span className="ml-1">{lesson.students.join(', ')}</span>
          ) : (
              <span className="ml-1 text-gray-500 dark:text-gray-400 italic transition-colors duration-300">No students assigned</span>
          )}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <span className="font-medium">Status:</span>
          <span className="ml-1">{lesson.status}</span>
        </p>
      </div>

      {canTakeLesson && (
        <button
          onClick={() => onTakeLesson(lesson.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Take Class
        </button>
      )}

      {!canTakeLesson && lesson.type === 'Available' && lesson.tutor && (
        <div className="text-center text-sm text-gray-500 italic">
          Already taken by {lesson.tutor}
        </div>
      )}
    </div>
  );
};

export default LessonCard;