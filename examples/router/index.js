'use strict';

const express = require('express');

const app = module.exports = express();
const api1 = require('./controllers/api_v1');
const api2 = require('./controllers/api_v2');

// 添加普通路由
app.use('/api/v1', api1);

// 添加异步路由
app.use('/api/v2', api2);

app.get('/', function (req, res) {
  res.send('Hello form root route.');
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
