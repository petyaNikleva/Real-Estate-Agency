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

router.get('/:housingId/details', async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner == req.user?._id;

    let tenants = housing.getTenants();

    let housingData = await housing.toObject();

    let isAvailable = housing.availablePieces > 0;
    let isRentedByYou = housing.tenants.some(x => x._id == req.user?._id);

    res.render('housing/details', {...housingData, isOwner, tenants, isAvailable, isRentedByYou});
})

router.get('/:housingId/rent', async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});

router.get('/:housingId/delete', async (req, res) => {
    await housingService.delete(req.params.housingId);

    res.redirect('/housing')
});

router.get('/:housingId/edit', async (req, res) => { 
    let housing = await housingService.getOne(req.params.housingId);

    res.render('housing/edit', {...housing.toObject()});
});

router.post('/:housingId/edit', async (req, res) => { 
    await housingService.updateOne(req.params.housingId, req.body);

    res.redirect(`/housing/${req.params.housingId}/details`);

    
});


module.exports = router;
 