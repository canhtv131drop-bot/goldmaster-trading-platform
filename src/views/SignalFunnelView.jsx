import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, ShieldAlert, CheckCircle2, Clock, Users, ArrowRight, Zap, Target, Award, Star, Lock, Check } from 'lucide-react';

export default function SignalFunnelView() {
  const { signals, addLead, setCurrentRoute, winRatePercent, cms } = useApp();
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', capital: '$1,000 - $5,000', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: cms.countdownHours || 8, minutes: cms.countdownMinutes || 45, seconds: 59 });

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
      alert('Vui lòng nhập Họ tên và Số điện thoại/Zalo để nhận tín hiệu!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      addLead({
        name: formData.name,
        phone: formData.phone,
        capital: formData.capital,
        source: 'Signal Funnel (Landing Ads)',
        notes: `Mức vốn: ${formData.capital}. Ghi chú: ${formData.notes}`
      });
      setIsSubmitting(false);
      setCurrentRoute('thank-you');
    }, 600);
  };

  const scrollToForm = () => {
    const el = document.getElementById('signal-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '90px' }}>

      {/* HERO SECTION */}
      <section style={{ padding: '60px 0', background: 'radial-gradient(ellipse at top, rgba(245, 192, 66, 0.12) 0%, rgba(8, 10, 15, 1) 75%)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '20px' }}>
              <ShieldAlert size={16} /> BẠN ĐÃ MẤT QUÁ NHIỀU TIỀN VÌ TỰ TRADE HOẶC THEO TÍN HIỆU RÁC?
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.2, marginBottom: '20px' }}>
              NHẬN 3-5 TÍN HIỆU <span className="text-gold-gradient">GIAO DỊCH XAUUSD</span> CHÍNH XÁC {winRatePercent}% HÀNG NGÀY
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '36px', lineHeight: '1.7' }}>
              Không còn nỗi lo gồng lỗ, cháy tài khoản hay quét Stoploss vô lý. Đi lệnh cùng Đội ngũ Chuyên gia Smart Money Concepts (SMC) — Minh bạch lệnh, rõ ràng SL/TP, bảo vệ vốn tuyệt đối.
            </p>

            {/* HERO STATS */}
            <div className="glass-card grid-3" style={{ padding: '20px', marginBottom: '40px' }}>
              <div>
                <div style={{ color: 'var(--green-win)', fontSize: '1.8rem', fontWeight: 800 }}>+{winRatePercent}%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tỷ lệ Thắng (Winrate)</div>
              </div>
              <div>
                <div style={{ color: 'var(--gold-primary)', fontSize: '1.8rem', fontWeight: 800 }}>5 - 10 Lệnh</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tín hiệu / ngày</div>
              </div>
              <div>
                <div style={{ color: '#38bdf8', fontSize: '1.8rem', fontWeight: 800 }}>R:R 1:3+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tỷ lệ Lời / Lỗ tối ưu</div>
              </div>
            </div>

            <button onClick={scrollToForm} className="btn-gold pulse-glow" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              <Zap size={20} />
              <span>ĐĂNG KÝ NHẬN TÍN HIỆU MIỄN PHÍ NGAY</span>
            </button>
          </div>

        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>VẤN ĐỀ TRADER GẶP PHẢI</div>
            <h2 style={{ fontSize: '2rem' }}>TẠI SAO 95% TRADER VIỆT NAM VẪN THUA LỖ TRÊN XAUUSD?</h2>
          </div>

          <div className="grid-4">
            {[
              { title: 'Đi lệnh theo cảm xúc (FOMO)', desc: 'Thấy Vàng tăng thì đuổi Mua, thấy giảm lại bán vội, không có kế hoạch dừng lỗ cụ thể.' },
              { title: 'Bị quét Stoploss vô lý', desc: 'Đặt SL quá mỏng tại các vùng cản yếu, liên tục bị dòng tiền lớn (Smart Money) săn thanh khoản.' },
              { title: 'Vào nhóm tín hiệu kém chất lượng', desc: 'Bắn lệnh nhồi volume, không kèm điểm SL rõ ràng, thắng lệnh nhỏ nhưng thua 1 lệnh cháy cả tuần.' },
              { title: 'Không quản lý được vốn', desc: 'Gồng lỗ hàng trăm pips nhưng chốt lời chỉ vài pips. Tâm lý bất ổn mỗi khi có tin tức mạnh.' }
            ].map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.5rem', marginBottom: '10px' }}>0{idx + 1}.</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#fca5a5' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION / OFFER DETAILS */}
      <section style={{ padding: '60px 0', background: 'rgba(17, 21, 34, 0.6)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>GIẢI PHÁP ĐỘC QUYỀN</div>
            <h2 style={{ fontSize: '2rem' }}>QUY TRÌNH PHÂN TÍCH & BẮN TÍN HIỆU TẠI GOLDMASTER</h2>
          </div>

          <div className="grid-3">
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ color: 'var(--gold-primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '12px' }}>01. Minh Bạch Thông Số</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Mỗi tín hiệu phát ra đều ghi rõ ràng: Cặp giao dịch (XAUUSD), Lệnh (BUY/SELL), Giá Entry, TP1, TP2, TP3 và SL cố định.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ color: 'var(--gold-primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '12px' }}>02. Kèm Chart Phân Tích</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Không chỉ đưa lệnh suông, đội ngũ sẽ đính kèm hình ảnh TradingView giải thích lý do vào lệnh theo SMC / Demand Supply.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ color: 'var(--gold-primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '12px' }}>03. Cập Nhật Realtime</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Thông báo lập tức qua Bot Telegram / Zalo khi lệnh khớp Entry, chạm TP, hoặc cần dời SL về Huề vốn (BE) để bảo toàn lợi nhuận.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF SECTION: REAL RECENT SIGNALS LEDGER */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ color: 'var(--green-win)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>BẰNG CHỨNG THỰC TẾ</div>
            <h2 style={{ fontSize: '2rem' }}>NHẬT KÝ TÍN HIỆU VÀNG XAUUSD MỚI NHẤT</h2>
          </div>

          <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--gold-primary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px' }}>Mã Lệnh</th>
                  <th style={{ padding: '12px' }}>Loại Lệnh</th>
                  <th style={{ padding: '12px' }}>Vùng Entry</th>
                  <th style={{ padding: '12px' }}>TP / SL</th>
                  <th style={{ padding: '12px' }}>Kết Quả Pips</th>
                  <th style={{ padding: '12px' }}>Trạng Thái</th>
                  <th style={{ padding: '12px' }}>Lý Do Phân Tích</th>
                </tr>
              </thead>
              <tbody>
                {signals.map(sig => (
                  <tr key={sig.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '14px 12px', fontWeight: 700 }}>{sig.id}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{
                        background: sig.type.includes('BUY') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: sig.type.includes('BUY') ? '#34d399' : '#f87171',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.8rem'
                      }}>
                        {sig.type}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', fontWeight: 600 }}>{sig.entry}</td>
                    <td style={{ padding: '14px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      TP1: {sig.tp1} | SL: {sig.sl}
                    </td>
                    <td style={{ padding: '14px 12px', fontWeight: 800, color: sig.result === 'WIN' ? 'var(--green-win)' : sig.result === 'LOSS' ? 'var(--red-loss)' : 'var(--gold-primary)' }}>
                      {sig.pips}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span className={sig.result === 'WIN' ? 'badge-win' : sig.result === 'LOSS' ? 'badge-loss' : 'badge-running'}>
                        {sig.result}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{sig.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* URGENCY & REGISTRATION FORM SECTION */}
      <section id="signal-form-section" style={{ padding: '60px 0', background: 'linear-gradient(180deg, rgba(8,10,15,1) 0%, rgba(20,26,42,1) 100%)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div className="glass-card gold-glow" style={{ padding: '40px 30px', borderRadius: '24px' }}>
            
            {/* COUNTDOWN & SLOTS COUNTER */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: '10px' }}>
                <Clock size={18} /> THỜI GIAN ĐÃ SẮP HẾT XUẤT NHẬN TÍN HIỆU MẪU
              </div>

              {/* TIMER DISPLAY */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '16px 0' }}>
                <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '12px', minWidth: '75px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-primary)' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GIỜ</div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-primary)', alignSelf: 'center' }}>:</div>
                <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '12px', minWidth: '75px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-primary)' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PHÚT</div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-primary)', alignSelf: 'center' }}>:</div>
                <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '12px', minWidth: '75px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-primary)' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GIÂY</div>
                </div>
              </div>

              <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.95rem' }}>
                🔥 Chỉ còn đúng <span style={{ background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '6px' }}>{cms.availableSlots} Slot</span> đăng ký miễn phí hôm nay!
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  placeholder="Ví dụ: 0988 123 456" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Mức Vốn Giao Dịch Hiện Tại</label>
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

              <div>
                <label className="form-label">Ghi Chú Hoặc Yêu Cầu Mong Muốn</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  placeholder="Ví dụ: Tôi muốn nhận tín hiệu khung M15 đánh Scalping trong phiên Âu..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-gold" 
                disabled={isSubmitting}
                style={{ width: '100%', padding: '18px', fontSize: '1.15rem', borderRadius: '12px', marginTop: '10px' }}
              >
                {isSubmitting ? 'ĐANG XỬ LÝ ĐĂNG KÝ...' : 'XÁC NHẬN ĐĂNG KÝ VÀO NHÓM TÍN HIỆU'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                🔒 Thông tin của bạn được bảo mật tuyệt đối. Đội ngũ trợ lý sẽ liên hệ xác nhận qua Zalo trong 5 phút.
              </div>
            </form>

          </div>

        </div>
      </section>

      {/* MOBILE STICKY CTA BAR */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(8, 10, 15, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--gold-primary)',
        padding: '12px 20px',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -10px 25px rgba(0,0,0,0.5)'
      }}>
        <div>
          <div style={{ color: 'var(--gold-primary)', fontWeight: 800, fontSize: '0.9rem' }}>Tín Hiệu XAUUSD Winrate {winRatePercent}%</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Chỉ còn {cms.availableSlots} Slot Miễn Phí</div>
        </div>

        <button onClick={scrollToForm} className="btn-gold" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
          <span>Nhận Tín Hiệu</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
