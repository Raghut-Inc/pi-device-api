const os = require('os');
const express = require('express');
const cors = require('cors');
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

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Device info API running at http://localhost:${PORT}`);
});
