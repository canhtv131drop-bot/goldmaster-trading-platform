import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Zap, Download, Play, FileText, CheckCircle, Video } from 'lucide-react';

export default function MemberAreaView() {
  const { signals, courses, cms } = useApp();
  const [activeTab, setActiveTab] = useState('signals');
  const zaloUrl = cms.zaloGroupUrl || 'https://zalo.me/g/hyoiwdpqc5auq9vbainr';

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* HEADER TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(245, 192, 66, 0.15)', color: 'var(--gold-bright)', border: '1px solid var(--border-gold)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '12px' }}>
            <CheckCircle size={16} /> KHU VỰC THÀNH VIÊN CHÍNH THỨC
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '8px' }}>
            KÊNH TÍN HIỆU & KHO TÀI LIỆU <span className="text-gold-gradient">CRAZII</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
            Chào mừng bạn đến với khu vực Học viên & Nhận tín hiệu Vàng XAUUSD hàng ngày từ Mr Harry
          </p>
        </div>

        {/* TABS SELECTOR */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('signals')}
            className={activeTab === 'signals' ? 'btn-gold' : 'btn-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <Zap size={16} /> Tín Hiệu Realtime
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={activeTab === 'lessons' ? 'btn-gold' : 'btn-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <BookOpen size={16} /> Kho Bài Giảng & Indicator Crazii
          </button>
        </div>

        {/* TAB 1: REALTIME SIGNALS */}
        {activeTab === 'signals' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>TÍN HIỆU GIAO DỊCH MỚI NHẤT HÔM NAY</h3>
              <a href={zaloUrl} target="_blank" rel="noreferrer" className="btn-outline-gold" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                Vào Nhóm Zalo Báo Chuông Chuẩn
              </a>
            </div>

            <div className="grid-2">
              {signals.map(sig => (
                <div key={sig.id} className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--gold-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold-bright)' }}>{sig.pair} • {sig.type}</div>
                    <span className={sig.result === 'WIN' ? 'badge-win' : 'badge-loss'}>
                      {sig.result} ({sig.pips})
                    </span>
                  </div>

                  <div className="grid-3" style={{ background: 'rgba(5,7,10,0.5)', padding: '12px', borderRadius: '10px', marginBottom: '12px', textAlign: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ENTRY</div>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{sig.entry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STOP LOSS</div>
                      <div style={{ fontWeight: 700, color: '#f87171' }}>{sig.sl}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TAKE PROFIT</div>
                      <div style={{ fontWeight: 700, color: '#34d399' }}>{sig.tp1}</div>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px' }}>
                    <strong>Phân tích:</strong> {sig.note}
                  </p>

                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Đã phát lúc: {sig.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LESSONS & EBOOKS REPOSITORY */}
        {activeTab === 'lessons' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>KHO BÀI GIẢNG & TÀI LIỆU TRADING CRAZII</h3>
            </div>

            <div className="grid-2">
              <div>
                <h4 style={{ marginBottom: '14px', color: 'var(--gold-primary)' }}>1. Lộ trình video bài giảng Zoom</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {courses.modules.map(mod => (
                    <div key={mod.id} className="glass-card" style={{ padding: '16px', cursor: 'pointer' }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>{mod.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{mod.description}</div>
                      <button className="btn-secondary" style={{ marginTop: '10px', fontSize: '0.8rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Play size={14} color="var(--gold-primary)" /> Xem Video Bài Giảng
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '14px', color: 'var(--gold-primary)' }}>2. Tải về Ebook & Chỉ báo Indicator Crazii</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Indicator_GoldMaster_Crazii_v3.ex4', size: '2.4 MB', type: 'MT4 Indicator' },
                    { name: 'Ebook_Cấu_Trúc_Dòng_Tiền_Mập_XAUUSD_Crazii.pdf', size: '14.8 MB', type: 'PDF Ebook' },
                    { name: 'File_Excel_Tinh_Lot_Va_Quan_Ly_Von_Crazii.xlsx', size: '1.1 MB', type: 'Excel Spreadsheet' }
                  ].map((file, i) => (
                    <div key={i} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText size={22} color="var(--gold-primary)" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{file.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{file.type} • {file.size}</div>
                        </div>
                      </div>
                      <button className="btn-outline-gold" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Download size={14} /> Tải về
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
