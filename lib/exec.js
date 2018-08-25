const shared = require ('./shared')
module.exports = function(param){
  let lightOperation = {}
  const [type, instanceId] = param.deviceType.deviceTypeIdentifier.split(':');
  switch (type) {
    case 'hue':
      lightOperation.hue = param.state.value === 1;
      break;
    case 'saturation':
      lightOperation.saturation = param.state.value;
      break;
    case 'dimmer':
      lightOperation.dimmer = param.state.value;
      break;
    case 'color':
      lightOperation.color = param.state.value.toString(16); // color is received in hex
      break;
    case 'onOff':
      lightOperation.onOff = param.state.value === 1;
      break;
    default:
      sails.log.error(`No action associated with deviceType: {id: ${param.id} found.`);
      return false; // Type not recognised... abort mission
  }
  // get device instance

  return shared.getClient()
    .then(client => {
      const device = client.devices[instanceId]
      if (!device){
        Promise.reject(new Error(`No device with instanceId ${instanceId} found`))
      }
      client.operateLight(device, lightOperation)
      Promise.resolve()
    })
};
