'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ac = require('../../index');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log((new Date()).toLocaleDateString(), '404');

  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  console.info('Listening on ' + bind);
}
