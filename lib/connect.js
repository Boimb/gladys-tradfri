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

  console.debug('gateway :', gateway)

  if (gateway === null) {
    return Promise.reject(new Error(`Could not find any TRADFRI gateway`))
  }


  // TODO try to manage both connections methods host and adress
  let client = new TradfriClient(gateway.host); // create client
  sails.log.debug('Tradfri client created')
  return new Promise((resolve, reject) => {
    Promise.all([IDENTITY, PSK].map(gladys.param.getValue))
      .then(resolve)
      .catch((err) =>{
        // No credentials in DB. Try to authenticate
        sails.log.info(`Could not find ${PSK} & ${IDENTITY} params in db. Tryin to authenticate`);
        authenticate(client)
          .then(resolve)
          .catch(reject)
      })
  })
  .then(([identity, psk])=> {
    sails.log.info('Connecting to tradfri gateway')
    sails.log.debug(`Got credentials: {identity: ${identity}, psk: ${psk}}`)
    client.connect(identity, psk)
    sails.log.info(`Successfully connected `)
    return client
  })
};
