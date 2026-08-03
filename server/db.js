import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, 'goldmaster-data.json');

// Initial seed dataset
const defaultData = {
  leads: [
    { id: 1, name: 'Nguyễn Văn Hùng', phone: '0988123456', email: '', capital: '$1,000 - $5,000', source: 'EasyGold Zalo VIP Funnel', status: 'Mới', date: '2026-08-01 14:30', notes: 'Zalo VIP direct join' },
    { id: 2, name: 'Trần Thị Mai', phone: '0912345678', email: '', capital: 'Trên $10,000', source: 'EasyGold Zalo VIP Funnel', status: 'Đã liên hệ', date: '2026-08-01 12:15', notes: 'Đã duyệt vào nhóm Zalo VIP' }
  ],
  signals: [
    { id: 'XAU-1089', pair: 'XAUUSD', type: 'BUY LIMIT', entry: '2642.50', sl: '2636.00', tp1: '2652.00', tp2: '2660.00', pips: '+95 Pips', result: 'WIN', date: 'Hôm nay 15:40', note: 'Quét nến thanh khoản phiên Âu (Liquidity Sweep)' },
    { id: 'XAU-1088', pair: 'XAUUSD', type: 'SELL NOW', entry: '2658.00', sl: '2664.00', tp1: '2648.00', tp2: '2640.00', pips: '+100 Pips', result: 'WIN', date: 'Hôm nay 09:20', note: 'Phản ứng vùng Cung h1 (Supply Zone)' },
    { id: 'XAU-1087', pair: 'XAUUSD', type: 'BUY NOW', entry: '2635.00', sl: '2629.00', tp1: '2645.00', tp2: '2655.00', pips: '+100 Pips', result: 'WIN', date: 'Hôm qua 20:15', note: 'Chạm sóng hỗ trợ nến mạ vàng D1' }
  ],
  cms: [
    { key: 'zaloGroupUrl', value: 'https://zalo.me/g/hyoiwdpqc5auq9vbainr' },
    { key: 'telegramGroupUrl', value: 'https://t.me/EasyGold_Signals_VIP' },
    { key: 'supportHotline', value: '0353.753.863' },
    { key: 'availableSlots', value: '14' },
    { key: 'countdownHours', value: '5' },
    { key: 'countdownMinutes', value: '24' },
    { key: 'bannerNotice', value: '🔥 NHẬN 5-10 TÍN HIỆU XAUUSD MỖI NGÀY TẠI NHÓM ZALO VIP - CHỈ CÒN 14 SLOT!' },
    { key: 'telegramBotToken', value: '' },
    { key: 'telegramChatId', value: '' }
  ],
  admin: [
    { id: 1, password: 'Canhdepzai1999@' }
  ],
  notifications: [
    { id: 1, title: 'Anh Nguyễn Văn Hùng (0988***456)', content: 'Vừa đăng ký tham gia Nhóm Zalo VIP Tín Hiệu Gold', time: '2 phút trước' },
    { id: 2, title: 'Chị Trần Thị Mai (0912***678)', content: 'Vừa chốt lời +95 Pips lệnh BUY XAUUSD', time: '5 phút trước' },
    { id: 3, title: 'Anh Lê Hoàng Nam (0903***889)', content: 'Vừa tham gia Khóa Học Trading SMC Crazii', time: '8 phút trước' },
    { id: 4, title: 'Hệ Thống EasyGold VIP', content: 'Vừa bắn tín hiệu SELL NOW XAUUSD @ 2658.00', time: '12 phút trước' }
  ],
  nextLeadId: 3,
  nextNotificationId: 5
};

