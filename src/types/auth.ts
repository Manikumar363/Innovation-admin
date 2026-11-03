export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'System Manager' | 'Developer' | 'Viewer';
  avatar: string;
  status: 'active' | 'away' | 'offline';
  department: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
