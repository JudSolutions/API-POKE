const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/pokemon-data', async (req, res) => {
  try {
    const response = await fetch('https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
