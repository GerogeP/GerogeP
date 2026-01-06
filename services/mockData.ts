import { Lesson, LoginRequest, LoginResponse } from '../types/lesson';

// 模拟数据 - 模拟课程数据
const mockLessons: Lesson[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'Available',
    subject: 'Introduction to TypeScript',
    students: [],
    tutor: 'John Smith',
    status: 'Open for enrollment'
  },
  {
    id: '2',
    date: '2024-01-16',
    type: 'Upcoming',
    subject: 'React Advanced Patterns',
    students: ['Alice', 'Bob', 'Charlie'],
    tutor: 'Jane Doe',
    status: 'Confirmed'
  },
  {
    id: '3',
    date: '2024-01-10',
    type: 'Historic',
    subject: 'Next.js 13 Masterclass',
    students: ['David', 'Eva', 'Frank', 'Grace'],
    tutor: 'Bob Wilson',
    status: 'Completed'
  },
  {
    id: '4',
    date: new Date().toISOString().split('T')[0],
    type: 'Today',
    subject: 'CSS Grid Layout',
    students: ['Henry', 'Ivy', 'Jack'],
    tutor: 'Alice Brown',
    status: 'In Progress'
  },
  {
    id: '5',
    date: new Date().toISOString().split('T')[0],
    type: 'Today',
    subject: 'Node.js Performance',
    students: ['Kate', 'Leo'],
    tutor: 'Charlie Davis',
    status: 'Starting Soon'
  },
  {
    id: '6',
    date: '2024-01-20',
    type: 'Upcoming',
    subject: 'GraphQL Fundamentals',
    students: ['Mia', 'Noah', 'Olivia'],
    tutor: 'Eva Green',
    status: 'Confirmed'
  },
  {
    id: '7',
    date: '2024-01-05',
    type: 'Historic',
    subject: 'Docker for Developers',
    students: ['Peter', 'Quinn', 'Rachel', 'Sam', 'Tina'],
    tutor: 'Frank Miller',
    status: 'Completed'
  },
  {
    id: '8',
    date: '2024-01-25',
    type: 'Available',
    subject: 'AWS Cloud Essentials',
    students: [],
    tutor: 'Grace Lee',
    status: 'Open for enrollment'
  },
  {
    id: '9',
    date: new Date().toISOString().split('T')[0],
    type: 'Today',
    subject: 'Testing with Jest',
    students: ['Uma', 'Victor'],
    tutor: 'Henry Taylor',
    status: 'Starting Soon'
  },
  {
    id: '10',
    date: '2024-01-18',
    type: 'Upcoming',
    subject: 'MongoDB Basics',
    students: ['Wendy', 'Xavier', 'Yara', 'Zack'],
    tutor: 'Ivy Chen',
    status: 'Confirmed'
  }
];

// 模拟延迟（模拟网络请求延迟）
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLessonService = {
  // 模拟登录
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await delay(800); // 模拟网络延迟
    
    // 简单的验证逻辑
    if (credentials.username === 'admin' && credentials.password === 'password') {
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      return {
        success: true,
        message: 'Login successful',
        token
      };
    }
    
    if (credentials.username && credentials.password) {
      // 允许任何非空凭据登录（演示用途）
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      return {
        success: true,
        message: 'Login successful',
        token
      };
    }
    
    return {
      success: false,
      message: 'Invalid username or password'
    };
  },

  // 获取所有课程
  async getLessons(): Promise<Lesson[]> {
    await delay(600); // 模拟网络延迟
    return mockLessons;
  },

  // 获取筛选后的课程
  async getFilteredLessons(type?: string, month?: string): Promise<Lesson[]> {
    await delay(500); // 模拟网络延迟
    
    let filtered = [...mockLessons];
    
    if (type && type !== 'all') {
      filtered = filtered.filter(lesson => 
        lesson.type.toLowerCase() === type.toLowerCase()
      );
    }
    
    if (month) {
      filtered = filtered.filter(lesson => 
        lesson.date.startsWith(month)
      );
    }
    
    return filtered;
  },

  // 获取历史课程
  async getHistoricLessons(): Promise<Lesson[]> {
    await delay(500);
    return mockLessons.filter(lesson => lesson.type === 'Historic');
  },

  // 获取即将开始的课程
  async getUpcomingLessons(): Promise<Lesson[]> {
    await delay(500);
    return mockLessons.filter(lesson => lesson.type === 'Upcoming');
  },

  // 获取可用课程
  async getAvailableLessons(): Promise<Lesson[]> {
    await delay(500);
    return mockLessons.filter(lesson => lesson.type === 'Available');
  },

  // 获取今日课程
  async getTodayLessons(): Promise<Lesson[]> {
    await delay(500);
    return mockLessons.filter(lesson => lesson.type === 'Today');
  },

  // 选择课程（模拟）
  async takeLesson(lessonId: string): Promise<{ message: string }> {
    await delay(800); // 模拟网络延迟
    
    const lesson = mockLessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    
    if (lesson.type === 'Available') {
      // 模拟选择课程 - 将其标记为已选
      lesson.type = 'Upcoming';
      lesson.students.push('New Student');
      return { message: `Successfully enrolled in "${lesson.subject}"` };
    }
    
    throw new Error('Cannot enroll in this lesson');
  },

  // 检查是否已登录
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },

  // 登出
  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
};

export default mockLessonService;
