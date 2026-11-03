import React, { useEffect, useState } from 'react';
import { UserPlus, Shield, Key } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import type { UserRecord } from '../types/dashboard';
import { UsersTable } from '../components/dashboard/UsersTable';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    dashboardService.getUsers().then(setUsers);
  }, []);

  const handleSearchChange = async (q: string) => {
    setSearchQuery(q);
    const filtered = await dashboardService.getUsers(q, statusFilter);
    setUsers(filtered);
  };

  const handleStatusFilterChange = async (status: string) => {
    setStatusFilter(status);
    const filtered = await dashboardService.getUsers(searchQuery, status);
    setUsers(filtered);
  };

  const handleDeleteUser = async (id: string) => {
    await dashboardService.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleUpdateStatus = async (id: string, newStatus: UserRecord['status']) => {
    await dashboardService.updateUserStatus(id, newStatus);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Users & Permissions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Manage team members, role-based access control, and organization privileges.
          </p>
        </div>
        <button className="btn btn-primary">
          <UserPlus size={16} />
          <span>Invite New Member</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Admin Privileges</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>2 Super Admins</div>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Full access across all cloud infrastructure</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
              <Key size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>MFA Enforcement</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>100% Enabled</div>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Zero-trust hardware security keys enforced</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Active Sessions</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>18 Devices</div>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>All session tokens strictly encrypted</span>
        </div>
      </div>

      <UsersTable
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateStatus={handleUpdateStatus}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />
    </div>
  );
};
