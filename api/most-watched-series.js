const data = require('../data/section_most_watched_series.json');
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json({ success: true, count: data.length, data: data });
};