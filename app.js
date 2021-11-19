const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorer = require('./middlewares/errorer');

const { PORT = 3001, HOST = 'mongodb://localhost:27017/vrubel' } = process.env;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
    const error = new Error('Страница не найдена.');
    error.statusCode = 404;
    next(error);
  });
  app.use(errorLogger);
  app.use(errors());
  app.use(errorer);

mongoose.connect(HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

app.listen(PORT, () => {console.log(123)});
