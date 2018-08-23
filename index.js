const init = require('./lib/init');
const setup = require('./lib/setup');

module.exports = function(sails) {
  gladys.on('ready', function(){
    init();
  });

  return {
    setup,
    init
  }
};