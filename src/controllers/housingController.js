const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware')

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

router.get('/:housingId/details', isAuth, async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner == req.user._id;

    res.render('housing/details', {...housing, isOwner});
})


module.exports = router;
