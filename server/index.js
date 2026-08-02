import express from 'express';
import cors from 'cors';
import { initDb, dbAll, dbGet, dbRun } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database on Startup
initDb().catch(err => console.error('Failed to init DB:', err));

// --- Telegram Helper ---
async function sendTelegramNotification(leadData, telegramBotToken, telegramChatId) {
  if (!telegramBotToken || !telegramChatId) return;

  const message = `🔥 *KHÁCH HÀNG MỚI ĐĂNG KÝ EASYGOLD* 🔥\n\n` +
    `👤 *Họ tên:* ${leadData.name}\n` +
    `📞 *SĐT/Zalo:* ${leadData.phone}\n` +
    `📧 *Email:* ${leadData.email || 'Chưa cung cấp'}\n` +
    `💰 *Mức vốn:* ${leadData.capital || 'Chưa chọn'}\n` +
    `📍 *Nguồn:* ${leadData.source || 'EasyGold Funnel'}\n` +
    `⏰ *Thời gian:* ${leadData.date || new Date().toLocaleString('vi-VN')}\n` +
    `📌 *Ghi chú:* ${leadData.notes || 'Đăng ký nhận tín hiệu & Khoá học Crazii'}`;

  const url = `https://api.telegram.org/bot${telegramBotToken.trim()}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId.trim(),
        text: message,
        parse_mode: 'Markdown'
      })
    });
    const result = await res.json();
    console.log('Telegram Push Result:', result);
  } catch (err) {
    console.error('Telegram Push Error:', err);
  }
}

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// --- Leads Endpoints ---
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await dbAll(`SELECT * FROM leads ORDER BY id DESC`);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, email, capital, source, notes } = req.body;
    const date = new Date().toLocaleString('vi-VN');
    const status = 'Mới';

    const result = await dbRun(
      `INSERT INTO leads (name, phone, email, capital, source, status, date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, email || '', capital || '', source || 'EasyGold Zalo VIP Funnel', status, date, notes || '']
    );

    const newLead = { id: result.lastID, name, phone, email, capital, source, status, date, notes };

    // Get Telegram Config & Notify
    const botTokenRow = await dbGet(`SELECT value FROM cms WHERE key = 'telegramBotToken'`);
    const chatIdRow = await dbGet(`SELECT value FROM cms WHERE key = 'telegramChatId'`);

    if (botTokenRow?.value && chatIdRow?.value) {
      sendTelegramNotification(newLead, botTokenRow.value, chatIdRow.value);
    }

    res.status(201).json(newLead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    await dbRun(
      `UPDATE leads SET status = COALESCE(?, status), notes = COALESCE(?, notes) WHERE id = ?`,
      [status, notes, id]
    );

    const updated = await dbGet(`SELECT * FROM leads WHERE id = ?`, [id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun(`DELETE FROM leads WHERE id = ?`, [id]);
    res.json({ success: true, id: Number(id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Signals Endpoints ---
app.get('/api/signals', async (req, res) => {
  try {
    const signals = await dbAll(`SELECT * FROM signals ORDER BY id DESC`);
    res.json(signals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/signals', async (req, res) => {
  try {
    const { id, pair, type, entry, sl, tp1, tp2, pips, result, date, note } = req.body;
    const sigId = id || `XAU-${Math.floor(1000 + Math.random() * 9000)}`;

    await dbRun(
      `INSERT INTO signals (id, pair, type, entry, sl, tp1, tp2, pips, result, date, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sigId, pair, type, entry, sl, tp1, tp2, pips, result, date || 'Hôm nay', note || '']
    );

    const newSignal = { id: sigId, pair, type, entry, sl, tp1, tp2, pips, result, date, note };
    res.status(201).json(newSignal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CMS Settings Endpoints ---
app.get('/api/cms', async (req, res) => {
  try {
    const rows = await dbAll(`SELECT * FROM cms`);
    const cmsObj = {};
    rows.forEach(r => {
      // Parse numbers if numerical
      if (r.key === 'availableSlots' || r.key === 'countdownHours' || r.key === 'countdownMinutes') {
        cmsObj[r.key] = Number(r.value);
      } else {
        cmsObj[r.key] = r.value;
      }
    });
    res.json(cmsObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/cms', async (req, res) => {
  try {
    const updatedCms = req.body;
    for (const [key, value] of Object.entries(updatedCms)) {
      await dbRun(
        `INSERT INTO cms (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        [key, String(value)]
      );
    }
    res.json({ success: true, cms: updatedCms });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Admin Auth Endpoints ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { password } = req.body;
    const admin = await dbGet(`SELECT * FROM admin WHERE id = 1`);
    if (admin && admin.password === password) {
      res.json({ success: true, message: 'Authenticated successfully' });
    } else {
      res.status(401).json({ success: false, message: 'Sai mật khẩu Admin!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/auth/password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: 'Mật khẩu quá ngắn' });
    }
    await dbRun(`UPDATE admin SET password = ? WHERE id = 1`, [newPassword]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GoldMaster Express Server is running on port ${PORT}`);
});
