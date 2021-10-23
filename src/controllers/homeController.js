const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getTopHouses();
  
    res.render('home', {housings});
});

router.get('/search', async (req, res) => {
    let searchedText = req.query.search;

    let housings = await housingService.search(searchedText);
  
    res.render('search', {housings});
});
 

module.exports = router;