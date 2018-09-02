const connect = require('./connect');
let tradfriClient = null;
const {discoverGateway} = require ('node-tradfri-client')
module.exports = {

  /**
   * Get the TradfriClient
   *
   * @return {Promise.<TradfriClient>}
   */
  getClient: () => tradfriClient === null
    ? discoverGateway()
    .then(connect)
      .then(client => {
        tradfriClient = client
        return tradfriClient
      })
    : Promise.resolve(tradfriClient),

  /**
   * Set the TradfriClient
   * @param client {TradfriClient}
   */
  setClient: client => {
    tradfriClient = client;
  },

  clear: () => {
    tradfriClient = null;
  }
};
