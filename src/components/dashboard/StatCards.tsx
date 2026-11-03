import React from 'react';
import { DollarSign, Users, Activity, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import type { StatMetric } from '../../types/dashboard';

interface StatCardsProps {
  metrics: StatMetric[];
}

export const StatCards: React.FC<StatCardsProps> = ({ metrics }) => {
  // Render dynamic Lucide icon
  const renderIcon = (name: string, color: string) => {
    const props = { size: 20, color };
    switch (name) {
      case 'DollarSign':
        return <DollarSign {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      default:
        return <Activity {...props} />;
    }
  };

  // Convert array of numbers into SVG polyline points
  const getPolylinePoints = (data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 90;
    const height = 30;

    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className="stats-grid">
      {metrics.map((m) => (
        <div key={m.id} className="stat-card glass-panel">
          <div className="stat-card-header">
            <span className="stat-card-title">{m.title}</span>
            <div
              className="stat-card-icon"
              style={{
                backgroundColor: `${m.color}18`,
                border: `1px solid ${m.color}35`,
              }}
            >
              {renderIcon(m.iconName, m.color)}
            </div>
          </div>

          <div className="stat-card-main">
            <div>
              <div className="stat-card-value">{m.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.45rem' }}>
                <span
                  className={`trend-badge ${
                    m.isPositive ? 'trend-positive' : 'trend-negative'
                  }`}
                >
                  {m.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{m.isPositive ? `+${m.change}%` : `${m.change}%`}</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {m.timeframe}
                </span>
              </div>
            </div>

            {/* Micro Sparkline Preview */}
            <svg className="sparkline-svg" viewBox="0 0 90 32">
              <polyline
                points={getPolylinePoints(m.sparkline)}
                stroke={m.color}
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
