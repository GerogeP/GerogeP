import { Lesson, LoginRequest, LoginResponse } from '../types/lesson';

// 模拟数据 - 模拟课程数据，分布在1-12月
const mockLessons: Lesson[] = [
  {
    id: '1',
    date: '2024-01-15T14:00:00Z',
    type: 'Available',
    subject: 'Introduction to TypeScript',
    students: [],
    tutor: null,
    status: 'Open for enrollment',
    difficulty: 'beginner'
  },
  {
    id: '2',
    date: '2024-02-16T09:00:00Z',
    type: 'Upcoming',
    subject: 'React Advanced Patterns',
    students: ['Alice', 'Bob', 'Charlie'],
    tutor: 'John Smith',
    status: 'Confirmed',
    difficulty: 'advanced'
  },
  {
    id: '3',
    date: '2024-03-10T16:00:00Z',
    type: 'Historic',
    subject: 'Next.js 13 Masterclass',
    students: ['David', 'Eva', 'Frank', 'Grace'],
    tutor: 'Jane Doe',
    status: 'Completed',
    difficulty: 'intermediate'
  },
  {
    id: '4',
    date: new Date().toISOString(),
    type: 'Today',
    subject: 'CSS Grid Layout',
    students: ['Henry', 'Ivy', 'Jack'],
    tutor: 'Bob Wilson',
    status: 'In Progress',
    difficulty: 'beginner'
  },
  {
    id: '5',
    date: '2024-04-18T11:00:00Z',
    type: 'Today',
    subject: 'Node.js Performance',
    students: ['Kate', 'Leo'],
    tutor: 'Alice Brown',
    status: 'Starting Soon',
    difficulty: 'advanced'
  },
  {
    id: '6',
    date: '2024-05-20T11:00:00Z',
    type: 'Upcoming',
    subject: 'GraphQL Fundamentals',
    students: ['Mia', 'Noah', 'Olivia'],
    tutor: 'Charlie Davis',
    status: 'Confirmed',
    difficulty: 'intermediate'
  },
  {
    id: '7',
    date: '2024-06-05T14:00:00Z',
    type: 'Historic',
    subject: 'Docker for Developers',
    students: ['Peter', 'Quinn', 'Rachel', 'Sam', 'Tina'],
    tutor: 'Eva Green',
    status: 'Completed',
    difficulty: 'intermediate'
  },
  {
    id: '8',
    date: '2024-07-25T10:00:00Z',
    type: 'Available',
    subject: 'AWS Cloud Essentials',
    students: [],
    tutor: null,
    status: 'Open for enrollment',
    difficulty: 'intermediate'
  },
  {
    id: '9',
    date: '2024-08-08T13:00:00Z',
    type: 'Today',
    subject: 'Testing with Jest',
    students: ['Uma', 'Victor'],
    tutor: 'Frank Miller',
    status: 'Starting Soon',
    difficulty: 'intermediate'
  },
  {
    id: '10',
    date: '2024-09-18T15:00:00Z',
    type: 'Upcoming',
    subject: 'MongoDB Basics',
    students: ['Wendy', 'Xavier', 'Yara', 'Zack'],
    tutor: 'Grace Lee',
    status: 'Confirmed',
    difficulty: 'beginner'
  },
  {
    id: '11',
    date: '2024-10-22T13:00:00Z',
    type: 'Available',
    subject: 'Python for Data Science',
    students: [],
    tutor: null,
    status: 'Open for enrollment',
    difficulty: 'beginner'
  },
  {
    id: '12',
    date: '2024-11-08T10:00:00Z',
    type: 'Historic',
    subject: 'Vue.js Fundamentals',
    students: ['Nick', 'Opal'],
    tutor: 'Henry Taylor',
    status: 'Completed',
    difficulty: 'intermediate'
  },
  {
    id: '13',
    date: '2024-12-12T09:00:00Z',
    type: 'Upcoming',
    subject: 'Machine Learning Basics',
    students: ['Quinn', 'Rose'],
    tutor: 'Sarah Johnson',
    status: 'Confirmed',
    difficulty: 'advanced'
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
    // Use relative path or get basePath from window
    const basePath = window.location.pathname.split('/')[1] || '';
    window.location.href = basePath ? `/${basePath}/login` : '/login';
  }
};

export default mockLessonService;
