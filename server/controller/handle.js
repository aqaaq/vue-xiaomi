const Category = require('../model/Category');
const Good = require('../model/Good');
const Ad = require('../model/Ad');
const User = require('../model/User');
const assert = require('http-assert');
const jwt = require('jsonwebtoken');
const Cart = require('../model/Cart');
const Order = require('../model/Order');

module.exports = {
    // nav
    async getNav(req, res) {
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
    },

    async getGoods(req, res) {
        const data = await Good.findById(req.params.id);
        res.send(data);
    },
    async getAds(req, res) {
        const name = req.params.str;
        const data = await Ad.findOne({ name });
        res.send(data);
    },
    async getHotGoods(req, res) {
        const parent = await Category.findOne({ name: '小米闪购' });
        const data = await Good.find().where({ categories: parent }).lean()
        // const data = await Good.find({}).where({categories:parent});
        res.send(data)
    },
    async findUser(req, res) {
        const user = await User.findOne({ username: req.params.name });
        assert(!user, 422, '改用户名已经注册！');
    },
    async createUser(req, res) {
        req.body.level = 1;
        const data = await User.create(req.body);
        await Cart.create({ user: data._id, item: [] });
        res.send(data);
    },
    async findUserById(req, res) {
        const data = await User.findById(req.params.id);
        res.send(data);
    },
    // 修改购物车数据
    async updateCart(req, res) {
        const user = await Cart.findOneAndUpdate
            ({ user: req.params.id }, req.body);
        const data = await Cart.findOne({ user: req.params.id }).populate({ path: 'item.id' });
        res.send(data ? data.item : []);
    },
    async login(req, res) {
        const user = req.body;
        let data = await User.findOne({ username: user.name }).select('+password');
        //用户名不存在
        assert(data, 422, '用户不存在');
        if (data.password === user.password) {
            data = await User.findOne({ username: user.name })
            // 登陆成功
            // 生成token
            const token = jwt.sign({ id: data._id }, req.app.get('private'));
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
    },
    async addAddress(req, res) {
        const data = await User.updateOne({ _id: req.body._id }, {
            $set: {
                address: req.body.address,
            }
        })
        const per = await User.findOne({ _id: req.body._id });
        res.send(per);
    },
    async createOrder(req, res) {
        const data = await Order.create(req.body);
        res.send(data);
    },
    async findOrderByUser(req, res) {
        // await Order.deleteMany({});
        const data = await Order.find({ user: req.params.id }).sort('-createdAt');
        res.send(data);
    },

    async findOrderByid(req, res) {
        const data = await Order.findById(req.params.id)
        res.send(data);
    },
    async editOrderPayType(req, res) {
        const data = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        res.send(data);
    },
    async deleteOrder(req, res) {
        const data = await Order.findByIdAndDelete(req.params.id);
        res.send(data);
    },
    async orderPage(req, res) {
        let len = {};
        if (req.params.total == 0) {
            len = await Order.find({});
        }
        const result = await Order.find({}).sort({ _id: -1 }).limit(10).skip(req.params.total * 10);
        res.send({ result, length: len.length });
    },
    async searchHandler(req, res) {
        // 关键词 和 分类名称
        const keywords = req.query.keywords;
        let list01 = [], list02 = [];
        list01 = await Good.find({
            name: new RegExp(`${keywords}`, 'i'),
        }),
            category = await Category.findOne({
                name: keywords
            });
        if (category) {
            list02 = await Good.find({}).where({
                categories: category._id
            });
            list01 = list01.concat(list02);
        }
        res.send(list01)
    },
    errorHandler(err, req, res, next) {
        console.log('test', err)
        res.status(err.statusCode || 500).send(err);
    }
}