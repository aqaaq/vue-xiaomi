const Category = require('../model/Category');
const Good = require('../model/Good');
const User = require('../model/User');
const assert = require('http-assert');
const { errorHandler } = require('./handle');

module.exports = {
    async restGetById(req, res) {
        const option = {}
        if (req.model == Category) {
            option.populate = 'parents'
        } else if (req.model == Good) {
            option.populate = 'categories'
        }
        const result = await req.model.findById(req.params.id);
        res.send(result);
    },
    async restGet(req, res) {
        const option = {}
        if (req.model == Category) {
            option.populate = 'parents'
        } else if (req.model == Good) {
            option.populate = 'categories'
        }
        const result = await req.model.find().setOptions(option);
        res.send(result);
    },
    async restPost(req, res) {
        const result = await req.model.create(req.body);
        res.send(result);
    },
    async restPut(req, res) {
        //简单权限验证
        assert(req.user.level > 3, '400', '亲，你没有该权限！')
        const result = await req.model.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    },
    async restDelete(req, res) {
        //简单权限验证
        assert(req.user.level > 3, '400', '亲，你没有该权限！')
        const result = await req.model.findByIdAndDelete({ _id: req.params.id })
        res.send(result);
    },
    errorHandler(err, req, res, next) {
        // console.log(err.statusCode);
        console.log('rest', err);
        res.status(err.statusCode || 500).send(err);
    }
}