const frameworkIdentifier = require('../build/')
const fastify = require('fastify')
const express = require('express')
const Hapi = require('@hapi/hapi')
const Koa = require('koa')
const { expect } = require('chai')



describe('Framework Identifier', () => {
  ;[
    { name: 'express', instance: express() },
    { name: 'fastify', instance: fastify() },
    { name: 'hapi', instance: Hapi.server() },
    { name: 'koa', instance: new Koa() },
  ].forEach(createTest)

  function createTest({ name, instance }) {
    it(`should be ${name}`, () => {
      expect(
        frameworkIdentifier(instance)
      )
      .to.be.a('string')
      .to.be.equal(name)
    })
  }
})