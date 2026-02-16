import React from 'react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 p-8">
      <h1 className="text-white text-5xl">Alkimi OTC</h1>
      <p className="text-purple-300 mt-4">Click the button below to access the calculator</p>
      <a href="/benxzoe" className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded">
        Launch Calculator
      </a>
    </div>
  );
}