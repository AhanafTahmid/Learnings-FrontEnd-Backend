const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const UrlRoute = require('./routes/urlRoute');
const URL = require('./models/url');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

// console.log(UrlRoute)
app.use('/url',UrlRoute);
app.get("/s/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    // console.log("Short ID:", shortId);
    // console.log("body", req.body);
    if (shortId === 'favicon.ico' || shortId.includes('.')) {
        return res.status(404).end();
    }
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log("body", entry);
    res.redirect(entry.redirectURL);
 });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
