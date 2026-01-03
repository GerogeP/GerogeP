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
    if (type === 'Available') return 'bg-green-100 text-green-800';
    if (type === 'Historic') return 'bg-gray-100 text-gray-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    return 'bg-indigo-100 text-indigo-800';
  };

  const canTakeLesson = lesson.type === 'Available' && !lesson.tutor;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {lesson.subject}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            📅 {formatDate(lesson.date)}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            👤 Tutor: {lesson.tutor || 'Unassigned'}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status, lesson.type)}`}>
          {lesson.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Students:</span>
          {lesson.students.length > 0 ? (
            <span className="ml-1">{lesson.students.join(', ')}</span>
          ) : (
            <span className="ml-1 text-gray-500 italic">No students assigned</span>
          )}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Status:</span>
          <span className="ml-1">{lesson.status}</span>
        </p>
      </div>

      {canTakeLesson && (
        <button
          onClick={() => onTakeLesson(lesson.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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