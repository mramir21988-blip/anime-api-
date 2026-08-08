const fs = require('fs');
const path = require('path');
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { genre } = req.query;
  const genresDir = path.join(__dirname, '../data/genres');

  if (!genre) {
    const files = fs.readdirSync(genresDir)
      .filter(f => f.startsWith('genre_') && f.endsWith('.json'))
      .map(f => f.replace('genre_', '').replace('.json', '').replace(/_/g, ' '));
    return res.json({ success: true, genres: files });
  }

  const filename = 'genre_' + genre.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and') + '.json';
  const filepath = path.join(genresDir, filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ success: false, message: 'Genre not found' });
  }

  const data = require(filepath);
  res.json({ success: true, genre: genre, count: data.length, data: data });
};