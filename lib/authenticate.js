const {TradfriClient} = require('node-tradfri-client');
const shared = require('./shared');
const {TRADFRI_SECRET, IDENTITY, PSK} = require('./const');

/**
 * @typedef Credentials
 * @property {psk} string
 * @property {identity} string
 */

/**
 * Authenticate on the gateway and get credentials
 * @return {Promise.<Credentials>}
 */
module.exports = function (client) {
  return getSecret()
    .then(secret => client.authenticate(secret))
    .then(({identity, psk}) => {
      sails.log.info(`Successfully authenticated on gateway`);
      // store params in DB
      sails.log.info(`Storing credentials in DB`);
      return Promise.all([storeParam(IDENTITY, identity), storeParam(PSK, psk)])
        .then(() => {
          sails.log.info(`Stored identity & psk ind db`)
          sails.log.info(`${IDENTITY} : ${identity}`)
          sails.log.info(`${PSK} : ${psk.value}`)
          return [identity, psk]
        })
    });
};

/**
 * Retrieve TRADFRI_SECRET from db
 * @return Promise<String>
 */
const getSecret = () => {
  sails.log.info('Trying to get TRADFRI_SECRET from DB...');
  return gladys.param.getValue(TRADFRI_SECRET)
    .then(secret => {
      if (secret === TRADFRI_SECRET) {
        // param with default value stop install.
        return Promise.reject(new Error('Invalid TRADFRI_SECRET param'))
      } else  {
        sails.log.info('TRADFRI_SECRET found.');
        return secret;
      }
    })
    .catch((err)=> {
      // rejection because param doesn't exist
      if (err.message !== 'Invalid TRADFRI_SECRET param') {
        sails.log.info(`Could not find ${TRADFRI_SECRET} param in DB. Creating it...`);
        storeParam(TRADFRI_SECRET,TRADFRI_SECRET);
      }
      return Promise.reject(new Error(`You need to enter gateway code in the ${TRADFRI_SECRET} param.`));
    });
};

  /**
 * Store param in db
 * @param name
 * @param value
 * @return Promise {name: string, value: string}
 */
const storeParam = (name, value) => gladys.param.setValue({name, value});