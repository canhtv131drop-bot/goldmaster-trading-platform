import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function NotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('Vừa xong');

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, time })
      });
      if (res.ok) {
        setMessage('Đã thêm thông báo mới thành công!');
        setTitle('');
        setContent('');
        setTime('Vừa xong');
        fetchNotifications();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error adding notification:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) return;
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotifications(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div style={{ padding: '24px', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f5c042', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell style={{ color: '#3b82f6' }} /> Quản Lý Notification Toast (Social Proof)
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
            Cấu hình danh sách thông báo nảy góc màn hình trên Landing Page (Tiêu đề, Nội dung, Thời gian).
          </p>
        </div>
      </div>

      {message && (
        <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Form Thêm Mới */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} style={{ color: '#f5c042' }} /> Thêm Thông Báo Mới
          </h2>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                Nội dung cột [Title] (vd: Tên khách / Nguồn)
              </label>
              <input
                type="text"
                placeholder="vd: Anh Nguyễn Văn Hùng (0988***456)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                Nội dung cột [Content] (Chi tiết hành động)
              </label>
              <input
                type="text"
                placeholder="vd: Vừa đăng ký tham gia Nhóm Zalo VIP Tín Hiệu Gold"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                Nội dung cột [Time] (Thời gian hiển thị)
              </label>
              <input
                type="text"
                placeholder="vd: 2 phút trước / Vừa xong"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: '12px', background: 'linear-gradient(135deg, #f5c042, #e5a823)', color: '#0f172a', fontWeight: 800, border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '6px' }}
            >
              <Plus size={18} /> Thêm Vào Danh Sách
            </button>
          </form>
        </div>

        {/* Danh Sách Thông Báo Hiện Tại */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Danh Sách Popup Đang Chạy ({notifications.length})
          </h2>

          {loading ? (
            <p style={{ color: '#94a3b8' }}>Đang tải danh sách...</p>
          ) : notifications.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Chưa có thông báo nào.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.map((item) => (
                <div
                  key={item.id}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0f172a', padding: '14px 16px', borderRadius: '12px', border: '1px solid #334155' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Ring Pulse Preview */}
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <div style={{ width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%' }}></div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.92rem' }}>{item.title}</div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.84rem' }}>{item.content}</div>
                      <div style={{ color: '#64748b', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Clock size={12} /> {item.time}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                    title="Xóa thông báo này"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
