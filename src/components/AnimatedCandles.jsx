import React from 'react';

export default function AnimatedCandles({ height = 220 }) {
  return (
    <div style={{
      width: '100%',
      height: `${height}px`,
      background: 'rgba(8, 11, 16, 0.92)',
      borderRadius: '16px',
      border: '1px solid var(--border-gold)',
      position: 'relative',
      overflow: 'hidden',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(245, 192, 66, 0.15)'
    }}>
      {/* Chart Grid Lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(245, 192, 66, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 192, 66, 0.06) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      {/* Header Info Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'blink 1.2s infinite' }} />
          <span style={{ fontWeight: 900, color: 'var(--gold-bright)' }}>XAUUSD 1M Live Chart</span>
        </div>
        <div style={{ color: 'var(--green-win)', fontWeight: 800, fontFamily: 'monospace', fontSize: '0.95rem' }}>
          $2,648.50 <span style={{ fontSize: '0.75rem' }}>(+142 pips)</span>
        </div>
      </div>

      {/* Animated Candlesticks Container */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: '140px',
        position: 'relative',
        zIndex: 2,
        padding: '0 10px'
      }}>
        {/* Candle 1 (Bullish Green) */}
        <div className="candle-wrapper" style={{ height: '70%', animationDelay: '0s' }}>
          <div className="wick" style={{ height: '100%', width: '2px', background: '#34d399', margin: '0 auto' }} />
          <div className="body" style={{ height: '60%', width: '14px', background: '#10b981', marginTop: '-80%', borderRadius: '2px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }} />
        </div>

        {/* Candle 2 (Bearish Red) */}
        <div className="candle-wrapper" style={{ height: '50%', animationDelay: '0.3s' }}>
          <div className="wick" style={{ height: '100%', width: '2px', background: '#f87171', margin: '0 auto' }} />
          <div className="body" style={{ height: '40%', width: '14px', background: '#ef4444', marginTop: '-70%', borderRadius: '2px' }} />
        </div>

        {/* Candle 3 (Bullish Green) */}
        <div className="candle-wrapper" style={{ height: '85%', animationDelay: '0.6s' }}>
          <div className="wick" style={{ height: '100%', width: '2px', background: '#34d399', margin: '0 auto' }} />
          <div className="body" style={{ height: '75%', width: '14px', background: '#10b981', marginTop: '-90%', borderRadius: '2px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }} />
        </div>

        {/* Candle 4 (Liquidity Sweep Wicker) */}
        <div className="candle-wrapper" style={{ height: '40%', animationDelay: '0.9s' }}>
          <div className="wick" style={{ height: '100%', width: '2px', background: '#f87171', margin: '0 auto' }} />
          <div className="body" style={{ height: '30%', width: '14px', background: '#ef4444', marginTop: '-65%', borderRadius: '2px' }} />
        </div>

        {/* Candle 5 (Strong Gold Surge) */}
        <div className="candle-wrapper live-surge" style={{ height: '95%', animationDelay: '1.2s' }}>
          <div className="wick" style={{ height: '100%', width: '2px', background: 'var(--gold-bright)', margin: '0 auto' }} />
          <div className="body" style={{ height: '80%', width: '16px', background: 'var(--gradient-gold)', marginTop: '-90%', borderRadius: '3px', boxShadow: '0 0 16px var(--gold-bright)' }} />
        </div>

        {/* Entry Target Line Overlay */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          borderTop: '2px dashed var(--gold-bright)',
          display: 'flex',
          justify: 'space-between',
          padding: '2px 8px',
          color: 'var(--gold-bright)',
          fontSize: '0.72rem',
          fontWeight: 800
        }}>
          <span>🎯 EASYGOLD VIP BUY ENTRY 2642.10</span>
          <span>TP1 REACHED +60 PIPS</span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        @keyframes candlePulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.12); }
        }

        .candle-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: candlePulse 2s ease-in-out infinite;
          transform-origin: bottom;
        }

        .live-surge {
          animation: candlePulse 1.2s ease-in-out infinite alternate !important;
        }
      `}</style>
    </div>
  );
}
