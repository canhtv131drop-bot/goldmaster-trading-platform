import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Award, Gift, Calendar, Video, Clock, Star, HelpCircle, ArrowRight, Zap, Check } from 'lucide-react';

export default function CourseFunnelView() {
  const { courses, addLead, setCurrentRoute, cms } = useApp();

  // Accordion state for syllabus modules
  const [openModule, setOpenModule] = useState(1);

  // Accordion state for FAQ
  const [openFaq, setOpenFaq] = useState(0);

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', capital: '$1,000 - $5,000' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng điền thông tin Họ tên và Số điện thoại!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      addLead({
        name: formData.name,
        phone: formData.phone,
        capital: formData.capital,
        source: 'Course Funnel (Landing Ads)',
        notes: `Email: ${formData.email || 'Không có'}. Đăng ký khoá học Zoom miễn phí.`
      });
      setIsSubmitting(false);
      setCurrentRoute('thank-you');
    }, 600);
  };

  const scrollToForm = () => {
    const el = document.getElementById('course-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const bonusStack = [
    { title: 'Bộ Indicator Crazii Tự Động Vẽ FVG & Zone H4', value: '4.500.000 VNĐ' },
    { title: 'Ebook "Bí Kíp Nhận Biết Bẫy Bơm Thổi Vàng XAUUSD"', value: '2.500.000 VNĐ' },
    { title: 'Quyền Truy Cập Kênh Tín Hiệu Thử Nghiệm 30 Ngày', value: '5.000.000 VNĐ' },
    { title: 'Bộ Template Quản Lý Vốn & Tính Lot Excel', value: '3.000.000 VNĐ' }
  ];

  const faqs = [
    { q: 'Khoá học này có thực sự MIỄN PHÍ không?', a: 'Hoàn toàn MIỄN PHÍ! Đây là khoá học cộng đồng nhằm xây dựng tư duy giao dịch chuẩn mực cho Trader Việt Nam.' },
    { q: 'Tôi mới bắt đầu chưa có kinh nghiệm có học được không?', a: 'Hoàn toàn học được! Nội dung thiết kế từ cơ bản đến nâng cao, đi qua từng bước xây dựng nền tảng vững chắc.' },
    { q: 'Hình thức học và thời gian ra sao?', a: 'Học online trực tiếp qua Zoom 3 buổi vào buổi tối (20:00 - 22:00). Có video quay lại bài giảng cho học viên xem lại.' },
    { q: 'Sau khoá học tôi có được hỗ trợ tiếp không?', a: 'Bạn được tham gia vào nhóm Zalo/Telegram học viên để được giải đáp thắc mắc và cập nhật tín hiệu hàng ngày.' }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '90px' }}>

      {/* HERO SECTION */}
      <section style={{ padding: '60px 0', background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(8, 10, 15, 1) 75%)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '20px' }}>
              <Video size={16} /> KHOÁ HỌC ĐÀO TẠO ONLINE QUA ZOOM (3 BUỔI THỰC CHẠI)
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.2, marginBottom: '20px' }}>
              {courses.title}
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.7' }}>
              Làm chủ phương pháp giao dịch <strong>Phương Pháp Crazii</strong> — Nhận biết vết chân dòng tiền lớn, tối ưu hóa điểm vào lệnh R:R cao và xây dựng hệ thống giao dịch tự chủ bền vững.
            </p>

            {/* PRICE HIGHLIGHT BADGE */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'rgba(17, 21, 34, 0.9)', border: '1px solid var(--gold-primary)', padding: '12px 28px', borderRadius: '16px', marginBottom: '36px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                Giá gốc: {courses.originalPrice}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                {courses.promoPrice}
              </div>
            </div>

            <div>
              <button onClick={scrollToForm} className="btn-gold pulse-glow" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                <BookOpen size={20} />
                <span>GIỮ SLOTS ĐĂNG KÝ HỌC ZOOM MIỄN PHÍ</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SYLLABUS / CURRICULUM ACCORDION */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>NỘI DUNG CHI TIẾT</div>
            <h2 style={{ fontSize: '2rem' }}>LỘ TRÌNH 3 BUỔI HỌC THỰC CHẠI CÙNG CHUYÊN GIA</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {courses.modules.map(module => {
              const isOpen = openModule === module.id;
              return (
                <div key={module.id} className="glass-card" style={{ padding: '24px', transition: 'all 0.25s ease' }}>
                  <div 
                    onClick={() => setOpenModule(isOpen ? null : module.id)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                        BUỔI 0{module.id}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{module.title}</h3>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px', borderRadius: '50%', color: 'var(--gold-primary)' }}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{module.description}</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {module.lessons.map((lesson, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            <CheckCircle2 size={16} color="var(--green-win)" />
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

      {/* INSTRUCTOR PROFILE */}
      <section style={{ padding: '60px 0', background: 'rgba(17, 21, 34, 0.6)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          <div className="glass-card grid-2" style={{ padding: '36px', alignItems: 'center', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80" 
                alt="Master Trịnh Việt Cường"
                style={{ width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold-primary)', boxShadow: '0 0 30px var(--gold-glow)', margin: '0 auto 16px auto' }}
              />
              <h3 style={{ fontSize: '1.4rem' }}>{courses.instructor}</h3>
              <div style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Head Analyst & Senior Coach</div>
            </div>

            <div>
              <div style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>GIẢNG VIÊN ĐỒNG HÀNH</div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>KINH NGHIỆM THỰC CHẠI TRÊN 8 NĂM</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
                {courses.instructorBio}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={18} color="var(--gold-primary)" /> Quản lý quỹ đầu tư tư nhân trên $500,000
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={18} color="var(--gold-primary)" /> Đào tạo hơn 4,500+ học viên tự chủ trading
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BONUS STACK SECTION */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>QUÀ TẶNG KÈM ĐỘC QUYỀN</div>
            <h2 style={{ fontSize: '2rem' }}>TỔNG GIÁ TRỊ QUÀ TẶNG KÈM LÊN ĐẾN 15.000.000 VNĐ</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
            {bonusStack.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Gift size={22} color="var(--gold-primary)" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</span>
                </div>
                <span style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'line-through' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(245, 192, 66, 0.12)', border: '1px solid var(--gold-primary)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>TỔNG GIÁ TRỊ QUÀ TẶNG: <span style={{ textDecoration: 'line-through', color: '#f87171' }}>15.000.000 VNĐ</span></div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-primary)', marginTop: '4px' }}>TẤT CẢ DÀNH CHO BẠN: 0 VNĐ (MIỄN PHÍ HÔM NAY)</div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="course-form-section" style={{ padding: '60px 0', background: 'linear-gradient(180deg, rgba(8,10,15,1) 0%, rgba(15,23,42,1) 100%)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div className="glass-card gold-glow" style={{ padding: '40px 30px', borderRadius: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>ĐĂNG KÝ HỌC ZOOM</div>
              <h2 style={{ fontSize: '1.8rem' }}>ĐĂNG KÝ GIỮ THỨ TỰ THAM GIA KHOÁ HỌC</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                Lịch khai giảng: <strong>{courses.schedule}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="form-label">Họ và Tên (*)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ví dụ: Trần Thị Thu Thảo" 
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
                  placeholder="Ví dụ: 0912 987 654" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Email (Nhận đường link Zoom & Tài liệu PDF)</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Ví dụ: minhtrader@gmail.com" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Mức Kinh Nghiệm Trading Giao Dịch</label>
                <select 
                  className="form-input"
                  value={formData.capital}
                  onChange={e => setFormData({ ...formData, capital: e.target.value })}
                >
                  <option value="Mới bắt đầu">Mới bắt đầu tìm hiểu (Chưa biết gì)</option>
                  <option value="Dưới 1 năm">Dưới 1 năm (Đã giao dịch demo/real)</option>
                  <option value="Trên 1 năm">Trên 1 năm (Đang muốn tối ưu hệ thống SMC)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn-gold" 
                disabled={isSubmitting}
                style={{ width: '100%', padding: '18px', fontSize: '1.15rem', borderRadius: '12px', marginTop: '10px' }}
              >
                {isSubmitting ? 'ĐANG ĐĂNG KÝ HỌC...' : 'XÁC NHẬN ĐĂNG KÝ KHOÁ HỌC MIỄN PHÍ'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.8rem' }}>CÂU HỎI THƯỜNG GẶP (FAQ)</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="glass-card" style={{ padding: '20px 24px' }}>
                  <div 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, fontSize: '1rem' }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--gold-primary)" /> : <ChevronDown size={18} color="var(--gold-primary)" />}
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
