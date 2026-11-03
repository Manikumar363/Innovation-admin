import React, { useState } from 'react';
import { Save, Key, Shield, Database, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [apiUrl, setApiUrl] = useState('https://api.innovation.internal/v1');
  const [apiKey, setApiKey] = useState('inv_live_99f2d1e4a78c90b348');
  const [rateLimit, setRateLimit] = useState('5000');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>System & API Configuration</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Manage global endpoints, environment settings, and API authentication parameters.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* API Integration Panel */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Database size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.15rem' }}>Backend API Settings</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Base API URL</label>
              <input
                type="text"
                className="input-control"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.yourdomain.com/v1"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Used by frontend service adapters when live endpoints are connected.
              </span>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Production API Secret Key</label>
              <div className="input-icon-wrapper">
                <Key size={18} className="input-icon" />
                <input
                  type="password"
                  className="input-control input-control-with-icon"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Client Rate Limit (Requests / minute)</label>
              <input
                type="number"
                className="input-control"
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Security & Notification Defaults */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Shield size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.15rem' }}>Security Policies</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="form-checkbox-label">
              <input type="checkbox" defaultChecked />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Enforce Multi-Factor Authentication</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Require 2FA for all users logging into the console.</div>
              </div>
            </label>

            <label className="form-checkbox-label">
              <input type="checkbox" defaultChecked />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Automatic Session Revocation</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Terminate inactive sessions after 120 minutes of inactivity.</div>
              </div>
            </label>

            <label className="form-checkbox-label">
              <input type="checkbox" defaultChecked />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Detailed Audit Trail Logging</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Emit structured security telemetry for all admin actions.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" style={{ minWidth: '140px' }}>
            {isSaved ? (
              <>
                <Check size={16} />
                <span>Saved Changes</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
