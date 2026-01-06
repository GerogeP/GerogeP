export interface Student {
  name: string;
}

export interface Lesson {
  id: string;
  date: string;
  type: 'Historic' | 'Upcoming' | 'Available' | 'Today';
  subject: string;
  students: string[];
  tutor: string | null;
  status: string;
  difficulty?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface ApiError {
  detail: string;
}
