import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Monitor, Save, CheckCircle2, Send } from 'lucide-react';

export default function CmsManager() {
  const { cms, setCms, sendTelegramNotification } = useApp();
  const [cmsState, setCmsState] = useState(cms);
  const [saved, setSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setCms(cmsState);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestTelegram = () => {
    sendTelegramNotification({
      name: 'TEST LEAD THỬ NGHIỆM',
      phone: '0988 888 888',
      email: 'testlead@gmail.com',
      capital: '$5,000 - $10,000',
      source: 'Telegram Push Test',
      notes: 'Thử nghiệm bắn thông báo tự động từ EasyGold Website vào Nhóm Telegram!'
    });
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>QUẢN LÝ CMS NỘI DUNG & TELEGRAM BOT</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chỉnh sửa đường link nhóm Zalo/Telegram & Cấu hình bắn Lead về nhóm Telegram tự động</p>
        </div>

        {saved && (
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '8px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700 }}>
            ✓ Đã cập nhật Cấu hình CMS!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* TELEGRAM BOT REALTIME LEAD PUSH CONFIGURATION */}
        <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '20px', borderRadius: '14px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Send size={18} /> CẤU HÌNH BẮN THÔNG BÁO KHÁCH ĐĂNG KÝ VỀ NHÓM TELEGRAM
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Khi khách hàng bấm Đăng ký trên web, thông tin sẽ ngay lập tức được Telegram Bot gửi tới Nhóm / Kênh Telegram của bạn!
          </p>

          <div className="grid-2" style={{ marginBottom: '14px' }}>
            <div>
              <label className="form-label">Telegram Bot Token (Ví dụ: 123456789:ABCdefGhIJK...)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Nhập Bot Token từ @BotFather"
                value={cmsState.telegramBotToken || ''}
                onChange={e => setCmsState({ ...cmsState, telegramBotToken: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Telegram Chat ID Nhóm / Kênh (Ví dụ: -100123456789)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Nhập Chat ID của Nhóm/Kênh nhận tin"
                value={cmsState.telegramChatId || ''}
                onChange={e => setCmsState({ ...cmsState, telegramChatId: e.target.value })}
              />
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleTestTelegram} 
            className="btn-outline-gold" 
            style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#38bdf8', borderColor: '#38bdf8' }}
          >
            <Send size={14} /> Send Lead Thử Nghiệm Qua Telegram
          </button>

          {testSent && (
            <span style={{ marginLeft: '12px', color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>
              ✓ Đã gửi thông báo thử nghiệm! Kiểm tra nhóm Telegram của bạn.
            </span>
          )}
        </div>

        <div>
          <label className="form-label">Thông Báo Banner Chạy Trên Cùng (Top Banner Notice)</label>
          <input 
            type="text" 
            className="form-input" 
            value={cmsState.bannerNotice}
            onChange={e => setCmsState({ ...cmsState, bannerNotice: e.target.value })}
          />
        </div>

        <div className="grid-3">
          <div>
            <label className="form-label">Số Slot Còn Lại (Khan Hiếm)</label>
            <input 
              type="number" 
              className="form-input" 
              value={cmsState.availableSlots}
              onChange={e => setCmsState({ ...cmsState, availableSlots: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div>
            <label className="form-label">Đếm Ngược - Số Giờ (Hours)</label>
            <input 
              type="number" 
              className="form-input" 
              value={cmsState.countdownHours}
              onChange={e => setCmsState({ ...cmsState, countdownHours: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div>
            <label className="form-label">Đếm Ngược - Số Phút (Minutes)</label>
            <input 
              type="number" 
              className="form-input" 
              value={cmsState.countdownMinutes}
              onChange={e => setCmsState({ ...cmsState, countdownMinutes: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label className="form-label">Đường Link Tham Gia Nhóm Telegram VIP</label>
            <input 
              type="url" 
              className="form-input" 
              value={cmsState.telegramGroupUrl}
              onChange={e => setCmsState({ ...cmsState, telegramGroupUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Đường Link Tham Gia Nhóm Zalo VIP chính thức</label>
            <input 
              type="url" 
              className="form-input" 
              value={cmsState.zaloGroupUrl}
              onChange={e => setCmsState({ ...cmsState, zaloGroupUrl: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="form-label">Số Hotline Hỗ Trợ Hiển Thị Footer</label>
          <input 
            type="text" 
            className="form-input" 
            value={cmsState.supportHotline}
            onChange={e => setCmsState({ ...cmsState, supportHotline: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
          <Save size={18} /> Lưu Cấu Hình CMS & Telegram
        </button>

      </form>
    </div>
  );
}
