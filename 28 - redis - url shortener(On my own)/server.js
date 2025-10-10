// import express from "express";
// import { createClient } from "redis";

// const app = express();
// app.use(express.json());

// // Connect Redis
// const client = createClient();
// client.on("error", (err) => console.error("Redis Error", err));
// await client.connect();



// app.post("/set", async (req, res) => {
//   const { key, value } = req.body;
//   await client.set(key, value);
//   res.send(`Saved ${key} = ${value}`);
// });

// app.get("/get/:key", async (req, res) => {
//   const value = await client.get(req.params.key);
//   res.send(value ?? "Not found");
// });

// app.post("/cache", async (req, res) => {
//   const { key, value, ttl } = req.body; // ttl in seconds
//   await client.setEx(key, ttl, value);
//   res.send(`Cached ${key} for ${ttl} seconds`);
// });



// app.get("/limited", async (req, res) => {
//   const ip = req.ip;
//   const key = `rate:${ip}`;
//   const count = await client.incr(key);

//   if (count === 1) await client.expire(key, 10); // 10s window
//   if (count > 5) return res.status(429).send("Too Many Requests");

//     console.log(req);
//   res.send(`You have used ${count}/5 requests,
//     and ip is ${ip}
//     `);
// });


// app.listen(3000, () => console.log("Server running on http://localhost:3000"));




const express = require('express');
const redis = require('redis');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
const PORT = 3000;

// Redis client
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.connect();

console.log('Connecting to Redis...');
client.on('connect', () => console.log('✅ Connected to Redis'));
client.on('error', (err) => console.log('❌ Redis error:', err));

// new Promise(resolve => setTimeout(resolve, 1000)); // Wait for Redis connection
// new Promise(resolve => setTimeout(resolve, 4000));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// REDIS LEARNING: Shorten URL
app.post('/shorten', async (req, res) => {
    try {
        const { url } = req.body;
        
        // Check if URL already exists (Redis GET operation)
        const existingShortCode = await client.get(`url:${url}`);
        if (existingShortCode) {
            return res.json({
                shortUrl: `http://localhost:${PORT}/${existingShortCode}`,
                originalUrl: url,
                message: 'URL already exists in Redis!'
            });
        }
        
        // Generate short code
        const shortCode = nanoid(6);
        
        // REDIS OPERATIONS:
        // 1. Store original URL with short code as key
        await client.set(`short:${shortCode}`, url);
        
        // 2. Store reverse mapping (for duplicate detection)
        await client.set(`url:${url}`, shortCode);
        
        // 3. Initialize click counter for this URL
        await client.set(`clicks:${shortCode}`, 0);
        
        // 4. Add to total URLs counter
        await client.incr('stats:total_urls');
        
        // 5. Store creation timestamp
        await client.set(`createdss:${shortCode}`, new Date().toISOString());
        
        console.log(`✅ Redis stored: ${shortCode} -> ${url}`);
        
        res.json({
            shortUrl: `http://localhost:${PORT}/${shortCode}`,
            originalUrl: url,
            shortCode: shortCode
        });
        
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




// REDIS LEARNING: Redirect short URL
app.get('/:shortCode', async (req, res) => {
    try {
        const { shortCode } = req.params;
        
        // REDIS GET operation
        const originalUrl = await client.get(`short:${shortCode}`);
        
        if (!originalUrl) {
            return res.status(404).send('URL not found in Redis!');
        }
        
        // REDIS COUNTER operations
        // 1. Increment click counter for this specific URL
        await client.incr(`clicks:${shortCode}`);
        
        // 2. Increment total clicks counter
        await client.incr('stats:total_clicks');
        
        console.log(`✅ Redis redirect: ${shortCode} -> ${originalUrl}`);
        
        // Redirect to original URL
        res.redirect(originalUrl);
        
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).send('Server error');
    }
});

// REDIS LEARNING: Get analytics
app.get('/analytics', async (req, res) => {
    try {
        // REDIS operations to get stats
        const totalUrls = await client.get('stats:total_urls') || 0;
        const totalClicks = await client.get('stats:total_clicks') || 0;
        
        res.json({
            totalUrls: parseInt(totalUrls),
            totalClicks: parseInt(totalClicks)
        });
        
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// REDIS LEARNING: Get URL details with Redis Hash
app.get('/info/:shortCode', async (req, res) => {
    try {
        const { shortCode } = req.params;
        
        // REDIS HASH operations - store multiple fields for a URL
        const urlInfo = await client.hgetall(`info:${shortCode}`);
        
        if (!urlInfo || Object.keys(urlInfo).length === 0) {
            // If hash doesn't exist, create it from existing data
            const originalUrl = await client.get(`short:${shortCode}`);
            const clicks = await client.get(`clicks:${shortCode}`);
            const created = await client.get(`created:${shortCode}`);
            
            if (originalUrl) {
                // REDIS HASH SET operations
                await client.hset(`info:${shortCode}`, {
                    'original_url': originalUrl,
                    'clicks': clicks || 0,
                    'created_at': created || new Date().toISOString(),
                    'short_code': shortCode
                });
                
                return res.json({
                    shortCode,
                    originalUrl,
                    clicks: parseInt(clicks) || 0,
                    createdAt: created
                });
            } else {
                return res.status(404).json({ error: 'URL not found' });
            }
        }
        
        res.json({
            shortCode: urlInfo.short_code,
            originalUrl: urlInfo.original_url,
            clicks: parseInt(urlInfo.clicks),
            createdAt: urlInfo.created_at
        });
        
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// REDIS LEARNING: Set expiring URLs (TTL feature)
app.post('/shorten-temp', async (req, res) => {
    try {
        const { url, ttl = 3600 } = req.body; // Default 1 hour
        
        const shortCode = nanoid(6);
        
        // REDIS SET with expiration (TTL)
        await client.setex(`temp:${shortCode}`, ttl, url);
        
        console.log(`✅ Redis stored with TTL: ${shortCode} expires in ${ttl} seconds`);
        
        res.json({
            shortUrl: `http://localhost:${PORT}/temp/${shortCode}`,
            originalUrl: url,
            expiresIn: ttl
        });
        
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Handle temporary URLs
app.get('/temp/:shortCode', async (req, res) => {
    try {
        const { shortCode } = req.params;
        
        // REDIS GET for expiring key
        const originalUrl = await client.get(`temp:${shortCode}`);
        
        if (!originalUrl) {
            return res.status(404).send('Temporary URL expired or not found!');
        }
        
        // Check TTL (time to live)
        const ttl = await client.ttl(`temp:${shortCode}`);
        console.log(`⏰ URL expires in ${ttl} seconds`);
        
        res.redirect(originalUrl);
        
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).send('Server error');
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});