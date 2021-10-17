
const jwt = require('../utils/jwt');
const User = require('../models/User');
const { JWT_SECRET } = require('../constants');


exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password.')
    }

    let isValid = await user.validatePassword(password);
    if (!isValid) {
        throw new Error('Invalid username or password.')
    }

    // create token
    let payload = {
        _id: idesr._id,
        name: user.name,
        username: user.username
    };

    let token = jwt.sign(payload, JWT_SECRET);

}

exports.register = (userData) => User.create(userData);

