'use client'

import NextLink from "next/link";
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import ThemeToggle from "./themetoggle";

export const Navbar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <nav className="flex items-center justify-between w-full h-20 px-6 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 shadow-sm relative z-50 transition-colors duration-300">

      {/* 左侧 Logo */}
      <div className="flex-shrink-0 w-48 flex items-center">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight transition-colors duration-300">
          Tutor Portal
        </h1>
      </div>

      {/* 中间导航链接 - 横向排列 */}
      <div className="flex-1 flex items-center justify-center space-x-6 px-6">
        <NextLink
          href="/dashboard"
          className={`
            px-4 py-2 rounded-md transition-all duration-200 font-medium whitespace-nowrap
            ${pathname === '/dashboard'
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-gray-800'
            }
          `}
        >
          Dashboard
        </NextLink>

        <NextLink
          href="/login"
          className={`
            px-4 py-2 rounded-md transition-all duration-200 font-medium whitespace-nowrap
            ${pathname === '/login'
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-gray-800'
            }
          `}
        >
          LogIn
        </NextLink>
      </div>

      {/* 右侧登录按钮和主题切换 */}
      <div className="flex-shrink-0 w-32 flex items-center justify-end space-x-3">
        <ThemeToggle />
      </div>
    </nav>
  );
};
