const express = require('express');
const app = express();
const player = require('./controller/player');

app.use(express.json());

app.get('/', (req, res) => res.send('UP'));
app.use('/player', player);

module.exports = app;