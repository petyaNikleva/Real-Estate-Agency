const Housing = require('../models/Housing');

exports.getAll = () => Housing.find().lean();

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = ()=> Housing.find().sort({createdAt: -1}).limit(3).lean();