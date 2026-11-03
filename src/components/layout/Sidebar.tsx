import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FolderGit2,
  Cpu,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users & Roles', icon: Users, badge: '6' },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
  ];

  const adminNav = [
    { id: 'gateway', label: 'API Services', icon: Cpu },
    { id: 'logs', label: 'Security & Logs', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    if (mobileOpen) onCloseMobile();
  };

  return (
    <>
      <aside
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${
          mobileOpen ? 'mobile-open' : ''
        }`}
      >
        {/* Header / Brand */}
        <div className="sidebar-header">
          {!collapsed && (
            <div className="sidebar-brand">
              <div className="brand-icon-wrapper">
                <Layers size={22} />
              </div>
              <div className="brand-text">
                <span className="brand-title">Innovation</span>
                <span className="brand-subtitle">Control Center</span>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="brand-icon-wrapper" style={{ margin: '0 auto' }}>
              <Layers size={22} />
            </div>
          )}

          <button
            className="sidebar-toggle-btn"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation items */}
        <div className="sidebar-nav-container">
          <div>
            {!collapsed && <div className="nav-group-title">Overview</div>}
            <ul className="nav-list">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`nav-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={20} className="nav-item-icon" />
                      {!collapsed && <span>{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span className="nav-item-badge">{item.badge}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            {!collapsed && <div className="nav-group-title">System Management</div>}
            <ul className="nav-list">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`nav-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={20} className="nav-item-icon" />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer with logged-in user profile */}
        <div className="sidebar-footer">
          <div className="user-mini-profile">
            <div className="user-avatar-wrapper">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                }
                alt={user?.name || 'User'}
                className="user-avatar-img"
              />
              <span className="user-online-dot" />
            </div>

            {!collapsed && (
              <>
                <div className="user-info-text">
                  <div className="user-name">{user?.name || 'Admin'}</div>
                  <div className="user-role">{user?.role || 'Administrator'}</div>
                </div>
                <button
                  className="logout-icon-btn"
                  onClick={() => logout()}
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={onCloseMobile}
      />
    </>
  );
};
