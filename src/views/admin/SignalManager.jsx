import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Plus, Send, CheckCircle2, XCircle, Clock, AlertTriangle, RefreshCw } from 'lucide-react';

export default function SignalManager() {
  const { signals, addSignal, updateSignalResult, winRatePercent, settings } = useApp();

  const [form, setForm] = useState({
    type: 'BUY LIMIT',
    entry: '2415.00',
    tp1: '2422.00',
    tp2: '2430.00',
    sl: '2409.00',
    note: 'Cấu trúc Demand H1 + Phân kỳ RSI',
    chartUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'
  });

  const [showForm, setShowForm] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    addSignal(form);
    setShowForm(false);
    alert('Đã đăng tín hiệu mới thành công!');
  };

  const handlePushTelegram = (sig) => {
    alert(`[TELEGRAM BOT SUCCESS]\nĐã tự động đẩy lệnh #${sig.id} (${sig.type} XAUUSD @ ${sig.entry}) sang Telegram VIP Channel!`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>QUẢN LÝ TÍN HIỆU HÀNG NGÀY</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Winrate hiện tại: <strong style={{ color: 'var(--green-win)' }}>{winRatePercent}%</strong> (Tự động tính toán & đồng bộ Landing Page)
          </p>
        </div>

        <button onClick={() => setShowForm(!showForm)} className="btn-gold">
          <Plus size={18} /> {showForm ? 'Đóng Form' : 'Tạo Tín Hiệu Mới'}
        </button>
      </div>

      {/* CREATE SIGNAL FORM */}
      {showForm && (
        <div className="glass-card gold-glow" style={{ padding: '24px', marginBottom: '30px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--gold-primary)' }}>ĐĂNG TÍN HIỆU XAUUSD MỚI</h3>
          
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="grid-3">
              <div>
                <label className="form-label">Loại Lệnh</label>
                <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="BUY MARKET">BUY MARKET (Mua Ngay)</option>
                  <option value="BUY LIMIT">BUY LIMIT (Mua Chờ)</option>
                  <option value="SELL MARKET">SELL MARKET (Bán Ngay)</option>
                  <option value="SELL LIMIT">SELL LIMIT (Bán Chờ)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Giá Entry (Điểm vào)</label>
                <input type="text" className="form-input" value={form.entry} onChange={e => setForm({ ...form, entry: e.target.value })} required />
              </div>

              <div>
                <label className="form-label">Giá Stop Loss (Dừng lỗ)</label>
                <input type="text" className="form-input" value={form.sl} onChange={e => setForm({ ...form, sl: e.target.value })} required />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label className="form-label">Take Profit 1 (Chốt lời 1)</label>
                <input type="text" className="form-input" value={form.tp1} onChange={e => setForm({ ...form, tp1: e.target.value })} required />
              </div>

              <div>
                <label className="form-label">Take Profit 2 (Chốt lời 2)</label>
                <input type="text" className="form-input" value={form.tp2} onChange={e => setForm({ ...form, tp2: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="form-label">Ghi Chú Phân Tích Kỹ Thuật (SMC / Supply Demand)</label>
              <input type="text" className="form-input" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Hủy</button>
              <button type="submit" className="btn-gold">Phát Tín Hiệu Ngay</button>
            </div>
          </form>
        </div>
      )}

      {/* SIGNALS LEDGER TABLE */}
      <div className="glass-card" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--gold-primary)', fontSize: '0.82rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px' }}>Mã Lệnh</th>
              <th style={{ padding: '12px' }}>Loại Lệnh</th>
              <th style={{ padding: '12px' }}>Entry</th>
              <th style={{ padding: '12px' }}>TP / SL</th>
              <th style={{ padding: '12px' }}>Kết Quả Pips</th>
              <th style={{ padding: '12px' }}>Trạng Thái</th>
              <th style={{ padding: '12px' }}>Cập Nhật Kết Quả</th>
              <th style={{ padding: '12px' }}>Bot Action</th>
            </tr>
          </thead>
          <tbody>
            {signals.map(sig => (
              <tr key={sig.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.88rem' }}>
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
                <td style={{ padding: '14px 12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
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
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      onClick={() => updateSignalResult(sig.id, 'WIN', '+140 Pips')} 
                      className="btn-secondary" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--green-win)' }}
                    >
                      WIN
                    </button>
                    <button 
                      onClick={() => updateSignalResult(sig.id, 'LOSS', '-50 Pips')} 
                      className="btn-secondary" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--red-loss)' }}
                    >
                      LOSS
                    </button>
                  </div>
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <button 
                    onClick={() => handlePushTelegram(sig)}
                    className="btn-outline-gold" 
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    <Send size={12} /> Push Telegram
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
