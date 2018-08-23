const updateDevice = require('./updateDevice');

module.exports = function (client) {
  sails.log.info('------------------------');
  sails.log.info(`Subscribing to device update`);
  client
    .on("device updated", updateDevice)
    .on("device removed", removed => {
      // TODO implement device removal
      sails.log.warn('device removed : ', removed);
    })
    .observeDevices()
    .catch(err => sails.log.error(err));
}