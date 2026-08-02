import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. CRM Leads Storage
  const [leads, setLeads] = useState([]);

  // 2. Signals Storage
  const [signals, setSignals] = useState([]);

  // 3. CMS & Telegram Settings
  const [cms, setCmsState] = useState({
    zaloGroupUrl: 'https://zalo.me/g/hyoiwdpqc5auq9vbainr',
    telegramGroupUrl: 'https://t.me/EasyGold_Signals_VIP',
    supportHotline: '0353.753.863',
    availableSlots: 14,
    countdownHours: 5,
    countdownMinutes: 24,
    bannerNotice: '🔥 NHẬN 5-10 TÍN HIỆU XAUUSD MỖI NGÀY TẠI NHÓM ZALO VIP - CHỈ CÒN 14 SLOT!',
    telegramBotToken: '',
    telegramChatId: ''
  });

  // Fetch initial data from Express API
  useEffect(() => {
    // Fetch Leads
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLeads(data);
      })
      .catch(err => console.error('Failed to fetch leads from API:', err));

    // Fetch Signals
    fetch('/api/signals')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSignals(data);
      })
      .catch(err => console.error('Failed to fetch signals from API:', err));

    // Fetch CMS Settings
    fetch('/api/cms')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setCmsState(prev => ({ ...prev, ...data }));
        }
      })
      .catch(err => console.error('Failed to fetch cms settings from API:', err));
  }, []);

  // Update CMS
  const setCms = (newCmsOrFn) => {
    const updated = typeof newCmsOrFn === 'function' ? newCmsOrFn(cms) : newCmsOrFn;
    setCmsState(updated);
    fetch('/api/cms', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(err => console.error('Failed to update CMS via API:', err));
  };

  // 4. Testimonials
  const [testimonials] = useState([
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

  // Dynamic Admin Password State
  const [adminPassword, setAdminPasswordState] = useState('Canhdepzai1999@');

  const updateAdminPassword = async (newPassword) => {
    try {
      const res = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });
      if (res.ok) {
        setAdminPasswordState(newPassword);
        return true;
      }
    } catch (err) {
      console.error('Failed to update admin password via API:', err);
    }
    return false;
  };

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('easygold_admin_auth') === 'true';
  });

  const loginAdmin = async (inputPassword) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('easygold_admin_auth', 'true');
        return true;
      }
    } catch (err) {
      console.error('Failed admin login via API:', err);
      // Local fallback
      if (inputPassword === adminPassword) {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('easygold_admin_auth', 'true');
        return true;
      }
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
    }).catch(err => console.error('Telegram Push Error:', err));
  };

  // API Call to add Lead
  const addLead = async (newLeadData) => {
    // Track Meta Pixel Lead Conversion
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          content_name: newLeadData.source || 'GoldMaster Lead',
          status: 'Submitted'
        });
      } catch (e) {
        console.error('FB Pixel Lead event error:', e);
      }
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadData)
      });
      if (res.ok) {
        const created = await res.json();
        setLeads(prev => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('Failed to add lead via API:', err);
    }
    // Fallback if server unreachable
    const fallbackEntry = {
      id: Date.now(),
      ...newLeadData,
      date: new Date().toLocaleString('vi-VN'),
      status: 'Mới'
    };
    setLeads(prev => [fallbackEntry, ...prev]);
    sendTelegramNotification(fallbackEntry);
    return fallbackEntry;
  };

  // API Call to update Lead status
  const updateLeadStatus = async (id, newStatus, notes = '') => {
    setLeads(prev => prev.map(item => item.id === id ? { ...item, status: newStatus, notes: notes || item.notes } : item));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes })
      });
    } catch (err) {
      console.error('Failed to update lead status via API:', err);
    }
  };

  // API Call to delete Lead
  const deleteLead = async (id) => {
    setLeads(prev => prev.filter(item => item.id !== id));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete lead via API:', err);
    }
  };

  // API Call to add Signal
  const addSignal = async (sig) => {
    try {
      const res = await fetch('/api/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sig)
      });
      if (res.ok) {
        const created = await res.json();
        setSignals(prev => [created, ...prev]);
        return;
      }
    } catch (err) {
      console.error('Failed to add signal via API:', err);
    }
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
