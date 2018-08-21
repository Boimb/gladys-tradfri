
const init = require('./lib/init')
const install = require('./lib/install')
const setup = require('./lib/setup')
const connect = require('./lib/connect')

module.exports = function(sails) {
  gladys.on('ready', function(){
    init();
  });
  return {
    install,
    setup,
    init,
    connect
  }
};