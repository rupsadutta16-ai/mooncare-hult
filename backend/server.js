require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

// Force Google DNS to resolve MongoDB SRV records if local DNS fails
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// Note: We use DATABASE_URI as specified in the .env file
mongoose.connect(process.env.DATABASE_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4 // Force IPv4 to avoid DNS resolution issues with Atlas
})
    .then(() => {
        console.log("-----------------------------------------");
        console.log("🚀 MongoDB connected successfully!");
        console.log(`📡 Database: ${mongoose.connection.name}`);
        console.log("-----------------------------------------");
    })
    .catch(err => {
        console.error("-----------------------------------------");
        console.error("❌ MongoDB connection error:");
        console.error(`Message: ${err.message}`);
        console.error(`Code: ${err.code}`);
        console.error(`Reason: ${err.reason || 'Unknown'}`);
        console.error("-----------------------------------------");
    });

// Routes
app.get('/', (req, res) => {
    res.send("MoonCare Backend is running");
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is healthy' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
