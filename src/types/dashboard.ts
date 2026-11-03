export interface StatMetric {
  id: string;
  title: string;
  value: string;
  change: number; // e.g. +14.2
  isPositive: boolean;
  timeframe: string;
  iconName: string;
  sparkline: number[];
  color: string;
}

export interface ChartDataPoint {
  label: string;
  revenue: number;
  orders: number;
  apiRequests: number;
}

export type ActivityType = 'success' | 'warning' | 'info' | 'error';

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: ActivityType;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Project Lead' | 'Staff Engineer' | 'Product Manager' | 'Analyst';
  status: 'Active' | 'Pending' | 'Suspended';
  joinDate: string;
  avatar: string;
  lastActive: string;
}

export interface SystemMetric {
  name: string;
  percentage: number;
  statusText: string;
  statusColor: 'green' | 'yellow' | 'red';
}
