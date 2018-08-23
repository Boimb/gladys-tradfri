const init = require('./init');

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
  return init()
};

