const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, required: true },
    address: {
        name: String,
        first: String,
        last: String,
        phone: String,
    },
    item: [
        {
            name: { type: String },
            size: { type: String },
            color: { type: String },
            price: { type: String },
            num: { type: Number },
            icon: { type: String }
        }
    ],
    payType:String,
    pay:Boolean,
    price:Number,
    endTime:Number,
}, { timestamps: { createAt: 'createAt', updatedAt: 'updated' } });
module.exports = mongoose.model('Order', schema);