const {discoverGateway, TradfriClient} = require('node-tradfri-client');
const {PSK, IDENTITY} = require('./const');

/**
 * Discover gateway, get credentials from DB and connect.
 * Returns connected client
 *
 * @return {Promise.<TradfriClient>}
 */
module.exports = function (){
  return discoverGateway()
    .then(gateway => {
      const client = new TradfriClient(gateway.host); // create client
      return Promise.all([PSK, IDENTITY].map(gladys.param.getValue)) // get credentials
        .then(([psk, identity])=> {
          if (!psk || !identity) {
            sails.log.info(`Maybe first run of gladys-tradfri module?`);
            sails.log.warn(`Need credentials to connect to Tradfri gateway. Click "config" on module view.`);
            return Promise.reject();
          }
          return client.connect(identity, psk);
        }) // connect to gateway
        .then(() => client) // return client
    })
};
