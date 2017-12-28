# express-async

> Note: that `express-async` supports for express

<br/>

# Usage

```bash

const express = require('express');
const ac = require('express-async');
const app = express();

// add one of async middleware
app.use(ac(async function middleware1(req, res, next) {
  await new Promise((resolve, reject) => {
    setImmediate(() => {
      console.log((new Date()).toLocaleString(), 'middleware1');
      resolve();
    }, 1000);
  });
  await next();
}));

// add multiple async middleware
app.use(ac(async function middleware2(req, res, next) {
  console.log((new Date()).toLocaleString(), 'middleware2');
  await next();
}, async function middleware3(req, res, next) {
  console.log((new Date()).toLocaleString(), 'middleware3');
  try {
    await next();
  } catch (e) {
    console.log('catch Exception below middleware3', e);
    await next(e);
  }
}));

// throw a exception
app.use(ac(async function middleware1(req, res, next) {
  await new Promise((resolve, reject) => {
    setImmediate(() => {
      console.log((new Date()).toLocaleString(), 'middleware4');
      reject(new Error('middleware4 exception'));
    }, 1000);
  });
  await next();
}));

// error handler
app.use(function (err, req, res, next) {
  console.log((new Date()).toLocaleDateString(), 'error handler', err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

```
