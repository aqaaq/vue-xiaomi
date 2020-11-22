
const express = require('express');
const router = express.Router();
const Category = require('./model/Category');
const Good = require('./model/Good');
const User = require('./model/User');
const assert = require('http-assert');


const { restGetById, restGet, restPost, restPut, restDelete ,errorHandler} = require('./controller/rest')
module.exports = app => {
    router.get('/:id', restGetById)
    //查询
    router.get('/', restGet);
    //新建
    router.post('/', restPost)
    //修改
    router.put('/:id', restPut)
    //删除
    router.delete('/:id', restDelete)
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

    // 上传图片
    app.post('/admin/upload', upload.single('file'), async (req, res) => {
        const url = app.get('baseURL');
        res.send(url + '/upload/' + req.file.filename);
    })
    // 错误处理函数
    app.use(errorHandler)
}
