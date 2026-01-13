'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { lessonService } from '../../services/lessonService';

const LoginedPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 z-50">
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl flex flex-col items-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
            Already Logged In
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Go to ashboard
          </button>
          <button
            onClick={() => lessonService.logout()}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
          >
            Logout and re-login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginedPage;