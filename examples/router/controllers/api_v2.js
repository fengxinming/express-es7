'use strict';

const express = require('../../../index');

const apiv2 = express.Router();

apiv2.get('/', async (req, res) => {
  req.user = {
    message: `Start${req.url}<br/>`
  };
  await new Promise((resolve) => {
    setTimeout(() => {
      req.user.message += 'APIv2 make an async request<br/>';
      resolve();
    }, 2000);
  });
  req.user.message += 'APIv2 an async request has been finished<br/>';
  req.user.message += 'Hello from APIv2 root route.';
  res.send(req.user.message);
});

apiv2.get('/users', (req, res, next) => {
  req.user = {
    message: `Start APIv2 callback1 ${req.url}<br/>`
  };
  next();
}, async (req, res, next) => {
  req.user.message += 'APIv2 callback2<br/>';
  await next();
}, async (req, res, next) => {
  req.user.message += 'List of APIv2 users.';
  res.send(req.user.message);
});

module.exports = apiv2;
