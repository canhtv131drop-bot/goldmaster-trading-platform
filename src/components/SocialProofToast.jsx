import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DEFAULT_NOTIFS = [
  { id: 1, title: 'Anh Nguyễn Văn Hùng (0988***456)', content: 'Vừa đăng ký tham gia Nhóm Zalo VIP Tín Hiệu Gold', time: '2 phút trước' },
  { id: 2, title: 'Chị Trần Thị Mai (0912***678)', content: 'Vừa chốt lời +95 Pips lệnh BUY XAUUSD', time: '5 phút trước' },
  { id: 3, title: 'Anh Lê Hoàng Nam (0903***889)', content: 'Vừa tham gia Khóa Học Trading SMC Crazii', time: '8 phút trước' },
  { id: 4, title: 'Hệ Thống EasyGold VIP', content: 'Vừa bắn tín hiệu SELL NOW XAUUSD @ 2658.00', time: '12 phút trước' }
];

export default function SocialProofToast() {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
        }
      })
      .catch((err) => console.log('Using default notifications:', err));
  }, []);

  useEffect(() => {
    if (isDismissed || notifications.length === 0) return;

    // Show initial toast after 2 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Loop interval: show toast, then transition to next
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 800);
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [notifications, isDismissed]);

  if (isDismissed || notifications.length === 0) return null;

  const current = notifications[currentIndex] || notifications[0];

  return (
    <div
      className={`social-proof-toast-wrapper ${isVisible ? 'toast-show' : 'toast-hide'}`}
      role="status"
      aria-live="polite"
    >
      <div className="social-proof-toast-card">
        {/* Blue Radio / Pulse Ring Icon */}
        <div className="toast-icon-ring">
          <div className="toast-icon-inner-dot"></div>
        </div>

        {/* Content Section (Title, Content, Time) */}
        <div className="toast-text-body">
          <div className="toast-title">{current.title}</div>
          <div className="toast-content">{current.content}</div>
          <div className="toast-time">{current.time}</div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="toast-close-btn"
          title="Tắt thông báo"
          aria-label="Tắt thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
