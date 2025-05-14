const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Autorise les requêtes depuis n'importe quel domaine (dev uniquement)
app.use(cors());

// Route pour récupérer les vidéos YouTube dynamiquement
app.get('/api/youtube', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!query || !apiKey) {
    return res.status(400).json({ error: 'Requête invalide ou clé API manquante' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    console.error('Erreur YouTube API :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des vidéos' });
  }
});

// Route pour retourner les artistes (depuis artists.json)
app.get('/api/artists', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'artists.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lecture fichier JSON :', err);
      return res.status(500).json({ error: 'Erreur serveur lors de la lecture des artistes' });
    }

    try {
      const artists = JSON.parse(data);
      res.json(artists);
    } catch (e) {
      console.error('Erreur parsing JSON :', e);
      res.status(500).json({ error: 'Erreur de format JSON' });
    }
  });
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});
