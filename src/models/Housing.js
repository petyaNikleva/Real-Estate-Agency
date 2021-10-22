const mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Apatment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    tenants: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'User'
    }
]   ,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

housingSchema.method('getTenants', function() {
    return this.tenants.map(x => x.name).join(', ')
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;

