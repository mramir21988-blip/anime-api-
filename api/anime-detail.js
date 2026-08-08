const allData = require('../data/anime-data.json');
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: 'ID required' });
  const anime = allData.find(a => a.id === id);
  if (!anime) return res.status(404).json({ success: false, message: 'Anime not found' });
  res.json({ success: true, data: anime });
};
