const connect = require('./connect');
let tradfriClient = null;

module.exports = {

  getClient: () => tradfriClient === null
    ? connect().then(client => {
      tradfriClient = client
      return tradfriClient
    })
    : Promise.resolve(tradfriClient),

  setClient: client => {
    tradfriClient = client;
  },

  clear: () => {
    tradfriClient = null;
  }
};
