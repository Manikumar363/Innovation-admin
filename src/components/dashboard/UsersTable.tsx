import React, { useState } from 'react';
import { Search, MoreVertical, Trash2, Check, Shield, Users as UsersIcon } from 'lucide-react';
import type { UserRecord } from '../../types/dashboard';

interface UsersTableProps {
  users: UserRecord[];
  onDeleteUser: (id: string) => void;
  onUpdateStatus: (id: string, status: UserRecord['status']) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onDeleteUser,
  onUpdateStatus,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const [selectedUserAction, setSelectedUserAction] = useState<string | null>(null);

  const getStatusBadgeClass = (status: UserRecord['status']) => {
    switch (status) {
      case 'Active':
        return 'badge-success';
      case 'Pending':
        return 'badge-warning';
      case 'Suspended':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div className="card-title-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UsersIcon size={18} color="var(--primary)" />
          <h2 className="card-title">Team & User Directory</h2>
        </div>
        <span className="badge badge-primary">{users.length} Active Records</span>
      </div>

      {/* Toolbar: Search & Filter Pills */}
      <div className="table-toolbar">
        <div className="table-search-input">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Filter by name, email, or role..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-pills-group">
          {['All', 'Active', 'Pending', 'Suspended'].map((status) => (
            <button
              key={status}
              className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
              onClick={() => onStatusFilterChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Joined Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No members match your search criteria.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <img src={u.avatar} alt={u.name} className="user-cell-img" />
                      <div>
                        <div className="user-cell-name">{u.name}</div>
                        <div className="user-cell-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                      }}
                    >
                      <Shield size={13} color="var(--primary)" />
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(u.status)}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                    {u.lastActive}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {u.joinDate}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <button
                        className="action-icon-btn"
                        onClick={() =>
                          setSelectedUserAction(selectedUserAction === u.id ? null : u.id)
                        }
                        title="Actions"
                        aria-label="Actions"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {selectedUserAction === u.id && (
                        <div
                          className="glass-panel"
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: '30px',
                            zIndex: 40,
                            width: '160px',
                            padding: '0.4rem',
                            backgroundColor: 'var(--bg-card-solid)',
                            boxShadow: 'var(--shadow-md)',
                          }}
                        >
                          <button
                            className="btn-ghost"
                            style={{
                              width: '100%',
                              padding: '0.4rem 0.6rem',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              textAlign: 'left',
                            }}
                            onClick={() => {
                              onUpdateStatus(u.id, u.status === 'Active' ? 'Suspended' : 'Active');
                              setSelectedUserAction(null);
                            }}
                          >
                            <Check size={14} />
                            <span>Toggle Status</span>
                          </button>
                          <button
                            className="btn-ghost"
                            style={{
                              width: '100%',
                              padding: '0.4rem 0.6rem',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: 'var(--danger)',
                              textAlign: 'left',
                            }}
                            onClick={() => {
                              onDeleteUser(u.id);
                              setSelectedUserAction(null);
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Remove User</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
