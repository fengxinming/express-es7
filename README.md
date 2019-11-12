[![Express Logo](https://www.educationalappstore.com/images/upload/mzl.blyuuakw.png)](http://expressjs.com/)

# express-es7

> Note: Safely use async middleware in express.

---

## Table of contents

  - [Installation](#installation)
  - [Migrating](#migrating)
  - [Extra API](#extra-api)
  - [Usage](#usage)
  - [Examples](#examples)

---

## Installation

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

// use "express-es7" instead of "express", that is all

const express = require('express-es7');
const app = express();

```

---

## Extra API

```js

// catch unhandledRejection error
// when using `express` not `express-es7`

const express = require('express');
const { capture, batch } = require('express-es7');
const app = express();

// avoid unhandledRejection error
app.use(capture(async (req, res, next) => {

}));

// batch processing
app.use(batch(middleware1, middleware2, middleware3, ...));

// catch error
app.use((err, req, res, next) => {
  // ...
});

```

---

## Usage

use ES2017 async functions as middleware with express

```bash

const express = require('express-es7');
const app = express();

// use async functions
app.use(async(req, res, next) => {
  // todo your code
  next();
});
// app.use(middleware[, ...middleware]);

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
  - [demo](examples)
