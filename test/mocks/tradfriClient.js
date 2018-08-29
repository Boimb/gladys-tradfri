
class TradfriClientMock {

  constructor (addressOrHost) {
    if (addressOrHost.split('.').length === 4) { // connecting through adress
      if (addressOrHost !== TradfriClientMock.OK_ADRESS) {
        throw new Error('Gateway unreachable')
      }
    } else { // connecting through host name
      if (addressOrHost !== TradfriClientMock.OK_HOSTNAME) {
        throw new Error('Gateway unreachable')
      }
    }
  }

  authenticate(secret){
    if (secret === 'validSecret') {
      return Promise.resolve({identity: 'validIdentity', psk: 'validPsk'})
    } else {
      return Promise.reject(new Error('Invalid secret'))
    }
  }
}

TradfriClientMock.OK_ADRESS = '10.0.0.0'
TradfriClientMock.KO_ADRESS = '10.0.0.1'
TradfriClientMock.OK_HOSTNAME = 'tradfriHost.local'
TradfriClientMock.KO_HOSTNAME = 'hueHost.local'

module.exports = TradfriClientMock
