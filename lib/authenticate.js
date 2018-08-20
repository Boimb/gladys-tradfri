const {TradfriClient} = require('node-tradfri-client');
const shared = require('./shared');

/**
 * @typedef Credentials
 * @property {psk} string
 * @property {identity} string
 */

/**
 * Authenticate on the gateway and get credentials
 * @return {Promise.<Credentials>}
 */
module.exports = function ([gateway, secret]){
  const client = new TradfriClient(gateway.host);
  /**
   * This should resolve in an object with credentials: {PSK: int, identity: int}
   * Like mentionned in the "node-tradfri-client" library, we should store those credentials
   * after first authentication. Logging with the secret is not a good practice,
   * since after some connections, the gateway will forget devices already authenticated.
   * Further authentication should be done with those credentials.
   */
  shared.setClient(client);
  return shared.getClient()
    .then((client) => client.authenticate(secret));
};
