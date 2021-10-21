const Housing = require('../models/Housing');

exports.create = (housingData) => Housing.create(housingData);