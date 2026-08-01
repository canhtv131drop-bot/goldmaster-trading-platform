import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Lock, Save, Key, CheckCircle2, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function SystemSettings() {
  const { cms, setCms, adminPassword, updateAdminPassword } = useApp();

  // Section 1: Zalo Group Link state
  const [zaloUrl, setZaloUrl] = useState(cms.zaloGroupUrl || 'https://zalo.me/g/hyoiwdpqc5auq9vbainr');
  const [zaloSaved, setZaloSaved] = useState(false);

  // Section 2: Password Change state with Master Security Code
  const [masterCode, setMasterCode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState({ text: '', isError: false });

  // Handle Save Zalo Link
  const handleSaveZalo = (e) => {
    e.preventDefault();
    if (!zaloUrl) {
      alert('Vui lòng nhập đường link Nhóm Zalo VIP!');
      return;
    }
    setCms(prev => ({
      ...prev,
      zaloGroupUrl: zaloUrl.trim()
    }));
    setZaloSaved(true);
    setTimeout(() => setZaloSaved(false), 3500);
  };

  // Handle Update Password with Master Security Verification
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    // STEP 1: Verify Master Security Passcode (MUST BE "conremeyen")
    if (masterCode.trim() !== 'conremeyen') {
      setPwdMsg({ text: '❌ Mã xác thực Chủ sở hữu không chính xác! Chỉ chủ sở hữu mới có quyền đổi mật khẩu.', isError: true });
      return;
    }

    // STEP 2: Verify Current Admin Password
    if (currentPassword !== adminPassword) {
      setPwdMsg({ text: '❌ Mật khẩu Admin hiện tại không đúng. Vui lòng kiểm tra lại!', isError: true });
      return;
    }

    // STEP 3: Verify New Password Length
    if (!newPassword || newPassword.length < 6) {
      setPwdMsg({ text: '❌ Mật khẩu mới phải có tối thiểu 6 ký tự!', isError: true });
      return;
    }

    // STEP 4: Confirm Passwords Match
    if (newPassword !== confirmPassword) {
      setPwdMsg({ text: '❌ Mật khẩu mới và Xác nhận mật khẩu không khớp nhau!', isError: true });
      return;
    }

    updateAdminPassword(newPassword);
    setPwdMsg({ text: '✓ Đã xác thực thành công! Mật khẩu Admin của bạn đã được cập nhật.', isError: false });
    setMasterCode('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwdMsg({ text: '', isError: false }), 4500);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '6px', color: '#fff' }}>CÀI ĐẶT HỆ THỐNG QUẢN TRỊ</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Quản lý đường link Nhóm Zalo VIP toàn trang & Đổi mật khẩu tài khoản Admin
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* SECTION 1: CHANGE ZALO GROUP LINK FOR ENTIRE WEBSITE */}
        <div className="glass-card gold-glow" style={{ padding: '30px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(245, 192, 66, 0.2)',
              color: 'var(--gold-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>1. CẤU HÌNH ĐƯỜNG LINK NHÓM ZALO VIP CHÍNH THỨC</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Thay đổi đường link nhóm Zalo VIP tại đây. Tất cả các nút bấm trên giao diện khách hàng sẽ tự động cập nhật ngay lập tức.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveZalo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Đường Link Nhóm Zalo VIP (*)</label>
              <input 
                type="url" 
                className="form-input" 
                placeholder="Ví dụ: https://zalo.me/g/hyoiwdpqc5auq9vbainr"
                value={zaloUrl}
                onChange={e => setZaloUrl(e.target.value)}
                required
                style={{ fontSize: '1.02rem', fontWeight: 600 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button type="submit" className="btn-gold" style={{ padding: '12px 26px', fontSize: '0.95rem' }}>
                <Save size={18} />
                <span>LƯU ĐƯỜNG LINK ZALO MỚI</span>
              </button>

              {zaloSaved && (
                <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} /> Đã cập nhật link Zalo VIP toàn bộ trang web!
                </div>
              )}
            </div>
          </form>
        </div>

        {/* SECTION 2: CHANGE ADMIN LOGIN PASSWORD WITH MASTER SECURITY VERIFICATION */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>2. THAY ĐỔI MẬT KHẨU QUẢN TRỊ ADMIN (BẢO MẬT CHỦ SỞ HỮU)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Yêu cầu nhập Mã Xác Thực Chủ Sở Hữu độc quyền để được phép đổi mật khẩu Admin.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* MASTER SECURITY CODE FIELD */}
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '18px', borderRadius: '14px' }}>
              <label className="form-label" style={{ color: '#f87171', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Key size={16} /> Mã Xác Thực Chủ Sở Hữu (Master Security Code) (*)
              </label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Nhập mã xác thực chủ sở hữu để mở quyền đổi mật khẩu..." 
                value={masterCode}
                onChange={e => setMasterCode(e.target.value)}
                required
                style={{ borderColor: 'rgba(239, 68, 68, 0.5)', background: 'rgba(8, 11, 16, 0.95)' }}
              />
            </div>

            <div>
              <label className="form-label">Mật Khẩu Admin Hiện Tại (*)</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Nhập mật khẩu Admin đang dùng..." 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid-2">
              <div>
                <label className="form-label">Mật Khẩu Mới (*)</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Nhập mật khẩu mới..." 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Xác Nhận Mật Khẩu Mới (*)</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Nhập lại mật khẩu mới..." 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {pwdMsg.text && (
              <div style={{
                color: pwdMsg.isError ? '#f87171' : '#34d399',
                background: pwdMsg.isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: `1px solid ${pwdMsg.isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}>
                {pwdMsg.text}
              </div>
            )}

            <button type="submit" className="btn-gold" style={{ padding: '12px 26px', fontSize: '0.95rem', alignSelf: 'flex-start' }}>
              <Key size={18} />
              <span>XÁC NHẬN CẬP NHẬT MẬT KHẨU ADMIN</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
