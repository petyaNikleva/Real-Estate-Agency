const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('housing');
})

module.exports = router;
