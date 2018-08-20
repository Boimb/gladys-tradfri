const {getClient} = require ('./shared');
const subscribe = require ('./subscribe');

/**
 * Initialisation of module
 * @return {*}
 */
module.exports = function () {
  return getClient()
    .then(subscribe);
}
