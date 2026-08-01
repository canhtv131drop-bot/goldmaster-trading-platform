import React from 'react';

export default function EasyGoldLogo({ size = 'medium', onClick, showSubtext = true }) {
  const iconSizes = {
    small: { imgHeight: '30px', title: '1.05rem', sub: '0.58rem' },
    medium: { imgHeight: '38px', title: '1.2rem', sub: '0.65rem' },
    large: { imgHeight: '75px', title: '2.4rem', sub: '0.9rem' }
  };

  const current = iconSizes[size] || iconSizes.medium;

  return (
    <div 
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0
      }}
    >
      {/* LOGO IMAGE ASSET */}
      <img 
        src="/logo.png" 
        alt="EasyGold" 
        className="logo-img"
        style={{
          height: current.imgHeight,
          maxWidth: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
          borderRadius: '8px',
          flexShrink: 0
        }}
      />

      {/* BRAND NAME */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
        <div 
          className="logo-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: current.title,
            letterSpacing: '0.5px',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FFF5C0 0%, #F5C042 50%, #D4AF37 80%, #AA7C11 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'none'
          }}
        >
          EasyGold
        </div>

        {showSubtext && (
          <div 
            className="logo-subtext"
            style={{
              fontSize: current.sub,
              fontWeight: 800,
              color: '#F5C042',
              letterSpacing: '0.5px',
              marginTop: '2px',
              textTransform: 'uppercase'
            }}
          >
            AI TRADING & EDUCATION
          </div>
        )}
      </div>
    </div>
  );
}
