const connect = require('./connect');
let tradfriClient = null;

module.exports = {

  getClient: () => tradfriClient === null
    ? connect()
    : Promise.resolve(tradfriClient),

  setClient: client => {
    tradfriClient = client;
    return Promise.resolve(tradfriClient);
  },
  clear: () => {tradfriClient = null}
};
