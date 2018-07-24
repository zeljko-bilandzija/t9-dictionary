// Loading and configuring environment settings
require('./config/config');
const express = require('express');
const T9 = require('./T9');
const t9Instance = new T9();

const app = express();

// Headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Initial V1 api
app.use('/', require('./api/v1'));

// Setting instance of dictionary as app prop
app.set('t9Instance', t9Instance);

// Handle all other GET unknown routes
app.get('*', (req, res) => {
    res.status(200).send('Please use /api/v1 route for list of available routes.')
});

// Starting server
app.listen(process.env.PORT, async() => {
    await t9Instance.initializeDictionary();
    // Sending signal when dictionary is loaded (needed for tests)
    app.emit("app_started");
    console.log(`Server started on port ${process.env.PORT}`);
});

// We need to export app because of tests
module.exports = {
    app
};