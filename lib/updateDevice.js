const {SLUG} = require ('./const');
const {createDeviceTypesFromDevice} = require ('./helpers');
const updateState = require ('./updateState');

/**
 * Create a device and associated deviceTypes and states in Gladys if not exists.
 * If device exists, update related deviceTypes (but don't create them)
 *
 * @param updatedDevice
 */
module.exports = function (updatedDevice) {
  // check if device exists
  gladys.device.getByIdentifier({identifier: updatedDevice.instanceId, service: SLUG})
    .then(device => {
      sails.log.info('------------------------');
      sails.log.info(`Device ${updatedDevice.name} has been updated`);
      return gladys.deviceType.getByDevice(device);
    })
    // device doesn't exists
    .catch((err) => {
      sails.log.info('------------------------');
      sails.log.info(`Device "{identifier: ${updatedDevice.instanceId}, service: ${SLUG}" does not exist. Creating it`);
      return gladys.device.create({
        // Create device
        device: {
          name: updatedDevice.name,
          identifier: updatedDevice.instanceId,
          protocol: SLUG,
          service: SLUG,
        },
        // create deviceTypes
        types: createDeviceTypesFromDevice(updatedDevice)
      })
        .then((device) => Promise.resolve(device.types));
    })
    .then(deviceTypes => {
      return Promise.all(deviceTypes.map(deviceType => updateState(updatedDevice, deviceType)))
        .catch(err => {
          sails.log.warn(err);
          return Promise.resolve();
        });
    });
};
