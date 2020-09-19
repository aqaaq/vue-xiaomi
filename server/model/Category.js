const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parents:
        [{
            type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
        }],
    sizes: [{
        type: String
    }],
    //摆放顺序
    index: { type:Number }
})
module.exports = mongoose.model('Category', schema);