const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://bentabor:Bent1998@zooapi-database.yufht.mongodb.net/zoo-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const zooRouter = require('./routes/zoo.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/zoo', zooRouter);



module.exports = app;
