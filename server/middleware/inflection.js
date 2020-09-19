//将 url 转换 类名

module.exports = (req, res, next) => {
        console.log(req.params);
        const model = require('inflection').classify(req.params.resource);
        req.model = require(`../model/${model}`);
        next();
}