function loadData() {
  try {
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      const parsed = JSON.parse(raw);
      if (!parsed.notifications) {
        parsed.notifications = defaultData.notifications;
        parsed.nextNotificationId = defaultData.nextNotificationId;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error loading JSON database:', err);
  }
  saveData(defaultData);
  return defaultData;
}

function saveData(data) {
  try {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving JSON database:', err);
  }
}

let store = loadData();

export async function initDb() {
  console.log('Pure JS Database initialized successfully at:', jsonPath);
}

export function dbAll(sql, params = []) {
  return new Promise((resolve) => {
    const cleanSql = sql.toLowerCase();

    if (cleanSql.includes('from leads')) {
      let result = [...store.leads];
      if (cleanSql.includes('order by id desc')) {
        result.sort((a, b) => b.id - a.id);
      }
      resolve(result);
    } else if (cleanSql.includes('from signals')) {
      let result = [...store.signals];
      if (cleanSql.includes('order by id desc')) {
        result = [...store.signals].reverse();
      }
      resolve(result);
    } else if (cleanSql.includes('from cms')) {
      resolve([...store.cms]);
    } else if (cleanSql.includes('from admin')) {
      resolve([...store.admin]);
    } else if (cleanSql.includes('from notifications')) {
      resolve([...(store.notifications || [])]);
    } else {
      resolve([]);
    }
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve) => {
    const cleanSql = sql.toLowerCase();

    if (cleanSql.includes('count(*) as count from cms')) {
      resolve({ count: store.cms.length });
    } else if (cleanSql.includes('count(*) as count from signals')) {
      resolve({ count: store.signals.length });
    } else if (cleanSql.includes('count(*) as count from leads')) {
      resolve({ count: store.leads.length });
    } else if (cleanSql.includes('from cms where key =')) {
      const key = params[0];
      const found = store.cms.find(r => r.key === key);
      resolve(found || null);
    } else if (cleanSql.includes('from admin where id = 1')) {
      const found = store.admin.find(r => r.id === 1);
      resolve(found || null);
    } else if (cleanSql.includes('from leads where id =')) {
      const id = Number(params[0]);
      const found = store.leads.find(r => r.id === id);
      resolve(found || null);
    } else {
      resolve(null);
    }
  });
}

export function dbRun(sql, params = []) {
  return new Promise((resolve) => {
    const cleanSql = sql.toLowerCase();

    if (cleanSql.includes('insert into leads')) {
      const [name, phone, email, capital, source, status, date, notes] = params;
      const newLead = {
        id: store.nextLeadId++,
        name,
        phone,
        email: email || '',
        capital: capital || '',
        source: source || 'EasyGold Zalo VIP Funnel',
        status: status || 'Mới',
        date: date || new Date().toLocaleString('vi-VN'),
        notes: notes || ''
      };
      store.leads.unshift(newLead);
      saveData(store);
      resolve({ lastID: newLead.id, changes: 1 });
    } else if (cleanSql.includes('update leads set')) {
      const [status, notes, id] = params;
      const target = store.leads.find(r => r.id === Number(id));
      if (target) {
        if (status) target.status = status;
        if (notes !== undefined) target.notes = notes;
        saveData(store);
      }
      resolve({ changes: target ? 1 : 0 });
    } else if (cleanSql.includes('delete from leads')) {
      const id = Number(params[0]);
      store.leads = store.leads.filter(r => r.id !== id);
      saveData(store);
      resolve({ changes: 1 });
    } else if (cleanSql.includes('insert into signals')) {
      const [id, pair, type, entry, sl, tp1, tp2, pips, result, date, note] = params;
      const newSignal = { id, pair, type, entry, sl, tp1, tp2, pips, result, date, note };
      store.signals.unshift(newSignal);
      saveData(store);
      resolve({ lastID: id, changes: 1 });
    } else if (cleanSql.includes('insert into cms') || cleanSql.includes('on conflict(key)')) {
      const [key, value] = params;
      const existingIndex = store.cms.findIndex(r => r.key === key);
      if (existingIndex >= 0) {
        store.cms[existingIndex].value = String(value);
      } else {
        store.cms.push({ key, value: String(value) });
      }
      saveData(store);
      resolve({ changes: 1 });
    } else if (cleanSql.includes('update admin set password')) {
      const [newPassword] = params;
      if (store.admin.length > 0) {
        store.admin[0].password = newPassword;
      } else {
        store.admin.push({ id: 1, password: newPassword });
      }
      saveData(store);
      resolve({ changes: 1 });
    } else if (cleanSql.includes('insert into notifications')) {
      const [title, content, time] = params;
      const newNotif = {
        id: store.nextNotificationId++,
        title,
        content,
        time: time || 'Vừa xong'
      };
      if (!store.notifications) store.notifications = [];
      store.notifications.unshift(newNotif);
      saveData(store);
      resolve({ lastID: newNotif.id, changes: 1 });
    } else if (cleanSql.includes('delete from notifications')) {
      const id = Number(params[0]);
      if (store.notifications) {
        store.notifications = store.notifications.filter(r => r.id !== id);
        saveData(store);
      }
      resolve({ changes: 1 });
    } else {
      resolve({ changes: 0 });
    }
  });
}

const db = { run: dbRun, all: dbAll, get: dbGet };
export default db;
