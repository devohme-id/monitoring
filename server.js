const express = require('express');
const psList = require('ps-list').default || require('ps-list');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/status', async (req, res) => {
  try {
    const processes = await psList();
    const logProcess = processes.find(p => p.name.toLowerCase() === 'AOI_DCS.exe');
    // res.json(processes);
    res.json({
      logExeRunning: !!logProcess,
      pid: logProcess?.pid || null,
      cpu: logProcess?.cpu || null,
      memory: logProcess?.memory || null
    });
  } catch (err) {
    console.error('Error saat cek proses:', err);
    res.status(500).json({ error: 'Gagal mendeteksi proses AOI_DCS.exe' });
  }
});

app.listen(PORT, () => {
  console.log(`Server monitor jalan di http://localhost:${PORT}`);
});
