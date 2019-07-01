const fs = require('fs')

async function writeJSON({ source, fileName }) {
  return fs.promises.writeFile(fileName, JSON.stringify(source, null, 2))
}


module.exports = writeJSON