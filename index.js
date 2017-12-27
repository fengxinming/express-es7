'use strict';

const flatten = require('array-flatten');
const createError = require('http-errors');

function convertError(err) {
  const opts = !err.status ? { status: 500 } : {};
  return createError(err, opts);
}

function convertMiddleware(fn) {
  try {
    return function(req, res, next) {
      Promise.resolve(fn(req, res)).then(() => {
        next();
      }, (err) => {
        next(convertError(err));
      });
    };
  } catch (err) {
    return function(req, res, next) {
      next(convertError(err));
    };
  }
}

function createApplication() {
  const middlewares = flatten(Array.from(arguments));
  let index = -1;
  middlewares.map((middleware) => {
    return function(context, next) {
      let index = -1
      return dispatch(0);

      function dispatch(i) {
        if (i <= index) {
          return Promise.reject(new Error('next() called multiple times'));
        }
        index = i;
        let fn = middleware[i];
        if (i === middleware.length) {
          fn = next;
        }
        if (!fn) {
          return Promise.resolve();
        }
        try {
          return Promise.resolve(fn(context, function next() {
            return dispatch(i + 1);
          }));
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
  });
}

module.exports = createApplication;
