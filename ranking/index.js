const express = require('express');
const cors = require('cors');
const app = express();
const player = require('./controller/player');

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => res.send('UP'));
app.use('/player', player);

module.exports = app;