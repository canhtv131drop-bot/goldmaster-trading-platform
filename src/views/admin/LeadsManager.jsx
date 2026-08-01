import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Download, Filter, Send, PhoneCall, CheckCircle2, MessageSquare, Edit3, X } from 'lucide-react';

export default function LeadsManager() {
  const { leads, updateLeadStatus, exportLeadsCSV, settings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  // Edit Note Modal State
  const [selectedLead, setSelectedLead] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [editStatus, setEditStatus] = useState('Mới');

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || (sourceFilter === 'Signal' ? lead.source.includes('Signal') : lead.source.includes('Course'));
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setEditNoteText(lead.notes);
    setEditStatus(lead.status);
  };

  const handleSaveEdit = () => {
    if (selectedLead) {
      updateLeadStatus(selectedLead.id, editStatus, editNoteText);
      setSelectedLead(null);
    }
  };

  const simulateTelegramAlert = (lead) => {
    alert(`[BOT TELEGRAM TEST]\nĐã gửi tin nhắn tự động tới Telegram Chat ID: ${settings.telegramChatId}\nNội dung: 🔥 LEAD MỚI #${lead.id} - ${lead.name} (${lead.phone}) từ ${lead.source}`);
  };

  return (
    <div>
      
      {/* HEADER & ACTION BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>QUẢN LÝ LEADS & ĐĂNG KÝ (CRM)</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tổng số: <strong>{leads.length} Leads</strong> trong hệ thống</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={exportLeadsCSV} className="btn-gold" style={{ fontSize: '0.88rem', padding: '10px 18px' }}>
            <Download size={16} /> Xuất File CSV / Excel
          </button>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        
        {/* SEARCH INPUT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1, maxWidth: '360px', background: 'rgba(0,0,0,0.5)', padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc số điện thoại..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

        {/* STATUS FILTER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={16} color="var(--gold-primary)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Trạng thái:</span>
          <select 
            className="form-input" 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.85rem', width: 'auto' }}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="Mới">Mới (Chưa gọi)</option>
            <option value="Đã liên hệ">Đã liên hệ</option>
            <option value="Đã vào nhóm">Đã vào nhóm Zalo/Tele</option>
            <option value="Không nghe máy">Không nghe máy</option>
            <option value="Từ chối">Từ chối</option>
          </select>
        </div>

        {/* SOURCE FILTER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nguồn:</span>
          <select 
            className="form-input" 
            value={sourceFilter} 
            onChange={e => setSourceFilter(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.85rem', width: 'auto' }}
          >
            <option value="ALL">Tất cả phễu</option>
            <option value="Signal">Phễu Tín Hiệu</option>
            <option value="Course">Phễu Khoá Học</option>
          </select>
        </div>

      </div>

      {/* LEADS CRM TABLE */}
      <div className="glass-card" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '880px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--gold-primary)', fontSize: '0.82rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px' }}>Mã Lead</th>
              <th style={{ padding: '12px' }}>Họ và Tên</th>
              <th style={{ padding: '12px' }}>Số Điện Thoại / Zalo</th>
              <th style={{ padding: '12px' }}>Phễu Nguồn</th>
              <th style={{ padding: '12px' }}>Mức Vốn</th>
              <th style={{ padding: '12px' }}>Trạng Thái</th>
              <th style={{ padding: '12px' }}>Ngày Đăng Ký</th>
              <th style={{ padding: '12px' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  Không tìm thấy lead nào phù hợp!
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.88rem' }}>
                  <td style={{ padding: '14px 12px', fontWeight: 700, color: 'var(--gold-primary)' }}>{lead.id}</td>
                  <td style={{ padding: '14px 12px', fontWeight: 600 }}>{lead.name}</td>
                  <td style={{ padding: '14px 12px', color: '#38bdf8', fontWeight: 700 }}>{lead.phone}</td>
                  <td style={{ padding: '14px 12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lead.source}</td>
                  <td style={{ padding: '14px 12px' }}>{lead.capital}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{
                      background: lead.status === 'Mới' ? 'rgba(239,68,68,0.2)' : lead.status === 'Đã vào nhóm' ? 'rgba(16,185,129,0.2)' : 'rgba(245,192,66,0.2)',
                      color: lead.status === 'Mới' ? '#f87171' : lead.status === 'Đã vào nhóm' ? '#34d399' : 'var(--gold-primary)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.78rem'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.createdAt}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenEdit(lead)}
                        className="btn-secondary" 
                        title="Chỉnh sửa trạng thái / ghi chú"
                        style={{ padding: '6px', fontSize: '0.75rem' }}
                      >
                        <Edit3 size={14} />
                      </button>

                      <button 
                        onClick={() => simulateTelegramAlert(lead)}
                        className="btn-secondary" 
                        title="Bắn Bot Telegram"
                        style={{ padding: '6px', fontSize: '0.75rem', color: '#38bdf8' }}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {selectedLead && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '28px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Cập Nhật Lead #{selectedLead.id}</h3>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Họ tên & Số điện thoại</label>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--gold-primary)' }}>{selectedLead.name} - {selectedLead.phone}</div>
              </div>

              <div>
                <label className="form-label">Trạng Thái Chăm Sóc CRM</label>
                <select 
                  className="form-input"
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value)}
                >
                  <option value="Mới">Mới (Chưa gọi)</option>
                  <option value="Đã liên hệ">Đã liên hệ</option>
                  <option value="Đã vào nhóm">Đã vào nhóm Zalo/Tele</option>
                  <option value="Không nghe máy">Không nghe máy</option>
                  <option value="Từ chối">Từ chối</option>
                </select>
              </div>

              <div>
                <label className="form-label">Ghi Chú Chi Tiết Đội Sale</label>
                <textarea 
                  className="form-input"
                  rows="4"
                  value={editNoteText}
                  onChange={e => setEditNoteText(e.target.value)}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button onClick={() => setSelectedLead(null)} className="btn-secondary">Hủy</button>
                <button onClick={handleSaveEdit} className="btn-gold">Lưu Cập Nhật</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
