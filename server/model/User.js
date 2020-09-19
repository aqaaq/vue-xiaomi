const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    address: [{
        name: String,
        first: String,
        last: String,
        phone: String
    }],
    //管理员等级
    level: { type: Number, default: 1, max: 5, min: 1 },
})
module.exports = mongoose.model('User', schema);