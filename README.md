<p align="center">
  <a href="http://expressjs.com/">
    <img alt="Express" src="https://imgsa.baidu.com/exp/w=480/sign=f7c149382d1f95caa6f593bef9167fc5/0824ab18972bd40755319fbb73899e510eb30985.jpg" width="400"/>
  </a>
</p>
<p align="center">
  <!--
  <a title="CII Best Practices" href="https://bestpractices.coreinfrastructure.org/projects/29"><img src="https://bestpractices.coreinfrastructure.org/projects/29/badge"></a>
  -->
</p>

# express-async

> Note: `express-async` for express using ES2017 async functions

<br/>

## Features

### Support
  * Node >= 7.7.3
  * Express >= 4.x

<br/>

## Table of contents

  - [Usage](#Usage)

---

## Installation

express-async requires __node v7.6.0__ or higher for ES2015 and async function support.

```
$ npm install express-async
```

<br/>

## Usage

use ES2017 async functions as middleware of express

```bash

const express = require('express');
const ea = require('express-async');
const app = express();

// 添加异步方法
// app.use(ea(middleware[, ...middleware]));
app.use(ea(async function (req, res, next) {
  // 添加您的逻辑代码
  await next();
}));

```
[Demo 1](examples/easy-middleware)
[Demo 2](examples/complicated-middleware)
