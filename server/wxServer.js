const express = require('express');
const router = express.Router();
const User = require('./model/User');
const jwt = require('jsonwebtoken');
const assert = require('http-assert');
const Cart = require('./model/Cart');
const judgement = require('./middleware/judgement');

router.get('/test', (req, res) => {
    const { username, wxId } = req.body;
    assert(wxId, 407, '用户openid不能为空！');
    res.send('hello 微信小程序！');
})

router.post('/login', async (req, res) => {
    const { username, wxId, avatar } = req.body;
    assert(wxId, 422, '用户openid不能为空！');
    let user = await User.findOne({
        wxId
    });
    // 判断微信用户是否为第一次登录
    if (!user) {
        // 创建用户
        const model = {
            level: 1,
            username,
            wxId,
            password: '123456',
            avatar,
        }
        // 新用户
        const data = await User.create(model);
        // 给新用户添加购物车
        const cartList = await Cart.create({ user: data._id, item: [] });
        //  根据 _id 生成token
        const token = jwt.sign({ id: data._id }, req.app.get('private'));
        res.send({ data, token, cartList });
    } else {
        const token = jwt.sign({ id: user._id }, req.app.get('private'));
        const cartList = await Cart.findOne({ user: user._id }).populate({
            path: 'item.id'
        }).lean();
        res.send({ user, token, cartList });
    }
})

router.post('/load', judgement(), async (req, res) => {
    const cartList = await Cart.findOne({ user: req.user._id }).populate({
        path: 'item.id'
    }).lean();
    res.send({ user: req.user, cartList });
})

router.use((err, req, res, next) => {
    console.log('wx', err.message);
    res.status(err.statusCode || 500).send(err);
})

module.exports = router