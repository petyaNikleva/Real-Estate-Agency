const User = require('../models/User');

exports.login = () => {
    
}

exports.register = (userData) => User.create(userData);

