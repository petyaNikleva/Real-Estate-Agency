const express = require('express');
const app = express();
const { PORT } = require('./constants');

require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`))
