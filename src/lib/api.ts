/**
 * Central API & Storage Library
 * Provides authentication, token management, and mock endpoints
 * structured for Mobtaker Group Admin seamless API integration.
 */

import { API_BASE } from '../config/api';
import { toast } from 'react-toastify';

export interface StoredUser {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'agent' | 'university' | 'counsellor' | 'admin' | string;
  businessType?: 'b2b' | 'b2c' | null;
  agentBusinessType?: 'b2b' | 'b2c' | null;
  universityName?: string;
  profileImage?: string;
}

export interface LoginParams {
  email: string;
  password: string;
  role?: string;
}

export interface LoginResult {
  token: string;
  user: StoredUser;
  message?: string;
}

// Token & Session Storage Keys
const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';
const ROLE_KEY = 'userRole';

export const storeAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
  sessionStorage.clear();
};

export const storeUserData = (user: StoredUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (user.role) {
    localStorage.setItem(ROLE_KEY, user.role);
  }
};

export const getStoredUserData = (): StoredUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.email && (parsed.email.includes('aega') || parsed.email.includes('innovation.com'))) {
      parsed.email = 'admin@mobtakergroup.com';
      parsed.name = 'Mobtaker Administrator';
      parsed.fullName = 'Mobtaker Administrator';
      localStorage.setItem(USER_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return Boolean(getAuthToken() && getStoredUserData());
};

// Demo Users for Instant Testing (Mobtaker Group)
const DEMO_ACCOUNTS: Record<string, { pass: string; user: StoredUser }> = {
  // Mobtaker Main Admin
  'admin@mobtakergroup.com': {
    pass: 'admin123',
    user: {
      id: 'admin_01',
      name: 'Mobtaker Administrator',
      fullName: 'Mobtaker Administrator',
      firstName: 'Mobtaker',
      lastName: 'Admin',
      email: 'admin@mobtakergroup.com',
      role: 'admin',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  // Mobtaker Test Admin
  'test.admin@mobtakergroup.com': {
    pass: 'admin123',
    user: {
      id: 'admin_02',
      name: 'Mobtaker Test Admin',
      fullName: 'Mobtaker Test Admin',
      firstName: 'Mobtaker',
      lastName: 'Admin',
      email: 'test.admin@mobtakergroup.com',
      role: 'admin',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  // Mobtaker Alias
  'admin@mobtaker.com': {
    pass: 'admin123',
    user: {
      id: 'admin_03',
      name: 'Mobtaker Administrator',
      fullName: 'Mobtaker Administrator',
      firstName: 'Mobtaker',
      lastName: 'Admin',
      email: 'admin@mobtaker.com',
      role: 'admin',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  // Mobtaker QA & Testing Account
  'test@mobtakergroup.com': {
    pass: 'admin123',
    user: {
      id: 'admin_04',
      name: 'Mobtaker QA Admin',
      fullName: 'Mobtaker QA Admin',
      firstName: 'Mobtaker',
      lastName: 'Admin',
      email: 'test@mobtakergroup.com',
      role: 'admin',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
};

/**
 * Login Service
 * Ready to integrate with real API endpoint:
 * const res = await fetch(`${API_BASE_URL}/api/auth/login`, { method: 'POST', body: JSON.stringify(data) })
 */
export const login = async (data: LoginParams): Promise<LoginResult> => {
  // Simulate network latency (400ms)
  await new Promise((r) => setTimeout(r, 400));

  const email = data.email.toLowerCase().trim();
  const found = DEMO_ACCOUNTS[email];

  if (found) {
    if (found.pass !== data.password) {
      throw new Error('Invalid password. Please check your credentials.');
    }

    const token = `mobtaker_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const userToStore = {
      ...found.user,
      role: data.role || found.user.role || 'admin',
    };

    return { token, user: userToStore };
  }

  // Allow custom email login as well for easy testing
  if (data.password.length >= 6) {
    const cleanName = email.split('@')[0].replace('.', ' ');
    const capitalizedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    const token = `mobtaker_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const user: StoredUser = {
      id: `usr_${Date.now()}`,
      name: capitalizedName || 'Mobtaker Administrator',
      fullName: capitalizedName || 'Mobtaker Administrator',
      email: email,
      role: data.role || 'admin',
      businessType: 'b2b',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    return { token, user };
  }

  throw new Error('Invalid credentials. Password must be at least 6 characters.');
};

/**
 * Global Dashboard Mock Search Engine
 * Simulates backend search across agents, universities, companies, students, and courses
 */
export const searchDashboard = async (query: string) => {
  await new Promise((r) => setTimeout(r, 150));
  const q = query.toLowerCase().trim();

  const mockAgents = [
    { _id: '1', firstName: 'Elena', lastName: 'Rostova', email: 'elena.r@globalagents.com', country: 'United Kingdom' },
    { _id: '2', firstName: 'Marcus', lastName: 'Vance', email: 'marcus.v@vanceedu.com', country: 'Australia' },
    { _id: '3', firstName: 'Aisha', lastName: 'Patel', email: 'aisha.p@pateladvisors.in', country: 'India' },
  ].filter((a) => `${a.firstName} ${a.lastName} ${a.email} ${a.country}`.toLowerCase().includes(q));

  const mockUnis = [
    { _id: 'u1', universityName: 'University of Birmingham', email: 'admissions@bham.ac.uk', country: 'UK' },
    { _id: 'u2', universityName: 'King\'s College London', email: 'agents@kcl.ac.uk', country: 'UK' },
    { _id: 'u3', universityName: 'Durham University', email: 'international@durham.ac.uk', country: 'UK' },
  ].filter((u) => `${u.universityName} ${u.email}`.toLowerCase().includes(q));

  const mockCompanies = [
    { _id: 'c1', companyName: 'Global Study Group Ltd', emailId: 'contact@globalstudy.co.uk', country: 'Global' },
    { _id: 'c2', companyName: 'Beacon Education Partners', emailId: 'info@beaconedu.com', country: 'Singapore' },
  ].filter((c) => `${c.companyName} ${c.emailId}`.toLowerCase().includes(q));

  const mockStudents = [
    { _id: 's1', firstName: 'Liam', lastName: 'Davies', emailId: 'liam.d@gmail.com', mobileNumber: '+44 7911 123456' },
    { _id: 's2', firstName: 'Zara', lastName: 'Ahmed', emailId: 'zara.a@outlook.com', mobileNumber: '+44 7922 654321' },
  ].filter((s) => `${s.firstName} ${s.lastName} ${s.emailId}`.toLowerCase().includes(q));

  const mockCourses = [
    { _id: 'crs1', courseName: 'UKVI Compliance Standards 2026', modules: 6, timeInHr: 12 },
    { _id: 'crs2', courseName: 'Ethical Agent Recruitment Best Practices', modules: 4, timeInHr: 8 },
  ].filter((c) => c.courseName.toLowerCase().includes(q));

  return {
    agents: mockAgents,
    universities: mockUnis,
    companies: mockCompanies,
    students: mockStudents,
    courses: mockCourses,
  };
};


// Additional helpers for Dashboard integration
export const getAdminData = (): StoredUser | null => {
  return getStoredUserData();
};

export const getUserRole = (): string => {
  if (typeof window === 'undefined') return 'admin';
  return localStorage.getItem('userRole') || getStoredUserData()?.role || 'admin';
};

/**
 * Universal apiFetch helper
 * Supports real backend API endpoints or dynamic simulated state for testing
 */
let mockActiveOrders = [
  {
    _id: "ORD-9481",
    invoiceNo: "INV-2026-091",
    shippingAddress: { name: "Sarah Jenkins (UKVI Applicant)" },
    deliveryType: "Express",
    pricing: { grandTotal: "14,500.00" },
    status: "accepted",
    deliveryPartner: { firstName: "David", lastName: "Chen" },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "ORD-9482",
    invoiceNo: "INV-2026-092",
    shippingAddress: { name: "Mohammed Al-Fayed (Direct Master's)" },
    deliveryType: "Next-Day",
    pricing: { grandTotal: "18,200.00" },
    status: "ready_to_pickup",
    deliveryPartner: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "ORD-9483",
    invoiceNo: "INV-2026-093",
    shippingAddress: { name: "Ananya Sharma (Foundation Course)" },
    deliveryType: "Standard",
    pricing: { grandTotal: "9,800.00" },
    status: "pending",
    deliveryPartner: null,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    _id: "ORD-9484",
    invoiceNo: "INV-2026-094",
    shippingAddress: { name: "Lucas Vance (BSc Computer Science)" },
    deliveryType: "Express",
    pricing: { grandTotal: "22,000.00" },
    status: "out for delivery",
    deliveryPartner: { firstName: "Elena", lastName: "Rostova" },
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    _id: "ORD-9485",
    invoiceNo: "INV-2026-095",
    shippingAddress: { name: "Chen Wei (Pre-Sessional English)" },
    deliveryType: "Next-Day",
    pricing: { grandTotal: "6,400.00" },
    status: "delivered",
    deliveryPartner: { firstName: "Marcus", lastName: "Vance" },
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
];

const mockDeliveryPartners = [
  { _id: "dp_01", firstName: "David", lastName: "Chen", phone: "+44 7911 112233" },
  { _id: "dp_02", firstName: "Elena", lastName: "Rostova", phone: "+44 7922 445566" },
  { _id: "dp_03", firstName: "Marcus", lastName: "Vance", phone: "+44 7933 778899" },
  { _id: "dp_04", firstName: "Aisha", lastName: "Patel", phone: "+44 7944 990011" },
];

export async function apiFetch<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options?.headers as any) || {}),
  };

  // Try real API endpoint first if configured
  const apiBase = (typeof window !== 'undefined' && (window as any)?.__API_BASE__) || API_BASE;
  
  if (endpoint.startsWith('/api/order/assign-delivery-partner') && options?.body) {
    try {
      const parsed = JSON.parse(options.body as string);
      const partner = mockDeliveryPartners.find(p => p._id === parsed.deliveryPartnerId);
      mockActiveOrders = mockActiveOrders.map(order => {
        if (order._id === parsed.orderId || order.invoiceNo === parsed.orderId) {
          return {
            ...order,
            status: 'accepted_by_delivery_partner',
            deliveryPartner: partner ? { firstName: partner.firstName, lastName: partner.lastName } : null,
          };
        }
        return order;
      });
      return ({ success: true, message: 'Assigned successfully' } as unknown as T);
    } catch {
      return ({ success: true, message: 'Assigned successfully' } as unknown as T);
    }
  }

  if (endpoint.includes('/api/delivery-partner/available-delivery-partners')) {
    return ({ success: true, deliveryPartners: mockDeliveryPartners } as unknown as T);
  }

  if (endpoint.includes('/api/order/order-history')) {
    return ({ success: true, data: mockActiveOrders } as unknown as T);
  }

  if (endpoint.includes('/api/admin/dashboard-stats')) {
    return ({
      success: true,
      data: {
        activeUsers: 148,
        totalOrders: 324,
        inventoryAlerts: 3,
        totalTransactions: 218,
        totalRevenue: 284500.0,
        expressOrders: 86,
        nextDayOrders: 112,
        todaysRevenue: 18400.0,
        bulkOrders: 24,
      },
    } as unknown as T);
  }

  try {
    const res = await fetch(`${apiBase}${endpoint}`, { ...options, headers });
    if (res.ok) {
      return (await res.json()) as T;
    }
    if (res.status === 404) {
      toast.error(`404: Endpoint not found (${endpoint})`);
    } else {
      toast.error(`Request failed with status ${res.status}`);
    }
  } catch (err) {
    // Network or server offline
    console.warn(`[API] Endpoint unavailable: ${endpoint}`, err);
  }

  return ({ success: false, message: 'Endpoint unavailable' } as unknown as T);
}
