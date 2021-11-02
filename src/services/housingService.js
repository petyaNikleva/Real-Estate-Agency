const Housing = require('../models/Housing');

exports.getAll = () => Housing.find().lean();

exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = ()=> Housing.find().sort({createdAt: -1}).limit(3).lean();

exports.addTenant = (housingId, tenantId) => {

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

//exports.search = (text) => Housing.find({ type: text }).lean(); //if we want to be whole word.
exports.search = (text) => Housing.find({ type: {$regex: text, $options: 'i'}}).lean();  // - DONT WORK"???? if we search case insensitive and not full word

 