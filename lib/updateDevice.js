const {SLUG, DEVICETYPE_TRADFRI_BULB, DEVICETYPE_TRADFRI_REMOTE} = require ('./const');
const {createDeviceTypesFromDevice} = require ('./helpers');
const updateState = require('./updateState')
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
      sails.log.info('DeviceTypes to update: ');
      deviceTypes.map(dt => sails.log(`{id: ${dt.id}, name: ${dt.name}}`));
      return Promise.all(deviceTypes.map(deviceType => updateState(updatedDevice, deviceType)))
        .catch(err => {
          sails.log.warn(err);
          return Promise.resolve();
        });
    });
};
