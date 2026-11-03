import type { ActivityItem, ChartDataPoint, StatMetric, SystemMetric, UserRecord } from '../types/dashboard';

// Initial mock data store
let mockUsersList: UserRecord[] = [
  {
    id: 'usr_1',
    name: 'Elena Rostova',
    email: 'elena.r@innovation.com',
    role: 'Super Admin',
    status: 'Active',
    joinDate: 'Jan 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastActive: '3 mins ago',
  },
  {
    id: 'usr_2',
    name: 'Marcus Vance',
    email: 'marcus.v@innovation.com',
    role: 'Project Lead',
    status: 'Active',
    joinDate: 'Feb 03, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastActive: '14 mins ago',
  },
  {
    id: 'usr_3',
    name: 'Aisha Patel',
    email: 'aisha.p@innovation.com',
    role: 'Staff Engineer',
    status: 'Active',
    joinDate: 'Mar 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    lastActive: '1 hour ago',
  },
  {
    id: 'usr_4',
    name: 'Kenji Takahashi',
    email: 'kenji.t@innovation.com',
    role: 'Product Manager',
    status: 'Pending',
    joinDate: 'Apr 02, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastActive: 'Yesterday',
  },
  {
    id: 'usr_5',
    name: 'Sophia Mueller',
    email: 'sophia.m@innovation.com',
    role: 'Analyst',
    status: 'Suspended',
    joinDate: 'Dec 05, 2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastActive: '5 days ago',
  },
  {
    id: 'usr_6',
    name: 'David O\'Connor',
    email: 'david.oc@innovation.com',
    role: 'Staff Engineer',
    status: 'Active',
    joinDate: 'Feb 20, 2026',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    lastActive: '4 hours ago',
  },
];

const mockActivities: ActivityItem[] = [
  {
    id: 'act_1',
    user: {
      name: 'Mobtaker Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'admin@mobtakergroup.com',
    },
    action: 'deployed microservice cluster',
    target: 'us-east-prod-v2',
    timestamp: '8 minutes ago',
    type: 'success',
  },
  {
    id: 'act_2',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'sarah.lead@innovation.com',
    },
    action: 'updated security policy for',
    target: 'API Key rotation',
    timestamp: '32 minutes ago',
    type: 'info',
  },
  {
    id: 'act_3',
    user: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'marcus.v@innovation.com',
    },
    action: 'detected rate limit threshold on',
    target: 'Gateway-Edge-04',
    timestamp: '1 hour ago',
    type: 'warning',
  },
  {
    id: 'act_4',
    user: {
      name: 'System Bot',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      email: 'system@innovation.internal',
    },
    action: 'completed scheduled backup for',
    target: 'PostgreSQL Main Cluster',
    timestamp: '3 hours ago',
    type: 'success',
  },
];

/**
 * Dashboard Service
 * Provides analytical data, KPIs, activities, and user table records.
 * Ready for future backend endpoints integration.
 */
