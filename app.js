const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err);
});

const { PORT = 3000 } = process.env;

const { NOT_FOUND_ERROR } = require('./utils/constants');

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64e89d9c013056d35ee2a551',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Запрошен несуществующий роут' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
