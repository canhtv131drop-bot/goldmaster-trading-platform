import React from 'react';
import { useApp } from '../context/AppContext';
import EasyGoldLogo from './EasyGoldLogo';
import { BookOpen, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { setCurrentRoute } = useApp();

  const scrollToForm = () => {
    const el = document.getElementById('register-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentRoute('home');
      setTimeout(() => {
        const target = document.getElementById('register-form-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '68px',
      zIndex: 9999,
      background: 'linear-gradient(180deg, rgba(12, 16, 24, 0.98) 0%, rgba(5, 7, 10, 0.96) 100%)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(245, 192, 66, 0.5)',
      boxShadow: '0 4px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(245, 192, 66, 0.25)'
    }}>
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center', 
          justifyContent: 'flex-start', 
          gap: '18px',
          height: '100%', 
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          boxSizing: 'border-box'
        }}
      >
        
        {/* LOGO EASYGOLD */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <EasyGoldLogo 
            size="small" 
            showSubtext={false}
            onClick={() => setCurrentRoute('home')} 
          />
        </div>

        {/* EYE-CATCHING SUPER GLOW GOLD BUTTON WITH SHIMMER ANIMATION */}
        <button 
          onClick={scrollToForm}
          className="btn-super-glow-gold"
          style={{
            padding: '9px 18px',
            fontSize: '0.85rem',
            borderRadius: '12px',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={16} />
          <BookOpen size={16} />
          <span>ĐĂNG KÝ KHOÁ HỌC</span>
        </button>

      </div>
    </header>
  );
}
