require('dotenv').config();
const os = require('os');
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = 4000;

// ✅ Allow requests from any origin (including React dev server)
app.use(cors());

// Optional: Health check for "/"
app.get('/', (req, res) => {
  res.send('✅ Pi Device API is running');
});

// 🔌 Endpoint to get MAC address
app.get('/device-info', (req, res) => {
  const net = os.networkInterfaces();
  const iface = net.wlan0 || net.eth0;

  if (!iface || !iface[0] || !iface[0].mac) {
    return res.status(500).send({ error: '❌ No MAC address found' });
  }

  res.send({ mac: iface[0].mac });
});

app.post('/kill-chrome', (req, res) => {
  const auth = req.headers['x-api-secret'];
  if (auth !== process.env.LOCAL_API_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  exec('pkill -f chromium', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Failed to kill Chromium:', err);
      return res.status(500).json({ error: 'Kill failed' });
    }
    console.log('✅ Chromium killed');
    res.json({ success: true });
  });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Device info API running at http://localhost:${PORT}`);
});
