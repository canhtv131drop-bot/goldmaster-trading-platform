import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'goldmaster.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Helper functions for Promise-based queries
export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export async function initDb() {
  // 1. Leads Table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      capital TEXT,
      source TEXT,
      status TEXT DEFAULT 'Mới',
      date TEXT,
      notes TEXT
    )
  `);

  // 2. Signals Table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS signals (
      id TEXT PRIMARY KEY,
      pair TEXT NOT NULL,
      type TEXT NOT NULL,
      entry TEXT,
      sl TEXT,
      tp1 TEXT,
      tp2 TEXT,
      pips TEXT,
      result TEXT,
      date TEXT,
      note TEXT
    )
  `);

  // 3. CMS Table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS cms (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  // 4. Admin Auth Table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY DEFAULT 1,
      password TEXT NOT NULL
    )
  `);

  // --- Seed Data if tables are empty ---

  // Check & Seed Admin
  const adminRow = await dbGet(`SELECT * FROM admin WHERE id = 1`);
  if (!adminRow) {
    await dbRun(`INSERT INTO admin (id, password) VALUES (1, ?)`, ['Canhdepzai1999@']);
  }

  // Check & Seed CMS
  const cmsCount = await dbGet(`SELECT COUNT(*) as count FROM cms`);
  if (cmsCount.count === 0) {
    const defaultCms = {
      zaloGroupUrl: 'https://zalo.me/g/hyoiwdpqc5auq9vbainr',
      telegramGroupUrl: 'https://t.me/EasyGold_Signals_VIP',
      supportHotline: '0353.753.863',
      availableSlots: '14',
      countdownHours: '5',
      countdownMinutes: '24',
      bannerNotice: '🔥 NHẬN 5-10 TÍN HIỆU XAUUSD MỖI NGÀY TẠI NHÓM ZALO VIP - CHỈ CÒN 14 SLOT!',
      telegramBotToken: '',
      telegramChatId: ''
    };
    for (const [key, value] of Object.entries(defaultCms)) {
      await dbRun(`INSERT INTO cms (key, value) VALUES (?, ?)`, [key, String(value)]);
    }
  }

  // Check & Seed Signals
  const signalsCount = await dbGet(`SELECT COUNT(*) as count FROM signals`);
  if (signalsCount.count === 0) {
    const seedSignals = [
      { id: 'XAU-1089', pair: 'XAUUSD', type: 'BUY LIMIT', entry: '2642.50', sl: '2636.00', tp1: '2652.00', tp2: '2660.00', pips: '+95 Pips', result: 'WIN', date: 'Hôm nay 15:40', note: 'Quét nến thanh khoản phiên Âu (Liquidity Sweep)' },
      { id: 'XAU-1088', pair: 'XAUUSD', type: 'SELL NOW', entry: '2658.00', sl: '2664.00', tp1: '2648.00', tp2: '2640.00', pips: '+100 Pips', result: 'WIN', date: 'Hôm nay 09:20', note: 'Phản ứng vùng Cung h1 (Supply Zone)' },
      { id: 'XAU-1087', pair: 'XAUUSD', type: 'BUY NOW', entry: '2635.00', sl: '2629.00', tp1: '2645.00', tp2: '2655.00', pips: '+100 Pips', result: 'WIN', date: 'Hôm qua 20:15', note: 'Chạm sóng hỗ trợ nến mạ vàng D1' }
    ];
    for (const sig of seedSignals) {
      await dbRun(
        `INSERT INTO signals (id, pair, type, entry, sl, tp1, tp2, pips, result, date, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [sig.id, sig.pair, sig.type, sig.entry, sig.sl, sig.tp1, sig.tp2, sig.pips, sig.result, sig.date, sig.note]
      );
    }
  }

  // Check & Seed Leads
  const leadsCount = await dbGet(`SELECT COUNT(*) as count FROM leads`);
  if (leadsCount.count === 0) {
    const seedLeads = [
      { name: 'Nguyễn Văn Hùng', phone: '0988123456', email: '', capital: '$1,000 - $5,000', source: 'EasyGold Zalo VIP Funnel', status: 'Mới', date: '2026-08-01 14:30', notes: 'Zalo VIP direct join' },
      { name: 'Trần Thị Mai', phone: '0912345678', email: '', capital: 'Trên $10,000', source: 'EasyGold Zalo VIP Funnel', status: 'Đã liên hệ', date: '2026-08-01 12:15', notes: 'Đã duyệt vào nhóm Zalo VIP' }
    ];
    for (const lead of seedLeads) {
      await dbRun(
        `INSERT INTO leads (name, phone, email, capital, source, status, date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [lead.name, lead.phone, lead.email, lead.capital, lead.source, lead.status, lead.date, lead.notes]
      );
    }
  }

  console.log('Database initialization & seeding completed successfully.');
}

export default db;
