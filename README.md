<p align="center">
  [![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)
</p>

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
  - [Usage](#usage)
  - [Examples](#examples)

<br/>

## Features

### Support
  * Node >= 7.6.0
  * Express >= 4.x

<br/>

## Installation

express-es7 requires __node v7.6.0__ or higher for ES2015 and async function support.

```
$ npm install express-es7 --save
```
or
```
$ cnpm install express-es7 --save
```

<br/>

## Migrating

### How to migrate `express` to `express-es7`

```bash

const express = require('express');
const app = express();

// ...

// You need only to change "express" to "express-es7", that's all

const express = require('express-es7');
const app = express();

```

<br/>

## Usage

use ES2017 async functions as middleware of express

```bash

const express = require('express-es7');
const app = express();

// use async functions
// app.use(middleware[, ...middleware]);
app.use(async(req, res, next) => {
  // todo your code
  await next();
});

// use router
const apiv2 = express.Router();
apiv2.get('/', async(req, res) => {
  // todo your code
});

app.use('/api/v2', apiv2);

```

<br/>

## Examples
  - [Demo for simple](examples/base)
  - [Demo for middleware](examples/middleware)
  - [Demo for router](examples/router)
