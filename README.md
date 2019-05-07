[![Express Logo](https://www.educationalappstore.com/images/upload/mzl.blyuuakw.png)](http://expressjs.com/)

<p align="center">
  <!--
  <a title="CII Best Practices" href="https://bestpractices.coreinfrastructure.org/projects/29"><img src="https://bestpractices.coreinfrastructure.org/projects/29/badge"></a>
  -->
</p>

# express-es7

> Note: develop web application like Koa2 with express

---

## Table of contents

  - [Features](#features)
  - [Migrating](#migrating)
  - [Installation](#installation)
  - [Extra API](#extra-api)
  - [Usage](#usage)
  - [Examples](#examples)

---

## Features

### Support
  * Node >= 7.6.0
  * Express >= 4.x

---

## Installation

express-es7 requires __node v7.6.0__ or higher for ES2015 and async function support.

```
$ npm install express-es7 --save
```
or
```
$ cnpm install express-es7 --save
```

---

## Migrating

### How to migrate `express` to `express-es7`

```bash

const express = require('express');
const app = express();

// ...

// You need only to change "express" to "express-es7", that is all

const express = require('express-es7');
const app = express();

```

---

## Extra API

```bash

// catch unhandledRejection Error
// when using `express` not `express-es7`

const express = require('express');
const { callbackify, compose } = require('express-es7').utils;
const app = express();

// convert an async function to a function 
// and catch unhandledRejection Error
app.use(callbackify(async (req, res, next) => {

}));

app.use(compose(fn1, fn2, fn3, ...));

// catch error
app.use((err, req, res, next) => {
  // ...
});

```

---

## Usage

use ES2017 async functions as middleware of express

```bash

const express = require('express-es7');
const app = express();

// use async functions
// app.use(middleware[, ...middleware]);
app.use(async(req, res, next) => {
  // todo your code
  next();
});

// use router
const apiv2 = express.Router();
apiv2.get('/', async(req, res) => {
  // todo your code
});

app.use('/api/v2', apiv2);

// catch error
app.use((err, req, res, next) => {
  // ...
});

```

---

## Examples
  - [Demo for simple](examples/base)
  - [Demo for middleware](examples/middleware)
  - [Demo for router](examples/router)
