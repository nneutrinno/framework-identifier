const _ = require('lodash')
const fp = require('lodash/fp')

function identifyFramework(instance) {
  const instanceProps = Object.getOwnPropertyNames(instance)

  const instancesPropsFromFrameworks = require('./instancesPropsFromFrameworks.json')


  const name = _(instancesPropsFromFrameworks)
    .map(addCommonInstanceProps)
    .map(addAmountCommonInstanceProps)
    .sort(orderByAmountCommonInstances)
    .map(fp.pick(['name', 'amountCommonInstanceProps']))
    .first().name

  return _(name).words().join('-').toLowerCase()


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
  function addCommonInstanceProps(...params) {
    return add(
      'commonInstanceProps',
      options => _.intersection(options.instanceProps, instanceProps)
    )(...params)
  }
  function addAmountCommonInstanceProps(...params) {
    return add(
      'amountCommonInstanceProps',
      options => options.commonInstanceProps.length
    )(...params)
  }

  function orderByAmountCommonInstances(a, b) {
    return b.amountCommonInstanceProps - a.amountCommonInstanceProps
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