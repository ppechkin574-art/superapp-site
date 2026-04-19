const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/app', (req, res) => res.sendFile(path.join(__dirname, 'app.html')));
app.get('/superapp-app.html', (req, res) => res.sendFile(path.join(__dirname, 'app.html')));
app.get('/superapp.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/onboarding', (req, res) => res.sendFile(path.join(__dirname, 'onboarding.html')));
app.get('/onboarding.html', (req, res) => res.sendFile(path.join(__dirname, 'onboarding.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
