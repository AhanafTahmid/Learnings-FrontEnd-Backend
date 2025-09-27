const {nanoid} = require("nanoid");
const URL = require('../models/url.js')

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
//   console.log("Redirect URL:", redirectURL);
//   console.log("Redirect URL:", redirectURL);
  //console.log("Redirect URL:", url);
  if (!body.url) {
    return res.status(400).json({ error: 'Redirect URL is required' });
  }
  //console.log("Redirect URL:", req);

  try {
    const newEntry = await URL.create({
      redirectURL: body.url,
      shortId: nanoid(8),
      visitHistory: [],
      createdBy: "685133563717fd07e4a2c9d3",
    });
    res.render('home', { id: newEntry.shortId });
    //res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error creating new short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const handleGetAnalytics = async (req, res) => {
  const { shortId } = req.params;

  try {
    const entry = await URL.findOne({ shortId });
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    res.json({
        totalClicks: entry.visitHistory.length,
        analyrics: entry.visitHistory,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};