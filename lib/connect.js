const {TradfriClient} = require('node-tradfri-client');
const {PSK, IDENTITY} = require('./const');
const authenticate = require('./authenticate');

/**
 * Discover gateway, get credentials from DB and connect.
 * Returns connected client
 *
 * @return {Promise.<TradfriClient>}
 */
module.exports = function (gateway){
  if (gateway === null) {
    return Promise.reject(new Error(`Could not find any TRADFRI gateway`))
  }


  // TODO try to manage both connections methods host and adress
  let client = new TradfriClient(gateway.host); // create client
  sails.log.debug('Tradfri client created')
  return Promise.all([IDENTITY, PSK].map(gladys.param.getValue))
    .catch((err) =>{
      // No credentials in DB. Try to authenticate
      sails.log.info(`Could not find ${PSK} & ${IDENTITY} params in db. Tryin to authenticate`);
      return authenticate(client)
    })
    .then(([identity, psk])=> {
      sails.log.info('Connecting to tradfri gateway')
      sails.log.debug(`Got credentials: {identity: ${identity}, psk: ${psk}}`)
      client.connect(identity, psk)
      sails.log.info(`Successfully connected `)
      sails.log.info(`typeof : `, typeof client)
      return client
    })
};
