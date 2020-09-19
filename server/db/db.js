const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/xiaomi",
    { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

