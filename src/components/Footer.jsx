import React from 'react';
import { useApp } from '../context/AppContext';
import EasyGoldLogo from './EasyGoldLogo';
import { ShieldAlert, PhoneCall, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  const { cms, setCurrentRoute, setAdminTab } = useApp();
  const zaloUrl = cms.zaloGroupUrl || 'https://zalo.me/g/hyoiwdpqc5auq9vbainr';

  // Secret admin click trigger on copyright footer
  const handleSecretAdminAccess = () => {
    setCurrentRoute('admin');
    if (setAdminTab) setAdminTab('dashboard');
  };

  return (
    <footer style={{ background: '#05070a', borderTop: '1px solid var(--border-color)', marginTop: '0px' }}>
      {/* Top Banner Disclaimer */}
      <div style={{ background: 'rgba(245, 192, 66, 0.08)', borderBottom: '1px solid rgba(245, 192, 66, 0.25)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#f5c042', fontSize: '0.85rem' }}>
          <ShieldAlert size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>CẢNH BÁO RỦI RO ĐẦU TƯ TÀI CHÍNH (RISK DISCLAIMER):</strong> Giao dịch Vàng XAUUSD và Hợp đồng Chênh lệch (CFD) sử dụng đòn bẩy tài chính chứa đựng mức độ rủi ro rất cao và có thể dẫn đến việc mất toàn bộ vốn đầu tư của bạn. Bạn không nên đầu tư số tiền mà bạn không thể chấp nhận mất. Mọi thông tin tín hiệu, bài giảng và phân tích tại EasyGold - AI Trading & Education chỉ mang tính chất tham khảo & giáo dục, không phải lời khuyên đầu tư tài chính hay ủy thác đầu tư.
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px 40px 20px' }}>
        <div className="grid-3" style={{ gap: '40px' }}>
          
          {/* Col 1: Brand Info with Large EasyGold Logo */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <EasyGoldLogo size="medium" />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.6' }}>
              Nền tảng đào tạo AI Trading & Nhóm Tín hiệu giao dịch Vàng XAUUSD thực chiến hàng đầu Việt Nam.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={zaloUrl} target="_blank" rel="noreferrer" className="btn-gold" style={{ padding: '10px 18px', fontSize: '0.85rem', textDecoration: 'none' }}>
                <MessageSquare size={16} /> Tham Gia Nhóm Zalo VIP
              </a>
            </div>
          </div>

          {/* Col 2: Course Links */}
          <div>
            <h4 style={{ color: 'var(--gold-primary)', marginBottom: '16px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Khoá Học 3 Buổi Tặng Kèm
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><span style={{ color: 'var(--text-muted)' }}>● Buổi 1: Nghề Trading - Xu hướng tương lai</span></li>
              <li><span style={{ color: 'var(--text-muted)' }}>● Buổi 2: Bản chất thị trường & Công cụ Crazii</span></li>
              <li><span style={{ color: 'var(--text-muted)' }}>● Buổi 3: Giao dịch an toàn cùng Crazii</span></li>
            </ul>
          </div>

          {/* Col 3: Support Contact */}
          <div>
            <h4 style={{ color: 'var(--gold-primary)', marginBottom: '16px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Hỗ Trợ & Liên Hệ Zalo
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={16} color="var(--gold-primary)" />
                <span>Nhóm Zalo VIP: <a href={zaloUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>Tham gia ngay</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PhoneCall size={16} color="var(--gold-primary)" />
                <span>Hotline / Zalo Trợ lý: {cms.supportHotline && cms.supportHotline !== '0988.123.456' ? cms.supportHotline : '0353.753.863'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--gold-primary)" />
                <span>Email: support@easygold.ai</span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER COPYRIGHT WITH SECRET ADMIN ACCESS */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#475569' }}>
          <span 
            onClick={handleSecretAdminAccess}
            style={{ cursor: 'pointer', transition: 'color 0.2s ease' }}
            title="EasyGold Platform"
          >
            © 2026 EASY GOLD - AI TRADING & EDUCATION. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
