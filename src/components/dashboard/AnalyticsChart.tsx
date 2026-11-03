import React, { useState } from 'react';
import type { ChartDataPoint } from '../../types/dashboard';

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  timeRange: '7d' | '30d' | '12m';
  onTimeRangeChange: (range: '7d' | '30d' | '12m') => void;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
}) => {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'orders' | 'apiRequests'>('revenue');

  // Compute maximum for normalized height calculation
  const values = data.map((d) => d[activeMetric]);
  const maxVal = Math.max(...values, 1);

  const formatTooltip = (val: number) => {
    if (activeMetric === 'revenue') return `$${val.toLocaleString()}`;
    if (activeMetric === 'orders') return `${val.toLocaleString()} transactions`;
    return `${(val / 1000).toFixed(0)}k req/sec`;
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div className="card-title-row">
        <div>
          <h2 className="card-title">Performance Analytics</h2>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
            <button
              onClick={() => setActiveMetric('revenue')}
              style={{
                fontSize: '0.8125rem',
                fontWeight: activeMetric === 'revenue' ? 700 : 500,
                color: activeMetric === 'revenue' ? 'var(--primary)' : 'var(--text-muted)',
              }}
            >
              • Revenue Flow
            </button>
            <button
              onClick={() => setActiveMetric('orders')}
              style={{
                fontSize: '0.8125rem',
                fontWeight: activeMetric === 'orders' ? 700 : 500,
                color: activeMetric === 'orders' ? 'var(--secondary)' : 'var(--text-muted)',
              }}
            >
              • Volume
            </button>
            <button
              onClick={() => setActiveMetric('apiRequests')}
              style={{
                fontSize: '0.8125rem',
                fontWeight: activeMetric === 'apiRequests' ? 700 : 500,
                color: activeMetric === 'apiRequests' ? 'var(--warning)' : 'var(--text-muted)',
              }}
            >
              • API Traffic
            </button>
          </div>
        </div>

        {/* Time range pills */}
        <div className="filter-pills-group">
          {(['7d', '30d', '12m'] as const).map((r) => (
            <button
              key={r}
              className={`filter-pill ${timeRange === r ? 'active' : ''}`}
              onClick={() => onTimeRangeChange(r)}
            >
              {r === '7d' ? '7D' : r === '30d' ? '30D' : '1Y'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart visualization */}
      <div className="chart-box">
        {data.map((item, idx) => {
          const heightPercent = Math.max((item[activeMetric] / maxVal) * 85, 8);
          return (
            <div key={idx} className="chart-bar-group">
              <div className="chart-bar-tooltip">
                {formatTooltip(item[activeMetric])}
              </div>
              <div
                className="chart-bar-fill"
                style={{
                  height: `${heightPercent}%`,
                  background:
                    activeMetric === 'revenue'
                      ? 'linear-gradient(180deg, var(--primary), rgba(99, 102, 241, 0.2))'
                      : activeMetric === 'orders'
                      ? 'linear-gradient(180deg, var(--secondary), rgba(6, 182, 212, 0.2))'
                      : 'linear-gradient(180deg, var(--warning), rgba(245, 158, 11, 0.2))',
                }}
              />
              <span className="chart-bar-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
