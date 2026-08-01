import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export default function ThankYouView() {
  const { cms, setCurrentRoute } = useApp();
  const zaloUrl = cms.zaloGroupUrl || 'https://zalo.me/g/hyoiwdpqc5auq9vbainr';

  useEffect(() => {
    // Automatically redirect or trigger pixel events
    console.log('Lead Registered Event Fired - Redirecting to Zalo Group:', zaloUrl);
  }, [zaloUrl]);

  return (
    <div style={{ minHeight: '80vh', padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        
        <div className="glass-card gold-glow" style={{ padding: '50px 36px', textAlign: 'center', borderRadius: '28px' }}>
          
          {/* SUCCESS ICON */}
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'var(--gradient-btn-gold)',
            color: '#080a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 35px var(--gold-glow)'
          }}>
            <CheckCircle2 size={52} />
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.18)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '0.9rem',
            marginBottom: '16px'
          }}>
            <Sparkles size={16} /> ĐĂNG KÝ THÀNH CÔNG SLOT VIP
          </div>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '14px', color: '#ffffff' }}>
            CHÚC MỪNG BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG!
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginBottom: '32px', lineHeight: '1.7' }}>
            Bước cuối cùng quan trọng nhất: Hãy bấm nút bên dưới để <strong style={{ color: 'var(--gold-bright)' }}>THAM GIA NGAY NHÓM ZALO VIP EASYGOLD</strong> để nhận 5-10 tín hiệu Vàng XAUUSD chuẩn xác mỗi ngày!
          </p>

          {/* PRIMARY ZALO VIP GROUP JOIN BUTTON */}
          <div style={{ marginBottom: '32px' }}>
            <a 
              href={zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold pulse-glow-gold"
              style={{
                padding: '22px 42px',
                fontSize: '1.25rem',
                borderRadius: '18px',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                textDecoration: 'none'
              }}
            >
              <MessageSquare size={28} />
              <span>VÀO NHÓM ZALO VIP EASYGOLD NGAY</span>
              <ArrowRight size={24} />
            </a>
          </div>

          {/* DIRECT URL DISPLAY */}
          <div style={{
            background: 'rgba(8, 11, 16, 0.9)',
            border: '1px solid var(--border-color)',
            padding: '14px 20px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '30px',
            wordBreak: 'break-all'
          }}>
            Link nhóm Zalo trực tiếp: <a href={zaloUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--gold-bright)', fontWeight: 800 }}>{zaloUrl}</a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.88rem', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="var(--gold-bright)" /> Bảo mật thông tin</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PhoneCall size={16} color="var(--gold-bright)" /> Trợ lý hỗ trợ 24/7</span>
          </div>

          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button 
              onClick={() => setCurrentRoute('home')}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
            >
              Quay lại Trang Chủ EasyGold
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
