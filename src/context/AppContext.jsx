import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. CRM Leads Storage
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('easygold_leads');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Nguyễn Văn Hùng', phone: '0988123456', capital: '$1,000 - $5,000', source: 'EasyGold Zalo VIP Funnel', status: 'Mới', date: '2026-08-01 14:30', notes: 'Zalo VIP direct join' },
      { id: 2, name: 'Trần Thị Mai', phone: '0912345678', capital: 'Trên $10,000', source: 'EasyGold Zalo VIP Funnel', status: 'Đã liên hệ', date: '2026-08-01 12:15', notes: 'Đã duyệt vào nhóm Zalo VIP' }
    ];
  });

  // Save Leads to LocalStorage
  useEffect(() => {
    localStorage.setItem('easygold_leads', JSON.stringify(leads));
  }, [leads]);

  // 2. Signals Storage
  const [signals, setSignals] = useState([
    { id: 'XAU-1089', pair: 'XAUUSD', type: 'BUY LIMIT', entry: '2642.50', sl: '2636.00', tp1: '2652.00', tp2: '2660.00', pips: '+95 Pips', result: 'WIN', date: 'Hôm nay 15:40', note: 'Quét nến thanh khoản phiên Âu (Liquidity Sweep)' },
    { id: 'XAU-1088', pair: 'XAUUSD', type: 'SELL NOW', entry: '2658.00', sl: '2664.00', tp1: '2648.00', tp2: '2640.00', pips: '+100 Pips', result: 'WIN', date: 'Hôm nay 09:20', note: 'Phản ứng vùng Cung h1 (Supply Zone)' },
    { id: 'XAU-1087', pair: 'XAUUSD', type: 'BUY NOW', entry: '2635.00', sl: '2629.00', tp1: '2645.00', tp2: '2655.00', pips: '+100 Pips', result: 'WIN', date: 'Hôm qua 20:15', note: 'Chạm sóng hỗ trợ nến mạ vàng D1' }
  ]);

  // 3. CMS & Telegram Settings
  const [cms, setCms] = useState(() => {
    const saved = localStorage.getItem('easygold_cms');
    return saved ? JSON.parse(saved) : {
      zaloGroupUrl: 'https://zalo.me/g/hyoiwdpqc5auq9vbainr',
      telegramGroupUrl: 'https://t.me/EasyGold_Signals_VIP',
      supportHotline: '0353.753.863',
      availableSlots: 14,
      countdownHours: 5,
      countdownMinutes: 24,
      bannerNotice: '🔥 NHẬN 5-10 TÍN HIỆU XAUUSD MỖI NGÀY TẠI NHÓM ZALO VIP - CHỈ CÒN 14 SLOT!',
      telegramBotToken: '',
      telegramChatId: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('easygold_cms', JSON.stringify(cms));
  }, [cms]);

  // 4. Testimonials
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Anh Đức Minh', role: 'Trader 2 năm', profit: '+1,450$ / tháng', comment: 'Từ khi vào nhóm Zalo VIP EasyGold, mình không còn đi lệnh bậy bạ nữa. Bắn lệnh nào chắc lệnh đó, tỷ lệ win cực cao!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Chị Hoàng Yến', role: 'Kinh doanh tự do', profit: '+2,800$ / tháng', comment: 'Đội ngũ hỗ trợ Zalo tận tình, báo điểm Entry, SL, TP rất rõ ràng. Cứ đúng lệnh vào nhóm Zalo báo là chốt lời thôi.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Bác Tuấn Hùng', role: 'Nghỉ hưu', profit: '+980$ / tháng', comment: 'Nhóm Zalo hoạt động văn minh, Admin Mr Harry phân tích nến rất có tâm. Vốn nhỏ vẫn tăng trưởng bền vững.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
  ]);

  // 5. Course Syllabus
  const [courses] = useState({
    instructorName: 'MR HARRY',
    instructorBio: 'Nhà giao dịch chuyên nghiệp 6 năm kinh nghiệm Forex & chuyên sâu XAUUSD. Trưởng ban quản trị Nhóm Tín Hiệu Zalo VIP EasyGold.',
    modules: [
      { 
        id: 1, 
        title: 'Buổi 1: Tại sao nghề Trading lại là xu hướng của tương lai', 
        description: 'Tổng quan tầm nhìn tự do tài chính, tư duy giao dịch đúng đắn & tiềm năng vô hạn của thị trường Forex - Gold', 
        lessons: [
          'Tự do thời gian & địa điểm giao dịch', 
          'Tư duy đúng đắn của 5% trader thành công', 
          'Cách vượt qua tâm lý sợ hãi & tham lam'
        ] 
      },
      { 
        id: 2, 
        title: 'Buổi 2: Bản chất của thị trường - Kiến thức cơ bản công cụ Crazii', 
        description: 'Hiểu rõ quy luật di chuyển dòng tiền cá mập & sử dụng công cụ hỗ trợ giao dịch Crazii hiệu quả', 
        lessons: [
          'Cấu trúc nến & vùng thanh khoản cá mập', 
          'Giới thiệu & cài đặt công cụ Crazii', 
          'Đọc chỉ báo phân tích dòng tiền chuyên sâu'
        ] 
      },
      { 
        id: 3, 
        title: 'Buổi 3: Phương pháp giao dịch an toàn cùng Crazii', 
        description: 'Hệ thống vào lệnh kỷ luật, quản lý vốn sát thủ R:R 1:3 & kỹ thuật chốt lời tối ưu cùng Crazii', 
        lessons: [
          'Điểm vào lệnh chuẩn xác Entry & SL', 
          'Quy tắc quản lý vốn 1-2% / lệnh', 
          'Chiến thuật chốt lời từng phần & dời SL huề vốn'
        ] 
      }
    ]
  });

  // App Navigation Route & Admin Tab State
  const [currentRoute, setCurrentRoute] = useState('home');
  const [adminTab, setAdminTab] = useState('dashboard');

  // Dynamic Admin Password State (Default: Canhdepzai1999@)
  const [adminPassword, setAdminPasswordState] = useState(() => {
    return localStorage.getItem('easygold_admin_password') || 'Canhdepzai1999@';
  });

  const updateAdminPassword = (newPassword) => {
    setAdminPasswordState(newPassword);
    localStorage.setItem('easygold_admin_password', newPassword);
  };

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('easygold_admin_auth') === 'true';
  });

  const loginAdmin = (inputPassword) => {
    if (inputPassword === adminPassword) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('easygold_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('easygold_admin_auth');
  };

  // Check URL query string for secret ?admin=true trigger
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setCurrentRoute('admin');
      setAdminTab('dashboard');
    }
  }, []);

  // Send Lead Notification to Telegram Bot
  const sendTelegramNotification = (leadData) => {
    if (!cms.telegramBotToken || !cms.telegramChatId) return;

    const message = `🔥 *KHÁCH HÀNG MỚI ĐĂNG KÝ EASYGOLD* 🔥\n\n` +
      `👤 *Họ tên:* ${leadData.name}\n` +
      `📞 *SĐT/Zalo:* ${leadData.phone}\n` +
      `📧 *Email:* ${leadData.email || 'Chưa cung cấp'}\n` +
      `💰 *Mức vốn:* ${leadData.capital || 'Chưa chọn'}\n` +
      `📍 *Nguồn:* ${leadData.source || 'EasyGold Funnel'}\n` +
      `⏰ *Thời gian:* ${new Date().toLocaleString('vi-VN')}\n` +
      `📌 *Ghi chú:* ${leadData.notes || 'Đăng ký nhận tín hiệu & Khoá học Crazii'}`;

    const url = `https://api.telegram.org/bot${cms.telegramBotToken.trim()}/sendMessage`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: cms.telegramChatId.trim(),
        text: message,
        parse_mode: 'Markdown'
      })
    }).then(res => res.json()).then(data => {
      console.log('Telegram Push Result:', data);
    }).catch(err => {
      console.error('Telegram Push Error:', err);
    });
  };

  const addLead = (newLeadData) => {
    const newEntry = {
      id: Date.now(),
      ...newLeadData,
      date: new Date().toLocaleString('vi-VN'),
      status: 'Mới'
    };
    setLeads(prev => [newEntry, ...prev]);

    // Send Realtime Telegram Notification
    sendTelegramNotification(newEntry);
  };

  const updateLeadStatus = (id, newStatus, notes = '') => {
    setLeads(prev => prev.map(item => item.id === id ? { ...item, status: newStatus, notes: notes || item.notes } : item));
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(item => item.id !== id));
  };

  const addSignal = (sig) => {
    setSignals(prev => [sig, ...prev]);
  };

  const newLeadsCount = leads.filter(l => l.status === 'Mới').length;

  return (
    <AppContext.Provider value={{
      leads,
      addLead,
      updateLeadStatus,
      deleteLead,
      signals,
      addSignal,
      cms,
      setCms,
      testimonials,
      courses,
      currentRoute,
      setCurrentRoute,
      adminTab,
      setAdminTab,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      adminPassword,
      updateAdminPassword,
      newLeadsCount,
      sendTelegramNotification,
      winRatePercent: 95
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
