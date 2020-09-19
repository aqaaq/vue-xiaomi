const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    item: [{
        id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Good' },
        num: { type: Number },
        version: { type: Number },
        size: { type: Number },
        select: { type: Boolean, default: true },
    }]
})
module.exports = mongoose.model('Cart', schema);