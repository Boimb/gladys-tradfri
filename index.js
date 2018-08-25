const init = require('./lib/init');
const setup = require('./lib/setup');
const exec = require('./lib/exec');

module.exports = function(sails) {
  gladys.on('ready', function(){
    init();
  });

  return {
    setup,
    init,
    exec
  }
};