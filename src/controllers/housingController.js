const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', {housings});
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) =>  {  
    await housingService.create({...req.body, owner: req.user._id}); // тук можем да подадем само елементите, които ни трябват

    res.redirect('/housing');
});


module.exports = router;
