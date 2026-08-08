// api/index.js — SINGLE FILE FOR ALL ROUTES

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const { url } = req;
  const pathname = url.split('?')[0];

  // Route handler
  try {
    // /api/slider
    if (pathname === '/api/slider') {
      const data = require('../data/slider_only.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/index
    if (pathname === '/api/index') {
      const data = require('../data/anime_index.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/new-arrivals
    if (pathname === '/api/new-arrivals') {
      const data = require('../data/section_new_arrivals.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/most-watched-films
    if (pathname === '/api/most-watched-films') {
      const data = require('../data/section_most_watched_films.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/most-watched-series
    if (pathname === '/api/most-watched-series') {
      const data = require('../data/section_most_watched_series.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/cartoon-films
    if (pathname === '/api/cartoon-films') {
      const data = require('../data/section_cartoon_films.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/cartoon-series
    if (pathname === '/api/cartoon-series') {
      const data = require('../data/section_cartoon_series.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/on-air
    if (pathname === '/api/on-air') {
      const data = require('../data/section_on_air_series.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/fresh-drops
    if (pathname === '/api/fresh-drops') {
      const data = require('../data/section_fresh_drops.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/hindi-dubbed
    if (pathname === '/api/hindi-dubbed') {
      const data = require('../data/hindi_dubbed.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/movies
    if (pathname === '/api/movies') {
      const data = require('../data/type_movie.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/series
    if (pathname === '/api/series') {
      const data = require('../data/type_series.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/cartoons
    if (pathname === '/api/cartoons') {
      const data = require('../data/all_cartoons.json');
      return res.json({ success: true, count: data.length, data });
    }

    // /api/genres?genre=action
    if (pathname === '/api/genres') {
      const genre = req.query.genre;
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
      return res.json({ success: true, genre, count: data.length, data });
    }

    // /api/search?q=naruto
    if (pathname === '/api/search') {
      const query = req.query.q;
      const indexData = require('../data/anime_index.json');

      if (!query) {
        return res.json({ success: true, count: indexData.length, data: indexData });
      }

      const q = query.toLowerCase();
      const results = indexData.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.genres.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
      );

      return res.json({ success: true, count: results.length, query, data: results });
    }

    // /api/anime-detail?id=anime_xxx
    if (pathname === '/api/anime-detail') {
      const id = req.query.id;
      const allData = require('../data/anime-data.json');

      if (!id) {
        return res.status(400).json({ success: false, message: 'ID required' });
      }

      const anime = allData.find(a => a.id === id);
      if (!anime) {
        return res.status(404).json({ success: false, message: 'Anime not found' });
      }

      return res.json({ success: true, data: anime });
    }

    // Unknown route
    return res.status(404).json({ success: false, message: 'Route not found', path: pathname });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
