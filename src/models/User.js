const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requered: true
    }
});

userSchema.pre('save', function(next){
    
})

const User = mongoose.model('User', userSchema);

module.exports = User;