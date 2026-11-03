import React, { useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Menu,
  Plus,
  User as UserIcon,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  onOpenNewModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, onOpenNewModal }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="admin-header">
      {/* Left side: Hamburger on mobile + Global Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          className="icon-button mobile-only-toggle"
          onClick={onToggleMobileMenu}
          aria-label="Open mobile menu"
          style={{ display: 'none' }}
        >
          <Menu size={20} />
        </button>

        <div className="header-search-bar">
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search resources, users, logs..."
            aria-label="Global Search"
          />
          <span className="search-shortcut-badge">⌘K</span>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="header-actions">
        {/* Quick New Action */}
        <button
          className="btn btn-primary"
          onClick={onOpenNewModal}
          style={{ padding: '0.5rem 0.95rem', fontSize: '0.8125rem' }}
        >
          <Plus size={16} />
          <span>New Entry</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          className="icon-button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun size={19} color="#f59e0b" />
          ) : (
            <Moon size={19} color="#6366f1" />
          )}
        </button>

        {/* User Profile avatar dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
            }}
          >
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'User'}
              style={{
                width: 28,
                height: 28,
                borderRadius: '9999px',
                objectFit: 'cover',
              }}
            />
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name?.split(' ')[0] || 'Admin'}
            </span>
          </button>

          {showProfileDropdown && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                width: '220px',
                padding: '0.65rem',
                zIndex: 50,
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                style={{
                  padding: '0.5rem 0.5rem 0.75rem 0.5rem',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '0.4rem',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {user?.email}
                </div>
              </div>

              <button
                className="btn-ghost"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  borderRadius: 'var(--radius-sm)',
                }}
                onClick={() => setShowProfileDropdown(false)}
              >
                <UserIcon size={16} />
                <span>My Profile</span>
              </button>

              <button
                className="btn-ghost"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--danger)',
                  marginTop: '0.3rem',
                  borderTop: '1px solid var(--border-color)',
                }}
                onClick={() => logout()}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
