import React, { useState } from 'react';
import { Zap } from 'lucide-react';

export default function PasswordProtect({ children }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'OTCAlk124') {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f051f 0%, #1a0a3a 50%, #0f051f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px'
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(168, 85, 247, 0.6)',
        borderRadius: '8px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Zap style={{ width: '32px', height: '32px', color: '#a78bfa' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>Alkimi OTC</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
            Enter Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            style={{
              width: '100%',
              backgroundColor: 'rgba(109, 40, 217, 0.4)',
              color: 'white',
              borderRadius: '6px',
              padding: '12px 16px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              fontSize: '16px',
              fontWeight: 'bold',
              boxSizing: 'border-box',
              marginBottom: '12px'
            }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#a855f7',
              color: 'white',
              padding: '12px',
              borderRadius: '6px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Access Calculator
          </button>
        </form>
      </div>
    </div>
  );
}