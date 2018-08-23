const {discoverGateway, TradfriClient} = require('node-tradfri-client');
const {PSK, IDENTITY} = require('./const');
const authenticate = require('./authenticate');
const subscribe = require ('./subscribe');

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
      // TODO try to manage both connections methods host and adress
      let client = new TradfriClient(gateway.host); // create client
      sails.log.info('Tradfri client created')
      return new Promise((resolve, reject) => {
        Promise.all([IDENTITY, PSK].map(gladys.param.getValue))
          .then(resolve)
          .catch(err =>{
            // No credentials in DB. Try to authenticate
            sails.log.info(`Could not find ${PSK} & ${IDENTITY} params in db. Tryin to authenticate`);
            authenticate(client)
              .then(resolve)
              .catch(reject)
          })
      })
        .then(([identity, psk])=> {
          sails.log.info('Connecting to tradfri gateway')
          return client.connect(identity, psk);
        }) // connect to gateway
        .then(() => {
          sails.log.info(`Successfully connected `)
          subscribe(client)
          return client
        })
    })
};
