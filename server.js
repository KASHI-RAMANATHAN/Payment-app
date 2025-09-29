
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); 
const Razorpay = require('razorpay');
const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID, // PASTE YOUR KEY ID
    key_secret: process.env.KEY_SECRET, // PASTE YOUR KEY SECRET
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

app.post('/api/create-razorpay-order', async (req, res) => {
    const { amount } = req.body;
    const amountInPaise = Math.round(parseFloat(amount) * 100);

    if (isNaN(amountInPaise) || amountInPaise < 100) {
        return res.status(400).json({ error: 'Invalid amount. Minimum 1 INR required.' });
    }

    const options = {
        amount: amountInPaise, 
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.json({
            orderId: order.id,
            amount: amount,
            keyId: razorpayInstance.key_id 
        });
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);
        res.status(500).json({ error: error.message });
    }
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