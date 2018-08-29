const init = require('./init');
const {discoverGateway} = require('node-tradfri-client')

/**
 * Discover gateway,
 * Authenticate,
 * Store credentials
 * Subscribe to events
 *
 * @return {Promise.<TResult>}
 */
module.exports = function() {
  sails.log.info('------------------------');
  sails.log.info('Setup de gladys-tradfri');
  sails.log.info('------------------------');
  return init(discoverGateway)
};

