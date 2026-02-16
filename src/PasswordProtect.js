import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PasswordProtect({ children }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const CORRECT_PASSWORD = 'alkimi2025';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center p-8">
      <div className="bg-black/40 backdrop-blur border border-purple-600/60 rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Protected Access</h1>
        </div>
        
        <p className="text-purple-300 mb-6">
          Enter password to access the Alkimi OTC Calculator
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-purple-950/40 text-white rounded px-4 py-3 border border-purple-500/40 focus:border-purple-400 focus:outline-none mb-4"
            autoFocus
          />
          
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded font-semibold transition"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}