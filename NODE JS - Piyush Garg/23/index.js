const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const UrlRoute = require('./routes/urlRoute');
const staticRoute = require('./routes/static');
const URL = require('./models/url');
const user = require('./routes/user');
dotenv.config();
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const path = require('path');
// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    res.render('home', { allUrls });
    //console.log("allUrls", allUrls);

    // res.send(`
    //     <ol>
    //     ${allUrls.map((url) => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} visits</li>`).join("")}
    //     </ol>
    //   `)
});

// const staics = require('./routes/static');
// app.use('/', staics);


const { restrictAccess, checkauth } = require('./middlewares/auth');

// console.log(UrlRoute)
app.use('/url',restrictAccess, UrlRoute);
app.use('/',checkauth, staticRoute);
app.use('/user', user);

app.get("/url/:shortId", async (req, res) => {
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
    // console.log("body", entry);
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
