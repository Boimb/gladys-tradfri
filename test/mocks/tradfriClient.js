
class TradfriClientMock {

  constructor (addressOrHost) {
    this.hostname = addressOrHost;
  }

  authenticate(secret) {
    if (secret === TradfriClientMock.VALID_SECRET) {
      return Promise.resolve({identity: TradfriClientMock.VALID_IDENTITY, psk: TradfriClientMock.VALID_PSK})
    } else {
      return Promise.reject(new Error('Invalid secret'))
    }
  }
  connect(identity, psk) {
    if (identity === TradfriClientMock.VALID_IDENTITY && psk === TradfriClientMock.VALID_PSK) {
      return true
    }
  }
}

TradfriClientMock.OK_IPV4_ADRESS = '10.0.0.0'
TradfriClientMock.KO_IPV4_ADRESS = '10.0.0.1'
TradfriClientMock.OK_IPV6_ADRESS = 'fe80::bad7:afff:fe2b:aa00'
TradfriClientMock.KO_IPV6_ADRESS = 'fe80::bad7:afff:fe2b:aa01'
TradfriClientMock.OK_HOSTNAME = 'tradfriHost.local'
TradfriClientMock.VALID_SECRET = 'validSecret'
TradfriClientMock.INVALID_SECRET = 'invalidSecret'
TradfriClientMock.VALID_IDENTITY = 'validIdentity'
TradfriClientMock.INVALID_IDENTITY = 'invalidIdentity'
TradfriClientMock.VALID_PSK = 'validPsk'
TradfriClientMock.INVALID_PSK = 'invalidPsk.local'




const discoveredGatewayMock = {
  name: 'discoveredGatewayMock',
  host : TradfriClientMock.OK_HOSTNAME,
  addresses: [TradfriClientMock.OK_IPV4_ADRESS, TradfriClientMock.OK_IPV6_ADRESS]
}


module.exports = {TradfriClientMock, discoveredGatewayMock}
