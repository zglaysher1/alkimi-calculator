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

  const investmentNum = investment ? parseFloat(investment) : 0;
  const marketTokens = investmentNum / alkPrice;
  const otcTokens = (investmentNum / alkPrice) * (1 + discount / 100);
  
  const marketTokensAfter = marketTokens * (1 + (apy / 100) * timeframe);
  const otcTokensAfter = otcTokens * (1 + (apy / 100) * timeframe);
  
  const marketValue = marketTokensAfter * alkPrice;
  const otcValue = otcTokensAfter * alkPrice;
  
  const marketProfit = marketValue - investmentNum;
  const otcProfit = otcValue - investmentNum;
  const additionalProfit = otcProfit - marketProfit;
  const outperformance = marketProfit > 0 ? ((otcProfit - marketProfit) / marketProfit * 100).toFixed(1) : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f051f 0%, #1a0a3a 50%, #0f051f 100%)',
      padding: '32px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Zap style={{ width: '32px', height: '32px', color: '#a78bfa' }} />
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', margin: 0 }}>Alkimi OTC Calculator</h1>
          </div>
          <p style={{ color: '#d8b4fe', fontSize: '18px', margin: 0 }}>Real-time investment comparison: Market Buy vs OTC Buy</p>
        </div>

        {/* Input Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {/* Investment Amount */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <label style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Investment Amount (USD)
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'white', fontWeight: 'bold', pointerEvents: 'none' }}>$</span>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value ? parseFloat(e.target.value).toString() : '')}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(109, 40, 217, 0.4)',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '12px 12px 12px 32px',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxSizing: 'border-box'
                }}
                placeholder="0"
              />
            </div>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px', margin: 0 }}>
              ${investmentNum.toLocaleString()}
            </p>
          </div>

          {/* ALK Price */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <label style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Current ALK Price
            </label>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', margin: 0 }}>${alkPrice.toFixed(6)}</p>
            <button
              onClick={fetchAlkPrice}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#a855f7',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '600',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                opacity: loading ? 0.5 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#9333ea')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#a855f7')}
            >
              {loading ? 'Updating...' : 'Refresh Price'}
            </button>
          </div>

          {/* Discount */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <label style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              OTC Discount
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
            <p style={{ color: '#e9d5ff', fontSize: '20px', fontWeight: 'bold', marginTop: '12px', margin: 0 }}>{discount}%</p>
          </div>

          {/* APY */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '8px',
            padding: '24px',
            opacity: 0.6,
            cursor: 'not-allowed'
          }}>
            <label style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Annual APY
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={apy}
              disabled
              style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed' }}
            />
            <p style={{ color: '#e9d5ff', fontSize: '20px', fontWeight: 'bold', marginTop: '12px', margin: 0 }}>{apy}%</p>
          </div>

          {/* Timeframe */}
          <div style={{ gridColumn: 'span 1' }}>
            <label style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '12px', display: 'block' }}>
              Timeframe
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0.5, 1, 2, 3].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: timeframe === t ? '#a855f7' : 'rgba(109, 40, 217, 0.3)',
                    color: 'white',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => !timeframe === t && (e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.5)')}
                  onMouseLeave={(e) => !timeframe === t && (e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.3)')}
                >
                  {t === 0.5 ? '6m' : t + 'y'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          {/* Market Buy Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '8px',
            padding: '32px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#a78bfa', borderRadius: '50%' }}></span>
              Market Buy (No Discount)
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Initial Investment', value: investmentNum.toLocaleString() },
                { label: 'Tokens Received', value: (marketTokens / 1e6).toFixed(2) + 'M' },
                { label: `Tokens After ${timeframe}y Staking`, value: (marketTokensAfter / 1e6).toFixed(2) + 'M' },
                { label: `Value After ${timeframe}y`, value: '$' + marketValue.toLocaleString(undefined, {maximumFractionDigits: 0}) }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(109, 40, 217, 0.2)',
                  borderRadius: '6px',
                  padding: '16px',
                  border: '1px solid rgba(168, 85, 247, 0.2)'
                }}>
                  <p style={{ color: 'rgba(216, 180, 254, 0.7)', fontSize: '12px', marginBottom: '4px', margin: 0 }}>{item.label}</p>
                  <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{item.value}</p>
                </div>
              ))}

              <div style={{
                background: 'rgba(168, 85, 247, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: '6px',
                padding: '16px',
                marginTop: '24px'
              }}>
                <p style={{ color: '#d8b4fe', fontSize: '12px', marginBottom: '4px', margin: 0 }}>Total Profit</p>
                <p style={{ color: '#d8b4fe', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>${marketProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
            </div>
          </div>

          {/* OTC Buy Card */}
          <div style={{
            background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(0, 0, 0, 0.4))',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '8px',
            padding: '32px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: '#a78bfa' }} />
              OTC Buy ({discount}% Discount)
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Initial Investment', value: investmentNum.toLocaleString() },
                { label: 'Tokens Received (with discount)', value: (otcTokens / 1e6).toFixed(2) + 'M', subValue: `+${((otcTokens - marketTokens) / 1e6).toFixed(2)}M vs market` },
                { label: `Tokens After ${timeframe}y Staking`, value: (otcTokensAfter / 1e6).toFixed(2) + 'M' },
                { label: `Value After ${timeframe}y`, value: '$' + otcValue.toLocaleString(undefined, {maximumFractionDigits: 0}) }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(147, 51, 234, 0.2)',
                  borderRadius: '6px',
                  padding: '16px',
                  border: '1px solid rgba(168, 85, 247, 0.3)'
                }}>
                  <p style={{ color: '#d8b4fe', fontSize: '12px', marginBottom: '4px', margin: 0 }}>{item.label}</p>
                  <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{item.value}</p>
                  {item.subValue && <p style={{ color: '#d8b4fe', fontSize: '12px', marginTop: '4px', margin: 0 }}>{item.subValue}</p>}
                </div>
              ))}

              <div style={{
                background: 'rgba(147, 51, 234, 0.3)',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                borderRadius: '6px',
                padding: '16px',
                marginTop: '24px'
              }}>
                <p style={{ color: '#e9d5ff', fontSize: '12px', marginBottom: '4px', margin: 0 }}>Total Profit</p>
                <p style={{ color: '#e9d5ff', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>${otcProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '24px', margin: 0 }}>OTC Advantage Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{
              background: 'rgba(109, 40, 217, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '6px',
              padding: '24px'
            }}>
              <p style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '12px', margin: 0 }}>Additional Profit</p>
              <p style={{ color: '#d8b4fe', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>${additionalProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              <p style={{ color: 'rgba(168, 85, 247, 0.6)', fontSize: '12px', marginTop: '8px', margin: 0 }}>Gain from OTC discount + staking</p>
            </div>

            <div style={{
              background: 'rgba(109, 40, 217, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '6px',
              padding: '24px'
            }}>
              <p style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '12px', margin: 0 }}>Outperformance</p>
              <p style={{ color: '#d8b4fe', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>+{outperformance}%</p>
              <p style={{ color: 'rgba(168, 85, 247, 0.6)', fontSize: '12px', marginTop: '8px', margin: 0 }}>vs market buy profit</p>
            </div>

            <div style={{
              background: 'rgba(109, 40, 217, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '6px',
              padding: '24px'
            }}>
              <p style={{ color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '12px', margin: 0 }}>Total ROI</p>
              <p style={{ color: '#d8b4fe', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{investmentNum > 0 ? ((otcProfit / investmentNum) * 100).toFixed(1) : 0}%</p>
              <p style={{ color: 'rgba(168, 85, 247, 0.6)', fontSize: '12px', marginTop: '8px', margin: 0 }}>Over {timeframe} year(s)</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(109, 40, 217, 0.2)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <p style={{ color: '#d8b4fe', fontSize: '12px', margin: 0 }}>
            ⚠️ <strong>Disclaimer:</strong> This calculator is illustrative only. Actual returns depend on APY variability, token price movements, liquidity, and staking terms. Past performance does not guarantee future results. Always conduct your own research before investing.
          </p>
        </div>
      </div>
    </div>
  );
}