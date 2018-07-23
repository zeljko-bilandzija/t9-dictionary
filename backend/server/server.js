// Loading and configuring environment settings
require('./config/config');
const express = require('express');

const app = express();

// Initial V1 api
app.use('/', require('./api/v1'));

// Handle all other GET unknown routes
app.get('*', (req, res) => {
    res.status(200).send('Please use /api/v1 route for list of available routes.')
});

// Starting server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

// We need to export app because of tests
module.exports = { app };