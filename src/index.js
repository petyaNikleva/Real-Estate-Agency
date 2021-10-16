const express = require('express');
const { PORT } = require('./constants');
const routes = require('./routes');
const { initDatbase } = require('./config/databaseConfig');

const app = express();



require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);

app.use(routes);
initDatbase()
    .then(() => {
        app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`))
}).catch(err => {
    console.log('Cannot connect database.', err)
});

