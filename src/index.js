const express = require('express');
const { PORT } = require('./constants');
const app = express();

const routes = require('./routes');


require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);


app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`))
