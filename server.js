
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public-k'));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public-k/homepage.html');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server running with Firebase Auth',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔥 Firebase Auth enabled - No database needed!`);
});

console.log('👋 Firebase-powered authentication server ready!');