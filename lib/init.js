const shared = require ('./shared');
const subscribe = require ('./subscribe');

/**
 * Initialisation of module
 * @return {*}
 */
module.exports = function () {
  return shared.getClient()
    .catch(err => {
      // Clear client
      shared.clear()
      sails.log.error(err)
    });
};
