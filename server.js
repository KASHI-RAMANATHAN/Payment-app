
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); 
const Razorpay = require('razorpay');
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_RN8in4dH58PvUH', // PASTE YOUR KEY ID
    key_secret: 'GL3cka7vsZ0nU9MCdJCEhd5W', // PASTE YOUR KEY SECRET
});
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static('public-k'));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'homepage.html'));
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