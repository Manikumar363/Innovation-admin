import type { AuthResponse, LoginCredentials, User } from '../types/auth';

const STORAGE_KEY = 'innovation_admin_auth';

// Demo users database for local development and testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@mobtakergroup.com': {
    password: 'admin123',
    user: {
      id: 'usr_001',
      name: 'Mobtaker Administrator',
      email: 'admin@mobtakergroup.com',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      department: 'Executive Administration',
      lastLogin: 'Just now',
    },
  },
  'test.admin@mobtakergroup.com': {
    password: 'admin123',
    user: {
      id: 'usr_002',
      name: 'Mobtaker Test Admin',
      email: 'test.admin@mobtakergroup.com',
      role: 'System Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      department: 'Platform Testing',
      lastLogin: 'Just now',
    },
  },
  'admin@mobtaker.com': {
    password: 'admin123',
    user: {
      id: 'usr_003',
      name: 'Mobtaker Administrator',
      email: 'admin@mobtaker.com',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      department: 'Executive Administration',
      lastLogin: 'Just now',
    },
  },
};

/**
 * Authentication Service
 * Currently runs with simulated network latency and mock store.
 * To integrate with real API:
 * Replace mock return values with fetch(`${API_BASE}/auth/login`, { ... })
 */
export const authService = {
  /**
   * Log in user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate network roundtrip (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const email = credentials.email.trim().toLowerCase();
    const demoAccount = DEMO_USERS[email];

    if (!demoAccount) {
      throw new Error('User not found. Use admin@mobtakergroup.com (pass: admin123)');
    }

    if (demoAccount.password !== credentials.password) {
      throw new Error('Invalid password. Please check your credentials.');
    }

    const authResponse: AuthResponse = {
      token: `inv_jwt_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      user: {
        ...demoAccount.user,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };

    // Save auth session
    if (credentials.rememberMe) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authResponse));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authResponse));
    }

    return authResponse;
  },

  /**
   * Check if a session already exists on load
   */
  getStoredAuth(): AuthResponse | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as AuthResponse;
    } catch {
      return null;
    }
  },

  /**
   * Log out and clear persisted credentials
   */
  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Demo accounts helper for UI quick-login pills
   */
  getDemoCredentials() {
    return [
      { email: 'admin@mobtakergroup.com', pass: 'admin123', label: 'Super Admin' },
      { email: 'test.admin@mobtakergroup.com', pass: 'admin123', label: 'Test Admin' },
      { email: 'admin@mobtaker.com', pass: 'admin123', label: 'Admin (Alias)' },
    ];
  },
};
