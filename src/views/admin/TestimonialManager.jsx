import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Plus, Star, Check, X, Trash2 } from 'lucide-react';

export default function TestimonialManager() {
  const { testimonials, setTestimonials } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    name: '', role: 'Học viên SMC', profit: '+100%', comment: '', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  });

  const handleToggleFeatured = (id) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, featured: !t.featured } : t));
  };

  const handleDelete = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setTestimonials(prev => [...prev, { ...newFeedback, id: Date.now(), featured: true }]);
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>QUẢN LÝ FEEDBACK & TESTIMONIAL</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Quản lý các đánh giá học viên hiển thị trên các phễu Landing Page</p>
        </div>

        <button onClick={() => setShowAdd(!showAdd)} className="btn-gold">
          <Plus size={18} /> Thêm Feedback Mới
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="glass-card gold-glow" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-primary)', marginBottom: '16px' }}>THÊM FEEDBACK HỌC VIÊN</h3>
          <div className="grid-3" style={{ marginBottom: '16px' }}>
            <input type="text" className="form-input" placeholder="Họ tên học viên" value={newFeedback.name} onChange={e => setNewFeedback({ ...newFeedback, name: e.target.value })} required />
            <input type="text" className="form-input" placeholder="Vai trò / Kinh nghiệm" value={newFeedback.role} onChange={e => setNewFeedback({ ...newFeedback, role: e.target.value })} required />
            <input type="text" className="form-input" placeholder="Tỷ lệ lợi nhuận (+120%)" value={newFeedback.profit} onChange={e => setNewFeedback({ ...newFeedback, profit: e.target.value })} required />
          </div>
          <textarea className="form-input" rows="3" placeholder="Nội dung đánh giá thực tế..." value={newFeedback.comment} onChange={e => setNewFeedback({ ...newFeedback, comment: e.target.value })} required style={{ marginBottom: '16px' }}></textarea>
          <button type="submit" className="btn-gold">Lưu Feedback</button>
        </form>
      )}

      <div className="grid-3">
        {testimonials.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 700 }}>FEEDBACK #{item.id}</span>
                
                <button 
                  onClick={() => handleToggleFeatured(item.id)}
                  style={{
                    background: item.featured ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.08)',
                    color: item.featured ? '#34d399' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  {item.featured ? '✓ Đang Hiện' : 'Ẩn'}
                </button>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', fontStyle: 'italic', marginBottom: '16px' }}>"{item.comment}"</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.role}</div>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
