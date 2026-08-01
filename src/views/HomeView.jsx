import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import AnimatedCandles from '../components/AnimatedCandles';
import { ShieldAlert, CheckCircle2, Clock, Users, ArrowRight, Zap, Target, Award, Star, Flame, BookOpen, ChevronDown, ChevronUp, Video, Gift, TrendingUp, Sparkles, Send, ShieldCheck, Check, PhoneCall, BarChart2, AlertTriangle, AlertCircle, MessageSquare } from 'lucide-react';

export default function HomeView() {
  const { courses, addLead, setCurrentRoute, winRatePercent, testimonials, cms, signals } = useApp();

  const zaloUrl = cms.zaloGroupUrl || 'https://zalo.me/g/hyoiwdpqc5auq9vbainr';

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', capital: '$1,000 - $5,000', platform: 'Nhóm Zalo VIP' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion state for secondary syllabus
  const [openModule, setOpenModule] = useState(1);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: cms.countdownHours || 5, minutes: cms.countdownMinutes || 24, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, hours: prev.hours };
        if (prev.hours > 0) return { seconds: 59, minutes: 59, hours: prev.hours - 1 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại / Zalo để vào nhóm Tín hiệu Zalo VIP!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      addLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        capital: formData.capital,
        platform: formData.platform,
        source: 'EasyGold Registration Form',
        notes: `Đăng ký nhận tín hiệu & Khoá học Crazii 3 buổi. Email: ${formData.email || 'Chưa có'}`
      });
      setIsSubmitting(false);

      // Navigate straight to Thank You view
      setCurrentRoute('thank-you');
    }, 400);
  };

  const scrollToForm = () => {
    const el = document.getElementById('register-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSignals = () => {
    const el = document.getElementById('section-vip-signals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '90px' }}>

      {/* TOP URGENCY ANNOUNCEMENT BANNER - BRAND GOLD GRADIENT */}
      <div style={{
        background: 'linear-gradient(90deg, #b8860b 0%, #f5c042 50%, #d4af37 100%)',
        color: '#080a0f',
        textAlign: 'center',
        padding: '12px 20px',
        fontWeight: 900,
        fontSize: '0.92rem',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 18px rgba(245, 192, 66, 0.45)'
      }}>
        🔥 NHẬN 5-10 TÍN HIỆU XAUUSD MỖI NGÀY TẠI NHÓM ZALO VIP - CHỈ CÒN {cms.availableSlots} SLOT!
      </div>

      {/* 1. HERO SECTION - 2 COLUMN SPLIT WITH MASTER PHÚC PORTRAIT ON THE RIGHT */}
      <section style={{
        padding: '24px 0 45px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Glow ambient background lights */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(245, 192, 66, 0.25) 0%, rgba(212, 175, 55, 0.1) 40%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(45px)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className="grid-2" style={{ alignItems: 'center', gap: '44px' }}>
            
            {/* LEFT COLUMN: HEADLINE, HOOK, AND CTAs */}
            <div style={{ textAlign: 'left' }}>
              
              {/* TOP BADGE */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 192, 66, 0.22) 0%, rgba(212, 175, 55, 0.15) 100%)',
                border: '1px solid rgba(245, 192, 66, 0.6)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 22px',
                borderRadius: '30px',
                fontWeight: 900,
                fontSize: '0.9rem',
                marginBottom: '22px',
                boxShadow: '0 0 25px rgba(245, 192, 66, 0.35)'
              }}>
                <MessageSquare size={18} color="var(--gold-bright)" />
                <span>Bí quyết sống còn cùng Forex</span>
              </div>

              {/* HERO MAIN TITLE */}
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', lineHeight: 1.18, marginBottom: '32px' }}>
                THAM GIA NHÓM ZALO TÍN HIỆU <span className="text-gold-gradient">XAUUSD VIP</span> EASYGOLD
              </h1>

              {/* HERO ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a 
                  href={zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold pulse-glow-gold" 
                  style={{ padding: '18px 36px', fontSize: '1.15rem', borderRadius: '16px', textDecoration: 'none' }}
                >
                  <MessageSquare size={24} />
                  <span>THAM GIA NHÓM ZALO VIP NGAY</span>
                </a>

                <button onClick={scrollToForm} className="btn-outline-gold" style={{ padding: '18px 28px', fontSize: '1.05rem', borderRadius: '16px' }}>
                  <BookOpen size={20} />
                  <span>ĐĂNG KÝ KHOÁ HỌC MIỄN PHÍ</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: MASTER HARRY PORTRAIT & ANIMATED CANDLES */}
            <div style={{ position: 'relative' }}>
              
              {/* MASTER MAIN VIP PORTRAIT CARD */}
              <div className="glass-card gold-glow" style={{ padding: '28px', borderRadius: '26px', textAlign: 'center', position: 'relative' }}>
                
                {/* VIP EXPERT BADGE */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'var(--gradient-gold)',
                  color: '#080a0f',
                  padding: '5px 14px',
                  borderRadius: '14px',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(245, 192, 66, 0.4)'
                }}>
                  <Award size={15} /> TOP ANALYST
                </div>

                {/* MASTER PORTRAIT CIRCLE IMAGE */}
                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px auto' }}>
                  <img 
                    src="/mr_harry.png" 
                    alt="Mr Harry - Trưởng Ban Bắn Lệnh XAUUSD"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: '85% 10%',
                      border: '4px solid var(--gold-bright)',
                      boxShadow: '0 0 35px var(--gold-glow)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    right: '6px',
                    background: '#10b981',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '6px',
                    border: '3px solid #080a0f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle2 size={20} />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '4px' }}>MR HARRY</h3>
                <div style={{ color: 'var(--gold-bright)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '18px' }}>
                  Master Easygold 6+ năm kinh nghiệm giao dịch XAUUSD
                </div>

                {/* ANIMATED CANDLESTICKS COMPONENT UNDER PORTRAIT */}
                <div style={{ marginTop: '16px' }}>
                  <AnimatedCandles height={180} />
                </div>

              </div>

            </div>

          </div>

          {/* QUICK STATS TICKER BELOW 2-COLUMN HERO */}
          <div className="glass-card grid-4" style={{ marginTop: '24px', padding: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--gold-bright)' }}>5 - 10 Lệnh</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Tín hiệu XAUUSD / ngày</div>
            </div>
            <div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--green-win)' }}>{winRatePercent}%</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Tỷ lệ Winrate trung bình</div>
            </div>
            <div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--gold-bright)' }}>+4,200 Pips</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Lợi nhuận TB / tháng</div>
            </div>
            <div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#38bdf8' }}>15,200+</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Thành viên Nhóm Zalo</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SECTION PAIN POINTS (NỖI ĐAU KHÁCH HÀNG - ĐẶT LÊN ĐẦU TIÊN) */}
      <section id="section-pain-points" style={{ padding: '30px 0 20px 0', position: 'relative', background: 'rgba(10, 14, 20, 0.75)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.18)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '20px',
              fontWeight: 900,
              fontSize: '0.88rem',
              marginBottom: '12px'
            }}>
              <AlertTriangle size={18} color="#f87171" /> THỰC TRẠNG CỦA 95% TRADER VIỆT NAM
            </div>

            <h2 style={{ fontSize: '2.4rem', color: '#fff' }}>NỖI ĐAU LỚN NHẤT TRADER MỚI LUÔN GẶP PHẢI!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '800px', margin: '8px auto 0 auto' }}>
              Bạn có đang bế tắc trong vòng lặp thua lỗ liên tục trên thị trường Vàng XAUUSD?
            </p>
          </div>

          <div className="grid-3" style={{ gap: '26px' }}>
            {[
              { stat: '95%', title: 'Cháy Tài Khoản Liên Tục', desc: 'Thống kê 95% trader cháy sạch tài sản chỉ trong 3 tháng đầu giao dịch vì không hiểu quy luật di chuyển của dòng tiền cá mập.' },
              { stat: '01', title: 'Bị Cá Mập Bóp Stop Loss', desc: 'Đặt Stop Loss ở đâu là giá giật lên quét đúng điểm đó rồi mới chạy đúng hướng. Cảm giác vô cùng ức chế!' },
              { stat: '02', title: 'Trade Theo Cảm Tính (FOMO)', desc: 'Thấy Vàng nhảy vội Mua, thấy sập vội Bán hoặc nghe theo các nhóm bắn lệnh nhồi volume rác dẫn tới thảm kịch cháy tài khoản.' },
              { stat: '03', title: 'Gồng Lỗ Hàng Trăm Pips', desc: 'Gồng lỗ cực giỏi nhưng chốt lời chỉ 5-10 pips. Tâm lý sợ hãi, lo lắng chi phối làm mất ăn mất ngủ mỗi đêm.' },
              { stat: '04', title: 'Học Nhiều Khoá Vẫn Thua', desc: 'Đã bỏ ra hàng chục triệu học nhiều chỉ báo phức tạp (RSI, MACD, Bollinger Bands) nhưng áp dụng thực chiến vẫn lỗ.' },
              { stat: '05', title: 'Thiếu Phương Pháp Quản Lý Vốn', desc: 'Đi lot vô tội vạ, nhồi lệnh gỡ gạc khi thua làm khoản lỗ nhân lên gấp nhiều lần trong vài phút.' }
            ].map((item, idx) => (
              <div key={idx} className="glass-card glass-card-hover" style={{ padding: '32px', borderColor: 'rgba(245, 192, 66, 0.35)' }}>
                <div style={{ color: 'var(--gold-bright)', fontWeight: 900, fontSize: '2.5rem', marginBottom: '10px', textShadow: '0 0 15px rgba(245, 192, 66, 0.5)' }}>{item.stat}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#ffffff' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.68' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIP SIGNAL GROUP SOLUTION SECTION */}
      <section id="section-vip-signals" style={{ padding: '24px 0 60px 0' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              background: 'rgba(245, 192, 66, 0.15)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-bright)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '20px',
              fontWeight: 900,
              fontSize: '0.88rem',
              marginBottom: '12px'
            }}>
              <Flame size={18} color="var(--gold-bright)" /> GIẢI PHÁP TẬN GỐC DÀNH CHO BẠN
            </div>

            <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
              NHÓM TÍN HIỆU VÀNG <span className="text-gold-gradient">XAUUSD ZALO VIP</span> EASYGOLD
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '820px', margin: '0 auto' }}>
              Giải pháp chấm dứt chuỗi thua lỗ! Đồng hành cùng Đội ngũ Chuyên gia AI Trading & Mr Harry trực tiếp trong Nhóm Zalo — Bắn lệnh Realtime 24/7 kèm Lý do nến thanh khoản chuẩn xác <strong>Winrate {winRatePercent}%</strong>.
            </p>
          </div>

          {/* 4 VIP ADVANTAGES GRID */}
          <div className="grid-4" style={{ gap: '22px', marginBottom: '40px' }}>
            
            <div className="glass-card glass-card-hover" style={{ padding: '26px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 192, 66, 0.2)', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <TrendingUp size={26} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: '#fff' }}>5 - 10 Lệnh / Ngày</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                Điểm vào Entry, Take Profit 1-2-3 và Stop Loss cố định. Kèm hình ảnh TradingView giải thích kịch bản nến.
              </p>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '26px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: '#fff' }}>Winrate {winRatePercent}%</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                Minh bạch lịch sử lệnh thắng/thua hàng tuần. Tối ưu tỷ lệ R:R tối thiểu 1:2.5 đến 1:5 để có lợi nhuận bền vững.
              </p>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '26px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MessageSquare size={26} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: '#fff' }}>Báo Lệnh Zalo Realtime</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                Thông báo lập tức qua Zalo khi lệnh khớp Entry, chạm TP hoặc dời SL về Huề vốn (BE).
              </p>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '26px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 192, 66, 0.2)', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: '#fff' }}>Quản Lý Rủi Ro</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                Tuyệt đối không nhồi lệnh, không gồng lỗ. Tuân thủ nghiêm ngặt tỷ lệ đi lot rủi ro 1-2% / lệnh.
              </p>
            </div>

          </div>

          {/* LIVE VIP SIGNALS PREVIEW CARDS */}
          <div className="glass-card gold-glow" style={{ padding: '32px', borderRadius: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame color="var(--gold-bright)" size={22} /> TÍN HIỆU VÀNG XAUUSD LIVE MỚI NHẤT TRÊN ZALO
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cập nhật liên tục theo các phiên giao dịch Á - Âu - Mỹ</div>
              </div>

              <a 
                href={zaloUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-gold" 
                style={{ padding: '10px 20px', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <MessageSquare size={16} /> Vào Nhóm Zalo VIP Ngay
              </a>
            </div>

            <div className="grid-2" style={{ gap: '20px' }}>
              {signals.slice(0, 2).map(sig => (
                <div key={sig.id} style={{ background: 'rgba(8, 11, 16, 0.9)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--gold-bright)' }}>{sig.pair}</span>
                      <span style={{
                        background: sig.type.includes('BUY') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: sig.type.includes('BUY') ? '#34d399' : '#f87171',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: 900,
                        fontSize: '0.85rem'
                      }}>
                        {sig.type}
                      </span>
                    </div>

                    <span className={sig.result === 'WIN' ? 'badge-win' : sig.result === 'LOSS' ? 'badge-loss' : 'badge-running'}>
                      {sig.result} ({sig.pips})
                    </span>
                  </div>

                  <div className="grid-3" style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '10px', marginBottom: '12px', textAlign: 'center', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Entry</div>
                      <div style={{ fontWeight: 800, color: '#fff' }}>{sig.entry}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--green-win)' }}>Take Profit 1</div>
                      <div style={{ fontWeight: 800, color: '#fff' }}>{sig.tp1}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--red-loss)' }}>Stop Loss</div>
                      <div style={{ fontWeight: 800, color: '#fff' }}>{sig.sl}</div>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '10px' }}>
                    <strong>Lý do phân tích:</strong> {sig.note}
                  </p>

                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Phát tín hiệu trong Nhóm Zalo lúc: {sig.date}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROOF & SIGNAL HISTORY TABLE SECTION */}
      <section style={{ padding: '75px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div style={{ color: 'var(--green-win)', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>BẰNG CHỨNG THỰC TẾ</div>
            <h2 style={{ fontSize: '2.2rem' }}>NHẬT KÝ TÍN HIỆU GIAO DỊCH VÀNG MỚI NHẤT</h2>
          </div>

          <div className="glass-card" style={{ padding: '26px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--gold-bright)', fontSize: '0.88rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px' }}>Mã Lệnh</th>
                  <th style={{ padding: '14px' }}>Loại Lệnh</th>
                  <th style={{ padding: '14px' }}>Giá Entry</th>
                  <th style={{ padding: '14px' }}>TP / SL</th>
                  <th style={{ padding: '14px' }}>Kết Quả Pips</th>
                  <th style={{ padding: '14px' }}>Trạng Thái</th>
                  <th style={{ padding: '14px' }}>Phân Tích Nến Thanh Khoản</th>
                </tr>
              </thead>
              <tbody>
                {signals.map(sig => (
                  <tr key={sig.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }}>
                    <td style={{ padding: '16px 14px', fontWeight: 800 }}>{sig.id}</td>
                    <td style={{ padding: '16px 14px' }}>
                      <span style={{
                        background: sig.type.includes('BUY') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: sig.type.includes('BUY') ? '#34d399' : '#f87171',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.85rem'
                      }}>
                        {sig.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px 14px', fontWeight: 700 }}>{sig.entry}</td>
                    <td style={{ padding: '16px 14px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      TP1: {sig.tp1} | SL: {sig.sl}
                    </td>
                    <td style={{ padding: '16px 14px', fontWeight: 900, color: sig.result === 'WIN' ? 'var(--green-win)' : 'var(--red-loss)' }}>
                      {sig.pips}
                    </td>
                    <td style={{ padding: '16px 14px' }}>
                      <span className={sig.result === 'WIN' ? 'badge-win' : sig.result === 'LOSS' ? 'badge-loss' : 'badge-running'}>
                        {sig.result}
                      </span>
                    </td>
                    <td style={{ padding: '16px 14px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{sig.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. SECONDARY BONUS COURSE SECTION */}
      <section id="section-syllables" style={{ padding: '30px 0 60px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              background: 'rgba(245, 192, 66, 0.15)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-bright)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '20px',
              fontWeight: 900,
              fontSize: '0.88rem',
              marginBottom: '12px'
            }}>
              <Gift size={18} /> QUÀ TẶNG ĐẶC QUYỀN ĐÀO TẠO KÈM THEO
            </div>

            <h2 style={{ fontSize: 'clamp(1.5rem, 4.2vw, 2.3rem)', lineHeight: 1.25 }}>
              KHOÁ HỌC 3 BUỔI<br />
              <span className="text-gold-gradient">"TRUYỀN NGHỀ TRADING TỪ A-Z"</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '1rem' }}>
              Tặng miễn phí 100% cho Thành viên Nhóm Zalo VIP (Học Online trực tiếp qua Zoom)
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {courses.modules.map(module => {
              const isOpen = openModule === module.id;
              return (
                <div key={module.id} className="glass-card" style={{ padding: '26px', transition: 'all 0.25s ease' }}>
                  <div 
                    onClick={() => setOpenModule(isOpen ? null : module.id)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'var(--gradient-btn-gold)',
                        color: '#080a0f',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        flexShrink: 0,
                        boxShadow: '0 0 15px rgba(245, 192, 66, 0.4)'
                      }}>
                        0{module.id}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>{module.title}</h3>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', color: 'var(--gold-bright)' }}>
                      {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingLeft: '64px' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '18px' }}>{module.description}</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {module.lessons.map((lesson, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.94rem', color: '#ffffff' }}>
                            <CheckCircle2 size={18} color="var(--gold-bright)" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INSTRUCTOR & HEAD ANALYST */}
      <section id="section-instructor" style={{ padding: '75px 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="glass-card grid-2" style={{ padding: '44px', alignItems: 'center', gap: '44px' }}>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="/mr_harry.png" 
                alt="Mr Harry"
                style={{ width: '240px', height: '240px', borderRadius: '50%', objectFit: 'cover', objectPosition: '85% 10%', border: '4px solid var(--gold-bright)', boxShadow: '0 0 40px var(--gold-glow)', margin: '0 auto 18px auto' }}
              />
              <h3 style={{ fontSize: '1.75rem', color: '#fff' }}>MR HARRY</h3>
              <div style={{ color: 'var(--gold-bright)', fontWeight: 800, fontSize: '1rem' }}>Master Easygold 6+ năm kinh nghiệm giao dịch XAUUSD</div>
            </div>

            <div>
              <div style={{ color: 'var(--gold-bright)', fontWeight: 900, fontSize: '0.88rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>CHUYÊN GIA ĐỒNG HÀNH</div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '18px' }}>HƠN 6 NĂM KINH NGHIỆM PHÂN TÍCH XAUUSD</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.75', marginBottom: '26px' }}>
                {courses.instructorBio}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.96rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Award size={22} color="var(--gold-bright)" /> Trực tiếp soi chart & phát 5-10 tín hiệu XAUUSD chuẩn xác mỗi ngày
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Award size={22} color="var(--gold-bright)" /> Hướng dẫn học viên làm chủ công cụ Crazii, đảm bảo lợi nhuận/rủi ro
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STUDENT & MEMBER TESTIMONIALS */}
      <section id="section-testimonials" style={{ padding: '75px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ color: 'var(--gold-bright)', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>CẢM NHẬN HỌC VIÊN & THÀNH VIÊN</div>
            <h2 style={{ fontSize: '2.4rem' }}>ĐÁNH GIÁ THỰC TẾ TỪ CỘNG ĐỒNG EASYGOLD ZALO VIP</h2>
          </div>

          <div className="grid-3">
            {testimonials.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: 'var(--gold-bright)', marginBottom: '16px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p style={{ fontSize: '0.98rem', color: '#e2e8f0', fontStyle: 'italic', marginBottom: '26px', lineHeight: '1.65' }}>
                    "{item.comment}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '18px' }}>
                  <img src={item.avatar} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-bright)' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{item.role} • <span style={{ color: 'var(--green-win)', fontWeight: 800 }}>{item.profit}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRIMARY REGISTRATION FORM FOR ZALO VIP SIGNAL GROUP */}
      <section id="register-form-section" style={{ padding: '30px 0 24px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          
          <div className="glass-card gold-glow" style={{ padding: '48px 40px', borderRadius: '26px' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ background: 'rgba(245, 192, 66, 0.2)', color: 'var(--gold-bright)', border: '1px solid var(--border-gold)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '24px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '16px' }}>
                <Clock size={18} /> CHỈ DÀNH CHO 100 SLOT ĐĂNG KÝ NHANH NHẤT HÔM NAY!
              </div>

              <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>ĐĂNG KÝ VÀO NHÓM ZALO TÍN HIỆU XAUUSD VIP (MIỄN PHÍ)</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                Nhận 5-10 lệnh Vàng/ngày + Tặng kèm Khoá học Đào tạo 3 buổi qua Zoom & Bộ Indicator Crazii
              </p>

              {/* TIMER */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '24px 0' }}>
                <div style={{ background: 'rgba(8, 11, 16, 0.9)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '14px', minWidth: '76px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-bright)' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GIỜ</div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-bright)', alignSelf: 'center' }}>:</div>
                <div style={{ background: 'rgba(8, 11, 16, 0.9)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '14px', minWidth: '76px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-bright)' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PHÚT</div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-bright)', alignSelf: 'center' }}>:</div>
                <div style={{ background: 'rgba(8, 11, 16, 0.9)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '14px', minWidth: '76px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-bright)' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GIÂY</div>
                </div>
              </div>

              <div style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span>Chỉ còn đúng</span>
                <span 
                  style={{ 
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    padding: '4px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #f87171',
                    boxShadow: '0 0 15px rgba(239, 68, 68, 0.75)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  🔥 {cms.availableSlots} Slot
                </span>
                <span>đăng ký miễn phí hôm nay!</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label className="form-label">Họ và Tên Trader (*)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ví dụ: Nguyễn Văn Minh" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Số Điện Thoại / Zalo (*)</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="Ví dụ: 0353 753 863" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Mức Vốn Giao Dịch Hiện Tại (*)</label>
                <select 
                  className="form-input"
                  value={formData.capital}
                  onChange={e => setFormData({ ...formData, capital: e.target.value })}
                >
                  <option value="Dưới $1,000">Dưới $1,000 (Tài khoản nhỏ)</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000 (Tài khoản tiêu chuẩn)</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000 (Tài khoản lớn)</option>
                  <option value="Trên $10,000">Trên $10,000 (VIP Trader)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn-gold pulse-glow-gold" 
                disabled={isSubmitting}
                style={{ width: '100%', padding: '20px', fontSize: '1.25rem', borderRadius: '14px', marginTop: '10px' }}
              >
                {isSubmitting ? 'ĐANG XỬ LÝ ĐĂNG KÝ...' : 'XÁC NHẬN VÀO NHÓM ZALO VIP NGAY!'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                🔒 Thông tin của bạn được bảo mật tuyệt đối. Bạn sẽ được chuyển hướng thẳng tới nhóm Zalo chính thức trong 3 giây.
              </div>
            </form>

          </div>

        </div>
      </section>

      {/* PERMANENT STICKY BOTTOM CTA BAR */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(180deg, rgba(12, 16, 24, 0.98) 0%, rgba(5, 7, 10, 0.98) 100%)',
        backdropFilter: 'blur(18px)',
        borderTop: '1px solid var(--gold-bright)',
        padding: '8px 12px',
        zIndex: 1000,
        boxShadow: '0 -10px 35px rgba(0, 0, 0, 0.9), 0 0 20px rgba(245, 192, 66, 0.2)',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 0, boxSizing: 'border-box' }}>
          <a 
            href={zaloUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-gold sticky-bottom-btn" 
            style={{ 
              padding: '7px 18px', 
              fontSize: '0.78rem', 
              borderRadius: '10px',
              textDecoration: 'none',
              width: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box'
            }}
          >
            <span>Vào Group Zalo</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

    </div>
  );
}
