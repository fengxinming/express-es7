<p align="center">
  <a href="http://expressjs.com/">
    <img alt="Express" src="https://imgsa.baidu.com/exp/w=480/sign=f7c149382d1f95caa6f593bef9167fc5/0824ab18972bd40755319fbb73899e510eb30985.jpg" width="400"/>
  </a>
</p>
[![npm package](https://nodei.co/npm/request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)
[![Build status](https://img.shields.io/travis/request/request/master.svg?style=flat-square)](https://travis-ci.org/request/request)
[![Coverage](https://img.shields.io/codecov/c/github/request/request.svg?style=flat-square)](https://codecov.io/github/request/request?branch=master)
[![Coverage](https://img.shields.io/coveralls/request/request.svg?style=flat-square)](https://coveralls.io/r/request/request)
[![Dependency Status](https://img.shields.io/david/request/request.svg?style=flat-square)](https://david-dm.org/request/request)
[![Known Vulnerabilities](https://snyk.io/test/npm/request/badge.svg?style=flat-square)](https://snyk.io/test/npm/request)
[![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/request/request?utm_source=badge)

# express-es7

> Note: `express-es7` for express using ES2017 async functions

---

## Table of contents

  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Examples](#examples)

<br/>

## Features

### Support
  * Node >= 7.7.3
  * Express >= 4.x

<br/>

## Installation

express-es7 requires __node v7.6.0__ or higher for ES2015 and async function support.

```
$ npm install express-es7
```

<br/>

## Usage

use ES2017 async functions as middleware of express

```bash

const express = require('express');
const ee = require('express-es7');
const app = express();

// 添加异步方法
// app.use(ee(middleware[, ...middleware]));
app.use(ee(async(req, res, next) => {
  // 添加您的逻辑代码
  await next();
}));

// 添加路由
const apiv2 = ee.Router();
apiv2.get('/', async(req, res) => {
  // 添加您的逻辑代码
});

app.use('/api/v2', apiv2.callback());

```

<br/>

## Examples
  - [Demo for middleware](examples/easy-middleware)
  - [Demo for complicated middleware](examples/complicated-middleware)
  - [Demo for router](examples/router)
