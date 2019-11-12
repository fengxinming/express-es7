'use strict';

const express = require('express');
const methods = require('methods').concat('all');
const use = require('./lib/use');
const capture = require('./lib/capture');
const batch = require('./lib/batch');

function prefix(name) {
  return `__$${name}`;
}

function createApplication() {
  const app = express();
  const originalName = prefix('use');
  app[originalName] = app.use;
  app.use = use(app, originalName);
  return app;
}

module.exports = createApplication;

Object.assign(createApplication, express);

const { Router } = express;

createApplication.Router = function (options) {
  const router = Router(options);
  const originalName = prefix('use');
  router[originalName] = router.use;
  router.use = use(router, originalName);
  methods.forEach((method) => {
    const newName = prefix(method);
    router[newName] = router[method];
    router[method] = use(router, newName);
  });
  return router;
};

createApplication.capture = capture;
createApplication.batch = batch;
