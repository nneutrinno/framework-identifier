# Framework Identifier

A package to detect which node web framework belongs that server, app or api instance.

## Install

### [NPM](http://npmjs.org/)
- Use: `require('framework-identifier')`
- Install: `npm install --save framework-identifier`

### [YARN](https://yarnpkg.com/)
- Use: `require('framework-identifier')`
- Install: `yarn add framework-identifier`

## Usage

### Example

``` javascript
const frameworkIdentifier = require('framework-identifier')
const fastify = require('fastify')
const express = require('express')
const Hapi = require('@hapi/hapi')
const Koa = require('koa')



const fastifyApp = fastify()
const expressApp = express()
const koaApp = new Koa()
const hapiApp = Hapi.server()

console.log(frameworkIdentifier(fastifyApp)) // fastify
console.log(frameworkIdentifier(expressApp)) // express
console.log(frameworkIdentifier(koaApp)) // koa
console.log(frameworkIdentifier(hapiApp)) // hapi
```


## License

Licensed under [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://opensource.org/licenses/MIT)

