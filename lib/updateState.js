

module.exports = function (updatedDevice, deviceType) {
  let newValue = false;
  const standardizedValue = (value) => {
    if (value === true || value === 'true') {
      return 1;
    } else if (value === false || value === 'false') {
      return 0;
    } else {
      return parseFloat(value);
    }
  };

  switch (deviceType.identifier.split(':')[0]) { // We rely on identifier, not name, in case user wants to change name
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
      return Promise.resolve();
  }
  if ((!deviceType.lastValue && newValue) || deviceType.lastValue !== standardizedValue(newValue)) {
    console.log('deviceType.lastValue', deviceType.lastValue)
    console.log('newValue', newValue)
    if (typeof standardizedValue(newValue) !== 'number' || isNaN(standardizedValue(newValue))) {
      console.log(' standardizedValue(newValue) ',  standardizedValue(newValue))
      return Promise.reject(new Error('Could not convert value to number.'))
    }
    sails.log.debug(`Tryin to Add value ${standardizedValue(newValue)} to deviceType {id: ${deviceType.id}, name: ${deviceType.name}}`)
    return gladys.deviceState.create({value: standardizedValue(newValue), devicetype: deviceType.id})
      .then(deviceState => {
        sails.log.debug(`Added deviceState : {deviceType: ${deviceState.devicetype}, value: ${deviceState.value}`)
        return deviceState
      })
      .catch(err => {
        sails.log.warn('OUPS... Could not insert in DB.');
        return Promise.reject(err);
      });
  }
  return Promise.resolve();
};
