

module.exports = function (updatedDevice, deviceType) {
  let newValue = false;
  const standardizedValue = (value) => {
    if (value === true || value == 'true') {
      return 1;
    } else if (value === false || value == 'false') {
      return 0;
    }
    return parseFloat(value);
  }

  switch (deviceType.name) {
    case 'alive':
      newValue = updatedDevice.alive;
      break;
    case 'hue':
      newValue = updatedDevice.lightList[0].hue;
      break;
    case 'saturation':
      newValue = updatedDevice.lightList[0].saturation;
      break;
    case 'dimmer':
      newValue = updatedDevice.lightList[0].dimmer;
      break;
    case 'color':
      newValue = parseInt(updatedDevice.lightList[0].color, 16); // color is received in hex
      break;
    case 'onOff':
      newValue = updatedDevice.lightList[0].onOff;
      break;
    case 'battery':
      newValue = updatedDevice.deviceInfo.battery;
      break;
    default:
      sails.log.warn('not implemented yet...');
  }
  if ((!deviceType.lastValue && newValue) || deviceType.lastValue !== standardizedValue(newValue)) {
    sails.log(`Adding value ${standardizedValue(newValue)} to deviceType {id: ${deviceType.id}, name: ${deviceType.name}}`);
    return gladys.deviceState.create({value: standardizedValue(newValue), devicetype: deviceType.id})
      .catch(err => {
        sails.log.warn('OUPS... Could not insert in DB.');
        return Promise.reject(err);
      });
  }
  return Promise.resolve();
};
