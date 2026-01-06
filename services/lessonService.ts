import axios from 'axios';
import { Lesson, LoginRequest, LoginResponse } from '../types/lesson';
import { mockLessonService } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 判断是否使用模拟数据（静态部署时使用模拟数据）
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || 
                      typeof window !== 'undefined';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const lessonService = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (USE_MOCK_DATA) {
      return mockLessonService.login(credentials);
    }
    const response = await api.post('/api/login', credentials);
    return response.data;
  },

  // Get all lessons
  async getLessons(): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockLessonService.getLessons();
    }
    const response = await api.get('/api/lessons');
    return response.data;
  },

  // Get filtered lessons
  async getFilteredLessons(type?: string, month?: string): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockLessonService.getFilteredLessons(type, month);
    }
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (month) params.append('month', month);
    
    const response = await api.get(`/api/lessons/filter?${params.toString()}`);
    return response.data;
  },

  // Get lessons by type
  async getHistoricLessons(): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockLessonService.getHistoricLessons();
    }
    const response = await api.get('/api/lessons/historic');
    return response.data;
  },

  async getUpcomingLessons(): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockLessonService.getUpcomingLessons();
    }
    const response = await api.get('/api/lessons/upcoming');
    return response.data;
  },

  async getAvailableLessons(): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockLessonService.getAvailableLessons();
    }
    const response = await api.get('/api/lessons/available');
    return response.data;
  },

  async getTodayLessons(): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockLessonService.getTodayLessons();
    }
    const response = await api.get('/api/lessons/today');
    return response.data;
  },

  // Take an available lesson
  async takeLesson(lessonId: string): Promise<{ message: string }> {
    if (USE_MOCK_DATA) {
      return mockLessonService.takeLesson(lessonId);
    }
    const response = await api.post(`/api/lessons/${lessonId}/take`);
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (USE_MOCK_DATA) {
      return mockLessonService.isAuthenticated();
    }
    return !!localStorage.getItem('authToken');
  },

  // Logout
  logout(): void {
    if (USE_MOCK_DATA) {
      mockLessonService.logout();
      return;
    }
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
};

export default api;