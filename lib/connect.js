const {discoverGateway, TradfriClient} = require('node-tradfri-client');
const {PSK, IDENTITY} = require('./const');

/**
 * Discover gateway, get credentials from DB and connect.
 * Returns connected client
 *
 * @return {Promise.<TradfriClient>}
 */
module.exports = function (){
  sails.log.info('Looking for Tradfri gateway')
  return discoverGateway()
  .then(gateway => {
    sails.log.info('Tradfri gateway found')
    const client = new TradfriClient(gateway.host); // create client
    sails.log.info('Tradfri client created')
    return Promise.all([PSK, IDENTITY].map(gladys.param.getValue)) // get credentials
      .then(([psk, identity])=> {
        if (!psk || !identity) {
          sails.log.info(`Maybe first run of gladys-tradfri module?`);
          sails.log.warn(`Need credentials to connect to Tradfri gateway. Click "config" on module view.`);
          return Promise.reject();
        }
        sails.log.info('Tryin to connect to tradfri gateway')
        return client.connect(identity, psk);
      }) // connect to gateway
      .then(() => {
        return client;
      })
  })
};
