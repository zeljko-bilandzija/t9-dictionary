const router = require('express').Router();
const T9 = require('../../T9');

// initializing t9 dictionary
const t9 = new T9();

router.get('/api/v1/convertNumberToText/:num([0-9]+)', (req, res) => {
    const result = t9.predict(req.params.num);
    res.status(200).send(result);
});

// Get small documentation for available routes
router.get('/api/v1', (req, res) => {
    res.status(200).send(require('./routes.json'));
});

module.exports = router;