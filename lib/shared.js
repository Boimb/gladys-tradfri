const connect = require('./connect');
let tradfriClient = null;

module.exports = {

  /**
   * Get the TradfriClient
   *
   * @return {Promise.<TradfriClient>}
   */
  getClient: () => tradfriClient === null
    ? connect()
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
