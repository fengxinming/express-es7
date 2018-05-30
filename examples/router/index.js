'use strict';

const express = require('express');
const api1 = require('./controllers/api_v1');
const api2 = require('./controllers/api_v2');

const app = module.exports = express();

// 添加普通路由
app.use('/api/v1', api1);

// 添加异步路由
app.use('/api/v2', api2);

app.get('/', (req, res) => {
  res.send('Hello form root route.');
});

app.use((err, req, res, next) => {
  const error = (req.user || {}).message + err.message;
  res.send(`${error}<br/>catch a error.`);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
