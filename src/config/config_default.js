const dotenv = require('dotenv');

// const dotenv = require('dotenv')
// const buf = Buffer.from('BASIC=basic')
// const config = dotenv.parse(buf) // will return an object
// console.log(typeof config, config) // object { BASIC : 'basic' }

const result = dotenv.config()

if (result.error) {
  throw result.error
}

// console.log(result);

module.exports = result.parsed;