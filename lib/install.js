const {TRADFRI_SECRET} = require('./const');

/**
 * We create the TRADFRI_SECRET param entry when installing the module
 *
 * @return {*}
 */
module.exports = function() {
  sails.log.info('installation of gladys-tradfri')
  const secretParam = {
    name: TRADFRI_SECRET,
    value: TRADFRI_SECRET
  };
  return gladys.param.setValue(secretParam)
    .then(() => {
      console.log(`Please fill the '${TRADFRI_SECRET} param with the code provided on TRADRFI_GATEWAY.`);
    });
};
