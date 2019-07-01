const express = require('express')
const fastify = require('fastify')
const _ = require('lodash')
const fp = require('lodash/fp')
const Hapi = require('@hapi/hapi')
const Koa = require('koa')
const fs = require('fs')


function identifyFramework(instance) {

  const frameworks = {
    express,
    fastify,
    Hapi: {
      value: Hapi,
      invoke: 'server',
    },
    Koa
  }

  const intancesProps = _(frameworks)
    .map(format)
    .map(addInstance)
    .map(addInstanceProps)
    .map(fp.pick(['name', 'instanceProps']))
  .value()


  return intancesProps


  function format(framework, name) {
    return { name, framework }
  }

  function add(name, updater) {
    return (...params) => ({ ...params[0], [name]: updater(...params) })
  }

  function addInstance(options) {

    const { framework } = options

    return {
      ...options,
      instance: createInstance(framework)
    }

    function createInstance(framework) {
      if (typeOf(framework) === 'object') return new framework.value[framework.invoke]()

      return new framework()
    }
  }

  function addInstanceProps(...params) {
    return add('instanceProps', options => getOwnProperties(options.instance))(...params)
  }
}


function typeOf(source) {
  return ({}).toString.call(source).slice(8, -1).toLowerCase()
}

function getOwnProperties(source) {
  const proto = Object.getPrototypeOf(source)

  return [source, proto].map(Object.getOwnPropertyNames).flat()
}


module.exports = identifyFramework