const shared = require ('./shared');
const subscribe = require ('./subscribe')


/**
 * Initialisation of module
 * @return {*}
 */
module.exports = function () {
  sails.log.info('------------------------');
  sails.log.info('Init de gladys-tradfri');
  sails.log.info('------------------------');
  shared.clear();
  shared.getClient()
    .then(subscribe)
    .catch((err) => {
      // Clear client
      shared.clear();
      // Propagate error
      return Promise.reject(err)
    });
};
