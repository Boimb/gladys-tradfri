
const init = require('./lib/init')
const install = require('./lib/install')
const setup = require('./lib/setup')

module.exports = function(sails) {
  gladys.on('ready', function(){
    init();
  });
  return {
    install,
    setup,
    init
  }
};