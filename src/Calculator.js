import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap } from 'lucide-react';

export default function Calculator() {
  const [investment, setInvestment] = useState('');
  const [discount, setDiscount] = useState(10);
  const apy = 37;
  const [alkPrice, setAlkPrice] = useState(0.0107);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState(1);

  useEffect(() => {
    fetchAlkPrice();
    const interval = setInterval(fetchAlkPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlkPrice = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=alkimi&vs_currencies=usd'
      );
      const data = await response.json();
      if (data?.alkimi?.usd) {
        setAlkPrice(parseFloat(data.alkimi.usd));
      }
    } catch (err) {
      console.log('Error fetching price:', err);
    }
    setLoading(false);
  };

  // Calculations
  const marketTokens = investment / alkPrice;
  const otcTokens = (investment / alkPrice) * (1 + discount / 100);
  
  const marketTokensAfter = marketTokens * (1 + (apy / 100) * timeframe);
  const otcTokensAfter = otcTokens * (1 + (apy / 100) * timeframe);
  
  const marketValue = marketTokensAfter * alkPrice;
  const otcValue = otcTokensAfter * alkPrice;
  
  const marketProfit = marketValue - investment;
  const otcProfit = otcValue - investment;
  const additionalProfit = otcProfit - marketProfit;
  const outperformance = ((otcProfit - marketProfit) / marketProfit * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black p-8" style={{background: 'linear-gradient(135deg, #0f051f 0%, #1a0a3a 50%, #0f051f 100%)'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Alkimi OTC Calculator</h1>
          </div>
          <p className="text-purple-300 text-base">Real-time investment comparison: Market Buy vs OTC Buy</p>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Investment Amount */}
          {/* Investment Amount */}
          <div className="bg-black/40 backdrop-blur border border-purple-600/60 rounded-lg p-6">
            <label className="block text-purple-300 text-xs font-semibold mb-3">
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-bold pointer-events-none">$</span>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value ? parseFloat(e.target.value) : '')}
                className="w-full bg-purple-950/40 text-white rounded px-4 py-3 pl-8 border border-purple-500/40 focus:border-purple-400 focus:outline-none text-base font-bold"
                placeholder="0"
              />
            </div>
            
          </div>

          {/* ALK Price */}
          <div className="bg-black/40 backdrop-blur border border-purple-600/60 rounded-lg p-6">
            <label className="block text-purple-300 text-xs font-semibold mb-3">
              Current ALK Price
            </label>
            <p className="text-white text-xl font-bold mb-4">${alkPrice.toFixed(6)}</p>
            <button
              onClick={fetchAlkPrice}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-semibold disabled:opacity-50 transition text-xs"
            >
              {loading ? 'Updating...' : 'Refresh Price'}
            </button>
          </div>

          {/* Discount */}
          <div className="bg-black/40 backdrop-blur border border-purple-600/60 rounded-lg p-6">
            <label className="block text-purple-300 text-xs font-semibold mb-3">
              OTC Discount
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-purple-200 text-xl font-bold mt-3">{discount}%</p>
          </div>

          {/* APY */}
          <div className="bg-black/40 backdrop-blur border border-purple-600/60 rounded-lg p-6 opacity-60 cursor-not-allowed">
            <label className="block text-purple-300 text-xs font-semibold mb-3">
              Annual APY
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={apy}
              disabled
              className="w-full opacity-50 cursor-not-allowed"
            />
            <p className="text-purple-200 text-xl font-bold mt-3">{apy}%</p>
          </div>

          {/* Timeframe */}
          <div className="bg-black/40 backdrop-blur border border-purple-600/60 rounded-lg p-6 col-span-full">
            <label className="block text-purple-300 text-xs font-semibold mb-3">
              Timeframe
            </label>
            <div className="flex gap-2">
              {[0.5, 1, 2, 3].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`flex-1 py-2 rounded font-semibold transition text-xs ${
                    timeframe === t
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-950/30 text-purple-300 hover:bg-purple-900/40'
                  }`}
                >
                  {t === 0.5 ? '6m' : t + 'y'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Market Buy Card */}
          <div className="bg-black/40 border border-purple-600/40 rounded-lg p-8">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Market Buy (No Discount)
            </h2>
            
            <div className="space-y-5">
              <div className="bg-purple-950/30 rounded p-5 border border-purple-600/30">
                <p className="text-purple-300/70 text-xs mb-2">Initial Investment</p>
                <p className="text-white text-xl font-bold">${investment.toLocaleString()}</p>
              </div>

              <div className="bg-purple-950/30 rounded p-5 border border-purple-600/30">
                <p className="text-purple-300/70 text-xs mb-2">Tokens Received</p>
                <p className="text-white text-xl font-bold">{(marketTokens / 1e6).toFixed(2)}M</p>
              </div>

              <div className="bg-purple-950/30 rounded p-5 border border-purple-600/30">
                <p className="text-purple-300/70 text-xs mb-2">Tokens After {timeframe}y Staking</p>
                <p className="text-white text-xl font-bold">{(marketTokensAfter / 1e6).toFixed(2)}M</p>
              </div>

              <div className="bg-purple-950/30 rounded p-5 border border-purple-600/30">
                <p className="text-purple-300/70 text-xs mb-2">Value After {timeframe}y</p>
                <p className="text-white text-xl font-bold">${marketValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>

              <div className="bg-purple-600/20 border border-purple-600/60 rounded p-5 mt-6">
                <p className="text-purple-300 text-xs mb-2">Total Profit</p>
                <p className="text-purple-300 text-xl font-bold">${marketProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
            </div>
          </div>

          {/* OTC Buy Card */}
          <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-500/60 rounded-lg p-8">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              OTC Buy ({discount}% Discount)
            </h2>
            
            <div className="space-y-5">
              <div className="bg-purple-900/30 rounded p-5 border border-purple-500/40">
                <p className="text-purple-300 text-xs mb-2">Initial Investment</p>
                <p className="text-white text-xl font-bold">${investment.toLocaleString()}</p>
              </div>

              <div className="bg-purple-900/30 rounded p-5 border border-purple-500/40">
                <p className="text-purple-300 text-xs mb-2">Tokens Received (with discount)</p>
                <p className="text-white text-xl font-bold">{(otcTokens / 1e6).toFixed(2)}M</p>
                <p className="text-purple-300 text-xs mt-2">+{((otcTokens - marketTokens) / 1e6).toFixed(2)}M vs market</p>
              </div>

              <div className="bg-purple-900/30 rounded p-5 border border-purple-500/40">
                <p className="text-purple-300 text-xs mb-2">Tokens After {timeframe}y Staking</p>
                <p className="text-white text-xl font-bold">{(otcTokensAfter / 1e6).toFixed(2)}M</p>
              </div>

              <div className="bg-purple-900/30 rounded p-5 border border-purple-500/40">
                <p className="text-purple-300 text-xs mb-2">Value After {timeframe}y</p>
                <p className="text-white text-xl font-bold">${otcValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>

              <div className="bg-purple-600/30 border border-purple-500/80 rounded p-5 mt-6">
                <p className="text-purple-200 text-xs mb-2">Total Profit</p>
                <p className="text-purple-200 text-xl font-bold">${otcProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-black/40 border border-purple-600/60 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">OTC Advantage Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-950/40 border border-purple-600/40 rounded p-6">
              <p className="text-purple-300 text-xs font-semibold mb-3">Additional Profit</p>
              <p className="text-purple-300 text-xl font-bold">${additionalProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              <p className="text-purple-400/60 text-xs mt-2">Gain from OTC discount + staking</p>
            </div>

            <div className="bg-purple-950/40 border border-purple-600/40 rounded p-6">
              <p className="text-purple-300 text-xs font-semibold mb-3">Outperformance</p>
              <p className="text-purple-300 text-xl font-bold">+{outperformance}%</p>
              <p className="text-purple-400/60 text-xs mt-2">vs market buy profit</p>
            </div>

            <div className="bg-purple-950/40 border border-purple-600/40 rounded p-6">
              <p className="text-purple-300 text-xs font-semibold mb-3">Total ROI</p>
              <p className="text-purple-300 text-xl font-bold">{((otcProfit / investment) * 100).toFixed(1)}%</p>
              <p className="text-purple-400/60 text-xs mt-2">Over {timeframe} year(s)</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-purple-950/30 border border-purple-600/40 rounded-lg p-4">
          <p className="text-purple-300 text-xs">
            ⚠️ <strong>Disclaimer:</strong> This calculator is illustrative only. Actual returns depend on APY variability, token price movements, liquidity, and staking terms. Past performance does not guarantee future results. Always conduct your own research before investing.
          </p>
        </div>
      </div>
    </div>
  );
}