
const express = require('express');
const router = express.Router();
const Category = require('./model/Category');
const Good = require('./model/Good');
const Ad = require('./model/Ad');
const User = require('./model/User');
const assert = require('http-assert');
const jwt = require('jsonwebtoken');
const Cart = require('./model/Cart');
const Order = require('./model/Order');
const { find } = require('./model/Category');

module.exports = async app => {
    //header nav接口
    router.get('/test/:name', async (req, res) => {
        let num = 24;
        if (req.params.name === 'header-nav') {
            num = 8;
        }
        const parent = await Category.findOne({ name: req.params.name }) || {};
        const data = await Category.aggregate([
            {
                $match: { parents: parent._id },
            },
            {
                $sort: {
                    index: 1,
                }
            },
            {
                $lookup: {
                    from: 'goods',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newList'
                }
            },
            {
                $addFields: {
                    newList: {
                        $slice: ["$newList", num]
                    }
                },

            }
        ])
        res.send(data)
    })
    //goods详情
    router.get('/goods/:id', async (req, res) => {
        const data = await Good.findById(req.params.id);
        res.send(data);
    })
    //根据广告名查询
    router.get('/ads/:str', async (req, res) => {
        const name = req.params.str;
        const data = await Ad.findOne({ name });
        res.send(data);
    })
    //小米闪购广告接口
    router.get('/test', async (req, res) => {
        const parent = await Category.findOne({ name: '小米闪购' });
        const data = await Good.find().where({ categories: parent }).lean()
        // const data = await Good.find({}).where({categories:parent});
        res.send(data)
    })
    //查询用户是否存在
    router.get('/name/:name', async (req, res) => {
        const user = await User.findOne({ username: req.params.name });
        assert(!user, 422, '改用户名已经注册！');
    })
    //创建用户
    router.post('/users', async (req, res) => {
        req.body.level = 1;
        const data = await User.create(req.body);
        await Cart.create({ user: data._id, item: [] });
        res.send(data);
    })
    //查询用户
    router.get('/users/:id', async (req, res) => {
        const data = await User.findById(req.params.id);
        res.send(data);
    })
    //修改 购物车数据
    router.put('/cart/:id', async (req, res) => {
        //    const goods = await Cart.findOneAndUpdate({ user: '5f3e500c9acb0418307f41f5' }, {});
        const user = await Cart.findOneAndUpdate
            ({ user: req.params.id }, req.body);
        const data = await Cart.findOne({ user: req.params.id }).populate({ path: 'item.id' });
        res.send(data ? data.item : []);
    })
    router.post('/login', async (req, res) => {
        const user = req.body;
        let data = await User.findOne({ username: user.name }).select('+password');
        //用户名不存在
        assert(data, 422, '用户不存在');
        if (data.password === user.password) {
            data = await User.findOne({ username: user.name })
            // 登陆成功
            // 生成token
            const token = jwt.sign({ id: data._id }, app.get('private'));
            // 得到 购物车数据
            const cartList = await Cart.findOne({ user: data._id }).populate({
                path: 'item.id'
            }).lean();
            res.status(200).send({
                message: '登录成功！', token,
                data,
                cartList: cartList ? cartList.item : []
            });
        } else {
            assert(!1, 422, '用户名或密码错误！');
        }
    })
    //添加用户地址
    router.post('/adress', async (req, res) => {
        const data = await User.updateOne({ _id: req.body._id }, {
            $set: {
                address: req.body.address,
            }
        })
        const per = await User.findOne({ _id: req.body._id });
        res.send(per);
    })
    //创建订单
    router.post('/order', async (req, res) => {
        const data = await Order.create(req.body);
        res.send(data);
    })
    //根据user 查询订单
    router.get('/order/:id', async (req, res) => {
        // await Order.deleteMany({});
        const data = await Order.find({ user: req.params.id }).sort('-createdAt');
        res.send(data);
    })
    //根据id 查询订单
    router.get('/orderById/:id', async (req, res) => {
        const data = await Order.findById(req.params.id)
        res.send(data);
    })
    //付款修改订单状态
    router.put('/order/:id', async (req, res) => {
        const data = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        res.send(data);
    })
    router.get('/data-test', async (req, res) => {
        //test
        const data = await Ad.find();
        var list = data.map(val => {
            for (let i = 0; i < val.ads.length; i++) {
                var object = val.ads[i];
                object.image = object.image ?
                    object.image.replace('http://localhost:3000', 'http://47.93.127.194:3005') :
                    object.image
            }
            return val
        })

        res.send(list);
    })
    app.use('/admin/test', router);
    app.use((err, req, res, next) => {
        console.log('test', err)
        res.status(err.statusCode || 500).send(err);
    })
}

