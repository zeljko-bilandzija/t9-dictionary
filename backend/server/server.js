// Loading and configuring environment settings
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

// We need to export app because of tests
module.exports = { app };