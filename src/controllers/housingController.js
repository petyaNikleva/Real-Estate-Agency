const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', (req, res) => {
    res.render('housing');
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {  
    await housingService.create(req.body); // тук можем да подадем само елементите, които ни трябват

    res.redirect('/');
});


module.exports = router;
