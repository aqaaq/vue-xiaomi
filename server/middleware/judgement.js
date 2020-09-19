const User = require('../model/User');
module.exports = app => {
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    return async (req, res, next) => {
        let token = req.headers.authorization;
        assert(token, 401, '请先登录！');
        token = token.split(' ')[1] || '';
        let id;
        try { id = jwt.verify(token, app.get('private')) }
        catch (err) {
            assert(false, '422', 'jwt错误!重新登录！')
        }
        //储存 user
        req.user = await User.findById(id.id);
        next();
    }
}