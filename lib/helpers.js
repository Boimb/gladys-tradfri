const {DEVICETYPE_TRADFRI_BULB, DEVICETYPE_TRADFRI_REMOTE} = require ('./const')

module.exports = {
  /**
   * Create deviceTypes depending on device characteristics
   *
   * @param device
   * @return {*}
   */
  createDeviceTypesFromDevice : device => {
    let newDeviceTypes = [];
    switch (device.type) {
      case DEVICETYPE_TRADFRI_BULB:
        newDeviceTypes = bulbDeviceTypes;
        break;
      case DEVICETYPE_TRADFRI_REMOTE:
        newDeviceTypes = remoteDeviceTypes;
      default:
        sails.log(`Tradfri module didn't recognize the device with type: ${device.type}`);
        return [];
    }
    return newDeviceTypes.map(d => ({...d, identifier: `${d.name}:${device.instanceId}`}))
  },
}
/**
 * DeviceTypes associated to TRADFRI bulb E27 CWS opal 600lm
 *
 * @type {[null,null,null,null,null,null]}
 */
const bulbDeviceTypes = [
  {
    name: 'alive',
    type: 'binary',
    sensor: true,
    min: 0,
    max: 1
  },
  {
    name: 'hue',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 65279
  },
  {
    name: 'saturation',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 100
  },
  {
    name: 'dimmer',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 100,
    category: 'light'
  },
  {
    name: 'color',
    type: 'multilevel',
    sensor: false,
    min: parseInt('000000', 16),
    max: parseInt('FFFFFF', 16)
  },
  {
    name: 'onOff',
    type: 'binary',
    sensor: false,
    min: 0,
    max: 1,
    category: 'light'
  }
];

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
