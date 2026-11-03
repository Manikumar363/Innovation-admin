import React from 'react';
import { History, CheckCircle, Info, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { ActivityItem, ActivityType } from '../../types/dashboard';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const renderStatusIcon = (type: ActivityType) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={14} color="var(--success)" />;
      case 'warning':
        return <AlertTriangle size={14} color="var(--warning)" />;
      case 'error':
        return <AlertOctagon size={14} color="var(--danger)" />;
      case 'info':
      default:
        return <Info size={14} color="var(--primary)" />;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div className="card-title-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={18} color="var(--primary)" />
          <h2 className="card-title">Live Activity Log</h2>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Realtime Sync</span>
      </div>

      <div className="activity-list">
        {activities.map((act) => (
          <div key={act.id} className="activity-item">
            <img src={act.user.avatar} alt={act.user.name} className="activity-avatar" />
            <div className="activity-content">
              <div>
                <span className="activity-user">{act.user.name} </span>
                <span style={{ color: 'var(--text-secondary)' }}>{act.action} </span>
                <span className="activity-target">{act.target}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '0.25rem',
                }}
              >
                {renderStatusIcon(act.type)}
                <span className="activity-time">{act.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