export const dashboardService = {
  /**
   * Fetch top 4 KPI metric cards
   */
  async getMetrics(): Promise<StatMetric[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [
      {
        id: 'metric_revenue',
        title: 'Total Revenue',
        value: '$148,290',
        change: 18.4,
        isPositive: true,
        timeframe: 'vs last month',
        iconName: 'DollarSign',
        sparkline: [40, 48, 45, 60, 58, 72, 85, 94],
        color: '#6366f1', // Indigo
      },
      {
        id: 'metric_users',
        title: 'Active Users',
        value: '34,820',
        change: 12.1,
        isPositive: true,
        timeframe: 'vs last month',
        iconName: 'Users',
        sparkline: [20, 24, 30, 28, 35, 42, 49, 56],
        color: '#06b6d4', // Cyan
      },
      {
        id: 'metric_api_calls',
        title: 'API Throughput',
        value: '1.84M',
        change: -2.3,
        isPositive: false,
        timeframe: 'vs yesterday',
        iconName: 'Activity',
        sparkline: [95, 92, 88, 86, 91, 84, 82, 80],
        color: '#f59e0b', // Amber
      },
      {
        id: 'metric_uptime',
        title: 'System Health',
        value: '99.98%',
        change: 0.4,
        isPositive: true,
        timeframe: 'all nodes nominal',
        iconName: 'ShieldCheck',
        sparkline: [99, 99.5, 99.8, 99.9, 99.9, 99.95, 99.98, 99.98],
        color: '#10b981', // Emerald
      },
    ];
  },

  /**
   * Fetch chart time-series data based on time range
   */
  async getChartData(range: '7d' | '30d' | '12m'): Promise<ChartDataPoint[]> {
    await new Promise((res) => setTimeout(res, 250));
    if (range === '7d') {
      return [
        { label: 'Mon', revenue: 14200, orders: 420, apiRequests: 240000 },
        { label: 'Tue', revenue: 18400, orders: 580, apiRequests: 280000 },
        { label: 'Wed', revenue: 16900, orders: 510, apiRequests: 260000 },
        { label: 'Thu', revenue: 22800, orders: 740, apiRequests: 340000 },
        { label: 'Fri', revenue: 26500, orders: 890, apiRequests: 390000 },
        { label: 'Sat', revenue: 21100, orders: 660, apiRequests: 310000 },
        { label: 'Sun', revenue: 24300, orders: 790, apiRequests: 360000 },
      ];
    }
    if (range === '30d') {
      return [
        { label: 'Week 1', revenue: 98000, orders: 3100, apiRequests: 1400000 },
        { label: 'Week 2', revenue: 112000, orders: 3450, apiRequests: 1650000 },
        { label: 'Week 3', revenue: 134000, orders: 4100, apiRequests: 1920000 },
        { label: 'Week 4', revenue: 148290, orders: 4620, apiRequests: 2150000 },
      ];
    }
    return [
      { label: 'Jan', revenue: 78000, orders: 2400, apiRequests: 1100000 },
      { label: 'Feb', revenue: 84000, orders: 2650, apiRequests: 1250000 },
      { label: 'Mar', revenue: 95000, orders: 3000, apiRequests: 1400000 },
      { label: 'Apr', revenue: 110000, orders: 3500, apiRequests: 1600000 },
      { label: 'May', revenue: 125000, orders: 3900, apiRequests: 1800000 },
      { label: 'Jun', revenue: 148290, orders: 4620, apiRequests: 2150000 },
    ];
  },

  /**
   * Fetch recent activity log
   */
  async getActivities(): Promise<ActivityItem[]> {
    await new Promise((res) => setTimeout(res, 150));
    return [...mockActivities];
  },

  /**
   * Fetch system infrastructure metrics
   */
  async getSystemHealth(): Promise<SystemMetric[]> {
    await new Promise((res) => setTimeout(res, 150));
    return [
      { name: 'Cluster CPU Load', percentage: 28, statusText: 'Optimal (28%)', statusColor: 'green' },
      { name: 'Memory Consumption', percentage: 64, statusText: 'Normal (64%)', statusColor: 'green' },
      { name: 'Edge Storage Capacity', percentage: 41, statusText: 'Healthy (41%)', statusColor: 'green' },
      { name: 'Avg API Response', percentage: 18, statusText: '32ms (Global)', statusColor: 'green' },
    ];
  },

  /**
   * Fetch and filter users list
   */
  async getUsers(searchQuery = '', statusFilter = 'All'): Promise<UserRecord[]> {
    await new Promise((res) => setTimeout(res, 200));
    let users = [...mockUsersList];

    if (statusFilter !== 'All') {
      users = users.filter((u) => u.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
      );
    }

    return users;
  },

  /**
   * Remove a user (mock deletion for demo)
   */
  async deleteUser(id: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 200));
    mockUsersList = mockUsersList.filter((u) => u.id !== id);
    return true;
  },

  /**
   * Toggle or update user status
   */
  async updateUserStatus(id: string, status: UserRecord['status']): Promise<UserRecord | null> {
    await new Promise((res) => setTimeout(res, 200));
    const userIndex = mockUsersList.findIndex((u) => u.id === id);
    if (userIndex === -1) return null;
    mockUsersList[userIndex] = { ...mockUsersList[userIndex], status };
    return mockUsersList[userIndex];
  },
};
