const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/tictactoe', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/games/tictactoe/tictactoe.html'));
});

router.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../../public/404.html'));
});

module.exports = router;
