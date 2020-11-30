const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String },
    categories: [
        {
            type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
        }
    ],
    icon: {
        type: String
    },
    version: [{
        image: [
            { type: String }
        ],
        color: { type: String },
        size: [
            {
                name: { type: String },
                price: { type: String, required: true },
                repertory: { type: Number}
            }
        ]
    }],
    desc: { type: String },
    content:{type:String}
})
module.exports = mongoose.model('Good', schema)