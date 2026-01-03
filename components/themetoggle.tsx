'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 避免服务端与客户端不一致导致的闪屏
  useEffect(() => setMounted(true), []);

  const handleThemeToggle = () => {
    setIsAnimating(true);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    
    // 动画完成后重置状态
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className={`
        relative w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
        ${isAnimating ? 'scale-95' : 'scale-100'}
        shadow-sm hover:shadow-md
      `}
      aria-label={`切换到${theme === 'dark' ? '浅色' : '深色'}主题`}
      title={`切换到${theme === 'dark' ? '浅色' : '深色'}主题`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 太阳图标 - 在浅色主题时显示 */}
        <Sun 
          className={`
            absolute w-4 h-4 transition-all duration-300 ease-in-out
            ${theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
        
        {/* 月亮图标 - 在深色主题时显示 */}
        <Moon 
          className={`
            absolute w-4 h-4 transition-all duration-300 ease-in-out
            ${theme === 'light' ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
      </div>
      
      {/* 装饰性光晕效果 */}
      <div className={`
        absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
        ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-yellow-400/20'}
        ${isAnimating ? 'opacity-100' : 'hover:opacity-50'}
      `} />
    </button>
  );
}