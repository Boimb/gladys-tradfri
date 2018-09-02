const updateDevice = require('./updateDevice');

module.exports = function (client) {
  return new Promise((resolve, reject) => {
    sails.log.info('------------------------');
    sails.log.info(`Subscribing to device update`);
    sails.log.info('------------------------');
    try {
      client
        .on("device updated", updateDevice)
        .on("device removed", removed => {
          // TODO implement device removal
          sails.log.warn('device removed : ', removed);
        })
        .observeDevices()
        .catch(err => sails.log.error(err));
      sails.log.info('------------------------');
      sails.log.info(`Subscribed to device update`);
      sails.log.info('------------------------');
      resolve()
    } catch (err){
      reject(err)
    }
  })
}