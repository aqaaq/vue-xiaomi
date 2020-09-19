
const express = require('express');
const router = express.Router();
const Category = require('./model/Category');
const Good = require('./model/Good');
const User = require('./model/User');
const assert = require('http-assert');
module.exports = app => {
    router.get('/:id', async (req, res) => {
        const option = {}
        if (req.model == Category) {
            option.populate = 'parents'
        } else if (req.model == Good) {
            option.populate = 'categories'
        }
        const result = await req.model.findById(req.params.id);
        res.send(result);
    })
    //查询
    router.get('/', async (req, res) => {
        const option = {}
        if (req.model == Category) {
            option.populate = 'parents'
        } else if (req.model == Good) {
            option.populate = 'categories'
        }
        const result = await req.model.find().setOptions(option);
        res.send(result);
    });
    //新建
    router.post('/', async (req, res) => {
        const result = await req.model.create(req.body);
        res.send(result);
    })
    //修改
    router.put('/:id', async (req, res) => {
        //权限验证
        assert(req.user.level > 3, '400', '亲，你没有该权限！')
        const result = await req.model.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
    })
    //删除
    router.delete('/:id', async (req, res) => {
        //权限验证
        assert(req.user.level > 3, '400', '亲，你没有该权限！')
        const result = await req.model.findByIdAndDelete({ _id: req.params.id })
        res.send(result);
    })
    //上传文件
    const multer = require('multer');
    const upload = multer({
        dest: __dirname + '/upload'
    })
    //公共接口  :resourse   动态匹配model
    //lnflection 将 resourse 转化 为类名
    //判断 token 令牌 是否 存在
    app.use('/admin/rest/:resource', require('./middleware/inflection'),
        require('./middleware/judgement')(app), router);
    app.post('/admin/upload', upload.single('file'), async (req, res) => {
        const url = app.get('baseURL');
        res.send(url + '/upload/' + req.file.filename);
    })
    app.use((err, req, res, next) => {
        // console.log(err.statusCode);
        console.log('rest', err);
        res.status(err.statusCode || 500).send(err);
    })
}
