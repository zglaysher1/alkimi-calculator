import React from 'react';

export default function Landing() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f051f 0%, #1a0a3a 50%, #0f051f 100%)',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '24px',
          margin: 0
        }}>
          Alkimi OTC
        </h1>
        
        <p style={{
          color: '#d8b4fe',
          fontSize: '18px',
          marginBottom: '48px'
        }}>
          Fee-Linked Yield on Idle Stables via Discounted Token Access
        </p>

        <p style={{
          color: '#c084fc',
          fontSize: '16px',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Compare your investment returns: see the difference between buying ALK tokens on the market versus our OTC offering with staking rewards.
        </p>
        
        <a href="/calculator" style={{
          display: 'inline-block',
          backgroundColor: '#a855f7',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '6px',
          fontWeight: '600',
          textDecoration: 'none',
          fontSize: '18px',
          transition: 'background-color 0.2s',
          cursor: 'pointer'
        }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#9333ea'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#a855f7'}
        >
          Launch Calculator →
        </a>
      </div>
    </div>
  );
}