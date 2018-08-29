const init = require('./lib/init');
const setup = require('./lib/setup');
const exec = require('./lib/exec');
const {discoverGateway} = require('node-tradfri-client')

module.exports = function(sails) {
  gladys.on('ready', function(){
    init(discoverGateway);
  });

  return {
    setup,
    exec
  }
};