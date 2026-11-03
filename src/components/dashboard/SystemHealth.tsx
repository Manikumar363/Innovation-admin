import React from 'react';
import { Server, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { SystemMetric } from '../../types/dashboard';

interface SystemHealthProps {
  metrics: SystemMetric[];
}

export const SystemHealth: React.FC<SystemHealthProps> = ({ metrics }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div className="card-title-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Server size={18} color="var(--primary)" />
          <h2 className="card-title">Cluster Status</h2>
        </div>
        <span className="badge badge-success">
          <CheckCircle2 size={12} />
          <span>Operational</span>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        {metrics.map((item, idx) => (
          <div key={idx} className="health-item">
            <div className="health-header">
              <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
              <span style={{ color: 'var(--text-primary)' }}>{item.statusText}</span>
            </div>
            <div className="health-bar-track">
              <div
                className="health-bar-fill"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor:
                    item.percentage > 80
                      ? 'var(--danger)'
                      : item.percentage > 60
                      ? 'var(--warning)'
                      : 'var(--success)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-hover)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.8125rem',
        }}
      >
        <ShieldAlert size={18} color="var(--primary)" />
        <span style={{ color: 'var(--text-secondary)' }}>
          Automated failover enabled across 3 cloud availability zones.
        </span>
      </div>
    </div>
  );
};
