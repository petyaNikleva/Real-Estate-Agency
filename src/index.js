const express = require('express');
const app = express();

require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);

const port = 5000;

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`The app is running on http://localhost:${port}`))
