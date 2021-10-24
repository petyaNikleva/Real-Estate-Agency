const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getTopHouses();
  
    res.render('home', {housings});
});

router.get('/search', async (req, res) => {
    let text = req.query.text === undefined ? '' : req.query.text;
    let housings = await housingService.search(text);
  
    res.render('search', {housings});
});
 

module.exports = router;