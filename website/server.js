const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(path.join(__dirname), {
  maxAge: '7d',
  etag: true,
  setHeaders: (res, filePath) => {
    if (/\.(html|js|css)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    }
  }
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/app', (req, res) => res.sendFile(path.join(__dirname, 'app.html')));
app.get('/superapp-app.html', (req, res) => res.sendFile(path.join(__dirname, 'app.html')));
app.get('/superapp.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/onboarding', (req, res) => res.sendFile(path.join(__dirname, 'onboarding.html')));
app.get('/onboarding.html', (req, res) => res.sendFile(path.join(__dirname, 'onboarding.html')));
app.get('/presentation', (req, res) => res.sendFile(path.join(__dirname, 'presentation', 'index.html')));
app.get('/presentation/', (req, res) => res.sendFile(path.join(__dirname, 'presentation', 'index.html')));
app.get('/presentation/pitch.pdf', (req, res) => res.sendFile(path.join(__dirname, 'presentation', 'superapp-africa-pitch.pdf')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
