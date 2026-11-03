import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  CheckCircle,
  Info,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  FileText,
  Clock
} from 'lucide-react';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { getStoredUserData } from '../lib/api';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'success' | 'info' | 'purple';
}

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_1',
    user: {
      name: 'Mobtaker Administrator',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    action: 'updated Contact Us & Corporate Office details on',
    target: 'Contact Page',
    timestamp: 'Just now',
    type: 'success',
  },
  {
    id: 'act_2',
    user: {
      name: 'Mobtaker Administrator',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    action: 'published 6 partner brands on',
    target: 'Partners Section',
    timestamp: '25 minutes ago',
    type: 'success',
  },
  {
    id: 'act_3',
    user: {
      name: 'System Bot',
      role: 'Automated Service',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    },
    action: 'completed scheduled database synchronization for',
    target: 'CMS Repository & Media Assets',
    timestamp: '1 hour ago',
    type: 'info',
  },
  {
    id: 'act_4',
    user: {
      name: 'Elena Rostova',
      role: 'Content Editor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    action: 'updated Leadership and Management Team profiles on',
    target: 'About Us Page',
    timestamp: '3 hours ago',
    type: 'purple',
  },
  {
    id: 'act_5',
    user: {
      name: 'Mobtaker Administrator',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    action: 'configured Medical Equipment catalog & specifications in',
    target: 'Products / Shop',
    timestamp: '5 hours ago',
    type: 'success',
  },
  {
    id: 'act_6',
    user: {
      name: 'System Bot',
      role: 'Automated Service',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    },
    action: 'verified SSL certificate and security integrity for',
    target: 'Public Web Portal & APIs',
    timestamp: 'Yesterday',
    type: 'info',
  },
  {
    id: 'act_7',
    user: {
      name: 'Mobtaker Administrator',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    action: 'updated Hero headline and Three Specialized Divisions on',
    target: 'Home Page',
    timestamp: '2 days ago',
    type: 'success',
  },
];

export const DashboardPage: React.FC = () => {
  const [activities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userName, setUserName] = useState<string>('Administrator');

  useEffect(() => {
    document.title = 'Dashboard | Mobtaker Group';
    const user = getStoredUserData();
    if (user) {
      const name = user.fullName || user.name || (user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '');
      if (name) setUserName(name);
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const renderBadge = (type: ActivityItem['type']) => {
    switch (type) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
            <CheckCircle className="w-3 h-3" />
            <span>Success</span>
          </span>
        );
      case 'purple':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Updated</span>
          </span>
        );
      case 'info':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
            <Info className="w-3 h-3" />
            <span>System</span>
          </span>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        {/* ==================== WELCOME MESSAGE ==================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14112E] via-[#100d28] to-[#0a071f] border border-white/10 p-6 sm:p-10 shadow-2xl">
          {/* Ambient lighting accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#F68E2D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, {userName} 👋
              </h1>

              <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
                Welcome to the Mobtaker Group Central Administration Portal. Monitor live system activities and public CMS events.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/cms"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F68E2D] hover:bg-[#e28124] text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#F68E2D]/20 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Manage CMS</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== LIVE ACTIVITY LOG ==================== */}
        <div className="rounded-3xl bg-[#14112E] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Activity Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F68E2D]/10 border border-[#F68E2D]/20 flex items-center justify-center text-[#F68E2D]">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Live Activity Log</h2>
                <p className="text-xs text-white/50">Realtime audit feed of recent changes and administrative events</p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Activity"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#F68E2D]' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Activity Items List */}
          <div className="space-y-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <img
                    src={act.user.avatar}
                    alt={act.user.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                    }}
                  />

                  <div className="space-y-0.5 text-xs sm:text-sm">
                    <p className="text-white font-medium leading-relaxed">
                      <span className="font-bold text-white">{act.user.name} </span>
                      <span className="text-white/70">{act.action} </span>
                      <span className="font-semibold text-[#F68E2D]">{act.target}</span>
                    </p>
                    <div className="flex items-center gap-2 text-white/40 text-[11px]">
                      <span>{act.user.role || 'Admin'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  {renderBadge(act.type)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
