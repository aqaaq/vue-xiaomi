const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
app.use(compression());
const bodyParser = require('body-parser');
require('./db/db');
app.use(express.json());
app.use(require('cors')());
app.set('baseURL', 'http://localhost:3000');


// app.get('/', async (req, res) => {
//     var callback = req.query.callback;
//     res.setHeader('Content-type02','html/text')
//     res.send(callback+"(123)");
// })

//托管web
app.use('/', express.static(__dirname + '/web'));
//托管admin
app.use('/admin',express.static(__dirname + '/admin'));

app.use('/upload/', express.static(__dirname + '/upload'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.set('private', 'abc');


require('./router')(app)
require('./test')(app);

// 微信小程序路由
app.use('/wx',require('./wxServer'));

app.listen('3000', () => {
    console.log(' server run loaclhost:3000')
})