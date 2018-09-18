const {Light, Sensor} = require('node-tradfri-client')
const accessory_1 = require('node-tradfri-client/build/lib/accessory')
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

const discoveredGatewayMock = {
  name: 'discoveredGatewayMock',
  host : TradfriClientMock.OK_HOSTNAME,
  addresses: [TradfriClientMock.OK_IPV4_ADRESS, TradfriClientMock.OK_IPV6_ADRESS]
}

const accessoryFactory = (type) => {
  const jsonObjects = {
    whiteBulb: {
      '3': {
        '0': 'IKEA of Sweden',
        '1': 'TRADFRI bulb E27 W opal 1000lm',
        '2': '',
        '3': '1.2.214',
        '6': 1
      },
      '3311': [ { '5850': 0, '5851': 36, '9003': 0 } ],
      '5750': 2,
      '9001': 'TRADFRI bulb E27 W opal 1000lm',
      '9002': 1535749718,
      '9003': 65539,
      '9019': 0,
      '9020': 1536780097,
      '9054': 0
    },
    colorBulb: {
      '3': { '0': 'IKEA of Sweden',
        '1': 'TRADFRI bulb E27 CWS opal 600lm',
        '2': '',
        '3': '1.3.002',
        '6': 1
      },
      '3311': [{
        '5706': '0',
        '5707': 46239,
        '5708': 44389,
        '5709': 13446,
        '5710': 7953,
        '5850': 1,
        '5851': 1,
        '9003': 0
      }],
      '5750': 2,
      '9001': 'TRADFRI bulb E27 CWS opal 600lm',
      '9002': 1523462902,
      '9003': 65537,
      '9019': 1,
      '9020': 1536699582,
      '9054': 0
    },
    remote: {
      isProxy: false,
      options: {},
      name: 'TRADFRI remote control',
      createdAt: 1523462848,
      instanceId: 65536,
      type: 0,
      alive: true,
      lastSeen: 1536954329,
      otaUpdateState: 0,
      deviceInfo: {
        isProxy: false,
        options: {},
        firmwareVersion: '1.2.214',
        manufacturer: 'IKEA of Sweden',
        modelNumber: 'TRADFRI remote control',
        power: 3,
        serialNumber: '',
        battery: 47
      },
      switchList: [{
        isProxy: false,
        options: {},
        name: '',
        createdAt: 0,
        instanceId: 0,
        client: [Object]
      }],
      client: {
      domain: null,
      _events: { 'device updated': [], 'device removed': [] },
      _eventsCount: 2,
      _maxListeners: undefined,
      hostname: 'TRADFRI-Gateway-b8d7af2bba0f.local',
      observedPaths: [
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65536',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65537',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65538',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65539'
      ],
      devices: { '65536': [Object] },
      groups: {},
      ipsoOptions: {},
      rememberedObserveCallbacks: [
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65536',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65537',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65538',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65539'
      ],
      requestBase: 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/',
      observeDevicesPromise: {}
      }
    }
  }
  if (jsonObjects.hasOwnProperty(type)) {
    let accessory = new accessory_1.Accessory({})
    return accessory
      .parse(jsonObjects[type])
      .fixBuggedProperties()
      .createProxy();
  } else {
    return [] // unknown devices return empty array
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
TradfriClientMock.LIGHT_ON = {
  isProxy: false,
  options: {},
  name: 'TRADFRI bulb E27 W opal 1000lm',
  createdAt: 1535749718,
  instanceId: 65539,
  type: 2,
  alive: true,
  lastSeen: 1536191205,
  otaUpdateState: 0,
  deviceInfo: {
    battery: 50,
    isProxy: false,
    options: {},
    firmwareVersion: '1.2.214',
    manufacturer: 'IKEA of Sweden',
    modelNumber: 'TRADFRI bulb E27 W opal 1000lm',
    power: 1,
    serialNumber: ''
  },
  lightList: [{
      isProxy: false,
      options: {},
      name: '',
      createdAt: 0,
      instanceId: 0,
      color: 'f1e0b5',
      transitionTime: 0.5,
      _spectrum: 'none',
      _accessory: [Object],
      _modelName: 'TRADFRI bulb E27 W opal 1000lm',
      onOff: true,
      dimmer: 50,
      hue: 50,
      saturation: 50,
      nan: NaN,
      client: {}
    }],
    client: {
    domain: null,
    _events: { 'device updated': [Function], 'device removed': [Function] },
    _eventsCount: 2,
    _maxListeners: undefined,
    hostname: 'TRADFRI-Gateway-b8d7af2bba0f.local',
    observedPaths:
      [ 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65536',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65537',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65538',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65539' ],
    devices:
      { '65536': [Object],
      '65537': [Object],
      '65538': [Object],
      '65539': [Object] },
    groups: {},
    ipsoOptions: {},
    rememberedObserveCallbacks: {},
    requestBase: 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/',
    observeDevicesPromise: null
  }
}
TradfriClientMock.LIGHT_OFF = {
  isProxy: false,
  options: {},
  name: 'TRADFRI bulb E27 W opal 1000lm',
  createdAt: 1535749718,
  instanceId: 65539,
  type: 2,
  alive: true,
  lastSeen: 1536191205,
  otaUpdateState: 0,
  deviceInfo: {
    battery: 50,
    isProxy: false,
    options: {},
    firmwareVersion: '1.2.214',
    manufacturer: 'IKEA of Sweden',
    modelNumber: 'TRADFRI bulb E27 W opal 1000lm',
    power: 1,
    serialNumber: ''
  },
  lightList: [{
      isProxy: false,
      options: {},
      name: '',
      createdAt: 0,
      instanceId: 0,
      color: 'f1e0b5',
      transitionTime: 0.5,
      _spectrum: 'none',
      _accessory: [Object],
      _modelName: 'TRADFRI bulb E27 W opal 1000lm',
      onOff: false,
      dimmer: 0,
      hue: 0,
      saturation: 0,
      nan: NaN,
      client: {}
    }],
    client: {
    domain: null,
    _events: { 'device updated': [Function], 'device removed': [Function] },
    _eventsCount: 2,
    _maxListeners: undefined,
    hostname: 'TRADFRI-Gateway-b8d7af2bba0f.local',
    observedPaths:
      [ 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65536',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65537',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65538',
      'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65539' ],
    devices:
      { '65536': [Object],
      '65537': [Object],
      '65538': [Object],
      '65539': [Object] },
    groups: {},
    ipsoOptions: {},
    rememberedObserveCallbacks: {},
    requestBase: 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/',
    observeDevicesPromise: null
  }
}
TradfriClientMock.WRONG_DEVICE = {
  isProxy: false,
  options: {},
  name: 'TRADFRI bulb E27 W opal 1000lm',
  createdAt: 1535749718,
  instanceId: 65539,
  type: 2,
  alive: true,
  lastSeen: 1536191205,
  otaUpdateState: 0,
  deviceInfo: {
    battery: 'string',
    isProxy: false,
    options: {},
    firmwareVersion: '1.2.214',
    manufacturer: 'IKEA of Sweden',
    modelNumber: 'TRADFRI bulb E27 W opal 1000lm',
    power: 1,
    serialNumber: ''
  },
  lightList: [{
    isProxy: false,
    options: {},
    name: '',
    createdAt: 0,
    instanceId: 0,
    color: 'string',
    transitionTime: 0.5,
    _spectrum: 'none',
    _accessory: [Object],
    _modelName: 'TRADFRI bulb E27 W opal 1000lm',
    onOff: 'string',
    dimmer: 'string',
    hue: 'string',
    saturation: 'string',
    nan: NaN,
    client: {}
  }],
  client: {
    domain: null,
    _events: { 'device updated': [Function], 'device removed': [Function] },
    _eventsCount: 2,
    _maxListeners: undefined,
    hostname: 'TRADFRI-Gateway-b8d7af2bba0f.local',
    observedPaths:
      [ 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65536',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65537',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65538',
        'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/15001/65539' ],
    devices:
      { '65536': [Object],
        '65537': [Object],
        '65538': [Object],
        '65539': [Object] },
    groups: {},
    ipsoOptions: {},
    rememberedObserveCallbacks: {},
    requestBase: 'coaps://TRADFRI-Gateway-b8d7af2bba0f.local:5684/',
    observeDevicesPromise: null
  }
}
TradfriClientMock.LIGHT_BULB = accessoryFactory('whiteBulb')
TradfriClientMock.COLOR_BULB = accessoryFactory('colorBulb')
TradfriClientMock.REMOTE = accessoryFactory('remote')
TradfriClientMock.UNKNOWN = accessoryFactory('unknown')

module.exports = {TradfriClientMock, discoveredGatewayMock}
