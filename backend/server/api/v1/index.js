const router = require('express').Router();

router.get('/api/v1/convertNumberToText/:num([0-9]+)', async(req, res) => {
    // Loading t9Instance from app prop
    const t9Instance = req.app.get('t9Instance');
    const result = await t9Instance.predict(req.params.num);
    res.status(200).send(result);
});

// Get small documentation for available routes
router.get('/api/v1', (req, res) => {
    res.status(200).send(require('./routes.json'));
});

module.exports = router;