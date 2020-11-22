
const express = require('express');
const router = express.Router();
// handler
const { getNav, getGoods, getAds, getHotGoods, findUser,
     createUser, findUserById, updateCart, login, addAddress ,
     createOrder,findOrderByUser,findOrderByid,editOrderPayType,
     deleteOrder,orderPage,errorHandler} = require('./controller/handle');

module.exports = async app => {
    //header nav接口
    router.get('/test/:name', getNav)
    //goods详情
    router.get('/goods/:id', getGoods)
    //根据广告名查询
    router.get('/ads/:str', getAds)
    //小米闪购广告接口
    router.get('/test', getHotGoods)
    //查询用户是否存在
    router.get('/name/:name', findUser)
    //创建用户
    router.post('/users', createUser)
    //查询用户
    router.get('/users/:id', findUserById)
    //修改 购物车数据
    router.put('/cart/:id', updateCart)
    //登录
    router.post('/login', login)
    //添加用户地址
    router.post('/adress',addAddress)
    //创建订单
    router.post('/order',createOrder)
    //根据user 查询订单
    router.get('/order/:id', findOrderByUser)
    //根据id 查询订单
    router.get('/orderById/:id',findOrderByid)
    //付款修改订单状态
    router.put('/order/:id',editOrderPayType )
    //删除订单
    router.delete('/order/:id',deleteOrder)
    //订单分页
    router.get('/allOrder/:total', orderPage)
    // 挂载路由
    app.use('/admin/test', router);
    // 错误函数
    app.use(errorHandler);
}

