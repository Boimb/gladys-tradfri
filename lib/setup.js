const {discoverGateway} = require('node-tradfri-client');
const authenticate = require('./authenticate');
const install = require('./install');
const subscribe = require('./subscribe');
const {TRADFRI_SECRET, PSK, IDENTITY} = require('./const');
const shared = require('./shared');

/**
 * Discover gateway,
 * Authenticate,
 * Store credentials
 * Subscribe to events
 *
 * @return {Promise.<TResult>}
 */
module.exports = function() {
  sails.log.info('setup gladys-tradfri');
  return Promise.all([discoverGateway(), getSecret()])
    .then(authenticate)
    .then(({identity, psk}) => {
      // store params in DB
      return Promise.all([storeParam(PSK, psk), storeParam(IDENTITY, identity)])
        .then(() => shared.getClient())
        .then(client => client.connect(identity, psk))
    })
    .then(subscribe);
};

/**
 * Retrieve TRADFRI_SECRET from db
 * @return Promise<String>
 */
const getSecret = () => gladys.param.getValue(TRADFRI_SECRET)
  .then(value => {
    // if no TRADFRI_SECRET param set we create it
    if (!value || value === TRADFRI_SECRET) {
      install()
        .catch(() => sails.log.error('OUPS, could not create the TRADFRI_SECRET param in db :/'));
      return Promise.reject();
    } else  {
      return value;
    }
  })
  .catch(()=> {
    sails.log.warn(`You didn't fill the '${TRADFRI_SECRET}' param with the code available on the Tradfri gateway`);
    return Promise.reject();
  })

/**
 * Store param in db
 * @param name
 * @param value
 * @return Promise {name: string, value: string}
 */
const storeParam = (name, value) => gladys.param.setValue({name, value});