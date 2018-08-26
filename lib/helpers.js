const {Accessory, AccessoryTypes} =require ('node-tradfri-client');

module.exports = {
  /**
   * Create deviceTypes depending on device characteristics
   *
   * @param device
   * @return {*}
   */
  createDeviceTypesFromDevice : (device) => {
    let newDeviceTypes = [];

    // Rely on node-tradfri-client builtin Accessory class
    if (device instanceof Accessory && device.type === AccessoryTypes.remote) {
      sails.log.info('Creating remote')
      newDeviceTypes = remoteDeviceTypes;
    } else if (device instanceof Accessory && device.type === AccessoryTypes.lightbulb) {
      newDeviceTypes = device.lightList[0].spectrum === 'rgb'
        ? rgbBulbDeviceTypes
        : whiteBulbDeviceTypes
    } else {
      sails.log.info(`Unhandled decvice detected : {name: ${device.name}, instanceId: ${device.instanceId}`)
      return [] // unknown device, return.
    }
    return newDeviceTypes.map((d) => ({...d, identifier: `${d.name}:${device.instanceId}`}))
  },
}
/**
 * DeviceTypes associated to a white light
 *
 */
const whiteBulbDeviceTypes = [
  {
    name: 'dimmer',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 100,
    category: 'light'
  },
  {
    name: 'onOff',
    type: 'binary',
    sensor: false,
    min: 0,
    max: 1,
    category: 'light'
  }
]

/**
 * DeviceTypes associated to a RGB light
 *
 */
const rgbBulbDeviceTypes = whiteBulbDeviceTypes.concat([ // RGB lights have at least white light deviceTypes
  {
    name: 'hue',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 360
  },
  {
    name: 'saturation',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 100
  },
  {
    name: 'color',
    type: 'multilevel',
    sensor: false,
    min: parseInt('000000', 16),
    max: parseInt('FFFFFF', 16)
  }
]);

/**
 * DeviceTypes associated to TRADFRI remote control
 * @type {[null]}
 */
const remoteDeviceTypes = [
  {
    name: 'battery',
    type: 'multilevel',
    sensor: true,
    min: 0,
    max: 100
  },
];
