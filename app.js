const getInstancesPropsFromFrameworks = require('./getInstancesPropsFromFrameworks')
const writeJSON = require('./writeJSON')
const frameworkIdentifier = require('./build/frameworkIdentifier')
const fastify = require('fastify')

async function main() {
  const instancesProps = getInstancesPropsFromFrameworks()

  try {
    await writeJSON({
      source: instancesProps,
      fileName: './build/instancesPropsFromFrameworks.json'
    })

    if (test() !== 'fastify') throw new Error('Error')

    console.log('Success')
  } catch (err) {
    console.log('Can\'t build')
  }

}



function test() {
  return frameworkIdentifier(fastify())
}


main()