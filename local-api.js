const os = require('os');
const express = require('express');
const app = express();
const PORT = 4000;

app.get('/device-info', (req, res) => {
  const iface = os.networkInterfaces().wlan0 || os.networkInterfaces().eth0;
  if (!iface) return res.status(500).send({ error: 'No MAC found' });

  res.send({ mac: iface[0].mac });
});

app.listen(PORT, () => {
  console.log(`Device info API running at http://localhost:${PORT}`);
});
