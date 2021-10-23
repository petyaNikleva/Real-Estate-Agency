const router = require('express').Router();

const housingService = require('../services/housingService');

const { isAuth } = require('../middlewares/authMiddleware');

const { getFirstError } = require('../helpers/getFirstError');

router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', {housings});
});

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) =>  {  
    try {
        await housingService.create({...req.body, owner: req.user._id}); // тук можем да подадем само елементите, които ни трябват
        res.redirect('/housing');
    } catch (error) {
        //res.locals.error = "Invalid creation of offer" ???? don't work
        //res.render('housing/create', {error: error._message}) - it's OK
        res.render('housing/create', {error: getFirstError(error)})
    }
    
});

router.get('/:housingId/details', async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner == req.user?._id;

    let tenants = housing.getTenants();

    let housingData = await housing.toObject();

    let isAvailable = housing.availablePieces > 0;
    let isRentedByYou = housing.tenants.some(x => x._id == req.user?._id);

    res.render('housing/details', {...housingData, isOwner, tenants, isAvailable, isRentedByYou});
});

async function isOwner (req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);

    if (housing.owner == req.user._id) {
        res.redirect('404');
    } else {
        next();
    }
}


router.get('/:housingId/rent', isOwner, async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});

router.get('/:housingId/delete', isntOwner, async (req, res) => {

    await housingService.delete(req.params.housingId);

    res.redirect('/housing')
});

router.get('/:housingId/edit', isntOwner, async (req, res) => { 
    let housing = await housingService.getOne(req.params.housingId);

    res.render('housing/edit', {...housing.toObject()});
});

router.post('/:housingId/edit', isntOwner, async (req, res) => { 
    await housingService.updateOne(req.params.housingId, req.body);

    res.redirect(`/housing/${req.params.housingId}/details`);
    
});

async function isntOwner (req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);

    if (housing.owner == req.user?._id) {
        next();
    } else {
        res.redirect('404');
    }
}


module.exports = router;
 