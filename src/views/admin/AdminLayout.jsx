import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Users, Monitor, Settings, ArrowLeft, ShieldAlert, Lock, Key, LogOut } from 'lucide-react';
import EasyGoldLogo from '../../components/EasyGoldLogo';

export default function AdminLayout({ children }) {
  const { adminTab, setAdminTab, setCurrentRoute, newLeadsCount, isAdminAuthenticated, loginAdmin, logoutAdmin } = useApp();
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Tổng Quan', icon: LayoutDashboard },
    { id: 'leads', label: 'Quản Lý Leads (CRM)', icon: Users, badgeCount: newLeadsCount },
    { id: 'cms', label: 'CMS Nội Dung Landing Page', icon: Monitor },
    { id: 'settings', label: 'Cài Đặt Hệ Thống & Pixel', icon: Settings }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setErrorMsg('❌ Mật khẩu truy cập không chính xác. Vui lòng thử lại!');
    } else {
      setErrorMsg('');
    }
  };

  // IF NOT AUTHENTICATED -> RENDER HIGH-SECURITY PASSWORD LOCK SCREEN
  if (!isAdminAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#05070a',
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(245, 192, 66, 0.15) 0%, transparent 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="glass-card gold-glow" style={{ maxWidth: '440px', width: '100%', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <EasyGoldLogo size="medium" />
          </div>

          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(245, 192, 66, 0.2)',
            color: 'var(--gold-bright)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            border: '1px solid var(--border-gold)'
          }}>
            <Lock size={28} />
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>BẢO MẬT HỆ THỐNG QUẢN TRỊ</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Khu vực chỉ dành cho Ban Quản trị EasyGold. Vui lòng nhập mật khẩu xác thực để tiếp tục.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Nhập Mật Khẩu Quản Trị..." 
                  value={passwordInput}
                  onChange={e => {
                    setPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  autoFocus
                  required
                  style={{ paddingLeft: '44px', fontSize: '1.05rem', letterSpacing: '2px' }}
                />
                <Key size={18} color="var(--gold-bright)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              {errorMsg && (
                <div style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '8px', fontWeight: 700 }}>
                  {errorMsg}
                </div>
              )}
            </div>

            <button type="submit" className="btn-gold" style={{ padding: '14px', fontSize: '1rem', borderRadius: '12px' }}>
              <Lock size={18} />
              <span>XÁC NHẬN ĐĂNG NHẬP</span>
            </button>

            <button 
              type="button"
              onClick={() => setCurrentRoute('home')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginTop: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} /> Quay lại Trang Chủ Website
            </button>
          </form>

        </div>
      </div>
    );
  }

  // IF AUTHENTICATED -> RENDER FULL ADMIN DASHBOARD LAYOUT
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#07090e' }}>
      
      {/* ADMIN SIDEBAR */}
      <aside style={{
        width: '270px',
        background: '#0d111a',
        borderRight: '1px solid var(--border-color)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          {/* Header & Back link */}
          <div style={{ marginBottom: '24px' }}>
            <button 
              onClick={() => setCurrentRoute('home')}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '16px'
              }}
            >
              <ArrowLeft size={14} /> Quay về Trang Chủ
            </button>

            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} /> ADMIN CONTROL
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EasyGold Management v3.0</div>
          </div>

          {/* Navigation Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  style={{
                    background: isActive ? 'rgba(245, 192, 66, 0.15)' : 'transparent',
                    color: isActive ? 'var(--gold-primary)' : 'var(--text-muted)',
                    border: isActive ? '1px solid rgba(245, 192, 66, 0.3)' : '1px solid transparent',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>

                  {item.badgeCount > 0 && (
                    <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer & Logout Button inside sidebar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '12px' }}>
            Đăng nhập với tư cách:<br />
            <strong style={{ color: 'var(--gold-primary)' }}>Super Admin (Quản trị viên)</strong>
          </div>
          
          <button 
            onClick={logoutAdmin}
            style={{
              width: '100%',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={14} /> Khóa / Đăng Xuất Admin
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT CONTAINER */}
      <main style={{ flexGrow: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  );
}
