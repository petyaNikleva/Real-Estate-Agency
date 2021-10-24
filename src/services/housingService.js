const Housing = require('../models/Housing');

exports.getAll = () => Housing.find().lean();

//exports.getOne = (housingId) => Housing.findById(housingId).lean();
exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = ()=> Housing.find().sort({createdAt: -1}).limit(3).lean();

exports.addTenant = (housingId, tenantId) => {
    // don't word for now ??
    // ???Housing.findByIdAndUpdate(housingId, tenants: tenants-1)
    // let housing = await housingService.getOne(req.params.housingId);
    // housing.tenants.push(req.user._id);
    // housing.availablePieces = housing.availablePieces - 1;
    // return housing.save();

    return Housing.findOneAndUpdate(
        {_id: housingId}, 
        { $push: {tenants: tenantId}, 
        $inc: { availablePieces: -1}
     }, 
     { runValidators: true }
    );
};

exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);

exports.updateOne = (housingId, housingData) => Housing.findByIdAndUpdate(housingId, housingData);

//exports.search = (text) => Housing.find({ type: text }).lean(); //if we want to be whole word ex. House
exports.search = (text) => Housing.find({ type: {$regex: text, $options: 'i'}}).lean();  // - DONT WORK"???? if we search case insensitive and not full word

 