const router = require('express').Router();

router.get('/api/v1/convertNumberToText/:num([0-9]+)', (req, res) => {
    res.status(200).send(req.params.num);
});

// Get small documentation for available routes
router.get('/api/v1', (req, res) => {
    res.status(200).send(require('./routes.json'));
});

module.exports = router;