const {DEVICETYPE_TRADFRI_BULB, DEVICETYPE_TRADFRI_REMOTE} = require ('./const')

module.exports = {
  /**
   * Create deviceTypes depending on device characteristics
   *
   * @param device
   * @return {*}
   */
  createDeviceTypesFromDevice : device => {
    switch (device.type) {
      case DEVICETYPE_TRADFRI_BULB:
        return bulbDeviceTypes;
        break;
      case DEVICETYPE_TRADFRI_REMOTE:
        return remoteDeviceTypes;
      default:
        sails.log(`Tradfri module didn't recognize the device with type: ${device.type}`);
        return [];
    }
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
    sensor: false,
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
    max: 100
  },
  {
    name: 'color',
    type: 'multilevel',
    sensor: false,
    min: 0,
    max: 255000255
  },
  {
    name: 'onOff',
    type: 'binary',
    sensor: false,
    min: 0,
    max: 1
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
    max: 100,
    unit: '%'
  },
];
