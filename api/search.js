const indexData = require('../data/anime_index.json');
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { q } = req.query;
  if (!q) return res.json({ success: true, count: indexData.length, data: indexData });
  const query = q.toLowerCase();
  const results = indexData.filter(a => 
    a.title.toLowerCase().includes(query) ||
    a.genres.toLowerCase().includes(query) ||
    a.type.toLowerCase().includes(query)
  );
  res.json({ success: true, count: results.length, query: q, data: results });
};