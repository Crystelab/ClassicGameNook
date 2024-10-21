const express = require('express');
const path = require('path');

const gamesRoutes = require('./server/routes/gamesRoutes');
const mainRoutes = require('./server/routes/mainRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/games', gamesRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
