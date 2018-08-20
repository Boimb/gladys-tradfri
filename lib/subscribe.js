const shared = require('./shared')

module.exports = function () {
  shared.getClient()
    .then(client => {
      return client
      .on("device updated", (updated) => {
        sails.log.info('device updated : ', updated)})
      .on("device removed", removed => {
        sails.log.warn('device removed : ', removed)
      })
      .observeDevices()
    })
}