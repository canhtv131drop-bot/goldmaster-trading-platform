import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, TrendingUp, BookOpen, Percent, PhoneCall, ArrowUpRight, BarChart2, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const { leads, totalLeadsCount, newLeadsCount, winRatePercent, setAdminTab, updateLeadStatus } = useApp();

  const signalLeadsCount = leads.filter(l => l.source.includes('Signal')).length;
  const courseLeadsCount = leads.filter(l => l.source.includes('Course')).length;
  const conversionRate = totalLeadsCount > 0 ? (((totalLeadsCount - newLeadsCount) / totalLeadsCount) * 100).toFixed(1) : 68.4;

  const recentUncontactedLeads = leads.filter(l => l.status === 'Mới').slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>DASHBOARD QUẢN TRỊ TỔNG QUAN</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Theo dõi hiệu quả chạy quảng cáo phễu Tín hiệu & Khoá học Trading XAUUSD</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid-4" style={{ marginBottom: '30px' }}>
        
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TỔNG SỐ LEADS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 192, 66, 0.15)', color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalLeadsCount}</div>
          <div style={{ fontSize: '0.78rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <ArrowUpRight size={14} /> +24% so với tuần trước
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>LEADS MỚI CẦN GỌI</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneCall size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171' }}>{newLeadsCount}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Cần Sale liên hệ ngay</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TỶ LỆ CHUYỂN ĐỔI</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--green-win)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Percent size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green-win)' }}>{conversionRate}%</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Đã gọi & tư vấn thành công</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>WINRATE TÍN HIỆU</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa' }}>{winRatePercent}%</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Tự động hiển thị trên Landing</div>
        </div>

      </div>

      {/* CHARTS BREAKDOWN & TRAFFIC SOURCES */}
      <div className="grid-2" style={{ gap: '24px', marginBottom: '30px' }}>
        
        {/* FUNNEL SOURCE BREAKDOWN */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={18} color="var(--gold-primary)" /> Phân Phối Lead Theo Phễu
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                <span>Phễu Tín Hiệu (Signal Funnel)</span>
                <span style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>{signalLeadsCount} Leads</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(signalLeadsCount / (totalLeadsCount || 1)) * 100}%`, height: '100%', background: 'var(--gold-gradient)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                <span>Phễu Khoá Học (Course Funnel)</span>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>{courseLeadsCount} Leads</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(courseLeadsCount / (totalLeadsCount || 1)) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #0284c7)' }}></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div>● Facebook Ads: 55%</div>
            <div>● TikTok Ads: 30%</div>
            <div>● Google/Organic: 15%</div>
          </div>
        </div>

        {/* RECENT UNCONTACTED LEADS TABLE */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#f87171' }}>🔥 Leads Mới Cần Xử Lý</h3>
            <button onClick={() => setAdminTab('leads')} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
              Xem Tất Cả
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentUncontactedLeads.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                Không có lead mới chưa xử lý!
              </div>
            ) : (
              recentUncontactedLeads.map(lead => (
                <div key={lead.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.phone} • <span style={{ color: 'var(--gold-primary)' }}>{lead.source}</span></div>
                  </div>

                  <button 
                    onClick={() => updateLeadStatus(lead.id, 'Đã liên hệ', lead.notes)}
                    className="btn-gold" 
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    Đã Gọi
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
