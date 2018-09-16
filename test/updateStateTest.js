const assert = require('assert')
const sinon = require ('sinon')
const gladysMock = require('gladys-node-api-mock')
const sailsGlobal = require('./mocks/sails')
const {TradfriClientMock} = require('./mocks/tradfriClient')
const updateState = require('../lib/updateState')

// FIXME use chai to test Promise and rejection

beforeEach(function() {
  sails = sailsGlobal
  gladys = gladysMock
});

describe('UPDATE STATE', () => {

  /**
   * define deviceTypesOn
   * Each has a testValue to see if the given value changes
   **/
  const deviceTypesOn = {
    binary: {
      name: 'onOff',
      type: 'binary',
      identifier: 'onOff:65539',
      lastValue: 0,
      device: 8,
      id: 1,
      testValue: 1
    },
    dimmer : {
      name: 'dimmer',
      type: 'multi-level',
      identifier: 'dimmer:65539',
      lastValue: 0,
      device: 8,
      id: 3,
      testValue: 50
    },
    color : {
      name: 'color',
      type: 'multi-level',
      identifier: 'color:65539',
      lastValue: 1,
      device: 8,
      id: 2,
      testValue: parseInt('f1e0b5', 16)
    },
    hue : {
      name: 'hue',
      type: 'multi-level',
      identifier: 'hue:65539',
      lastValue: 1,
      device: 8,
      id: 4,
      testValue: 50
    },
    saturation : {
      name: 'saturation',
      type: 'multi-level',
      identifier: 'saturation:65539',
      lastValue: 1,
      device: 8,
      id: 5,
      testValue: 50
    },
    battery : {
      name: 'battery',
      type: 'multi-level',
      identifier: 'battery:65539',
      lastValue: 1,
      device: 8,
      id: 5,
      testValue: 50
    }
  }
  /**
   * define deviceTypesOn
   * Each has a testValue to see if the given value changes
   **/
  const deviceTypesOff = {
    binary: {
      name: 'onOff',
      type: 'binary',
      identifier: 'onOff:65539',
      lastValue: 1,
      device: 8,
      id: 1,
      testValue: 0
    },
    dimmer : {
      name: 'dimmer',
      type: 'multi-level',
      identifier: 'dimmer:65539',
      lastValue: 100,
      device: 8,
      id: 3,
      testValue: 0
    }
  }

  Object.keys(deviceTypesOn).map(key => {
    let deviceType = deviceTypesOn[key]

    return describe(`${key} case`, () => {

      beforeEach(() => {
        spy = sinon.spy(gladys.deviceState, 'create')

      })

      afterEach(() => {
        gladys.deviceState.create.restore()
      })

      it(`Change ${key} from ${deviceType.lastValue} to ${deviceType.testValue}`, () => {
        return updateState(TradfriClientMock.LIGHT_ON, deviceType)
        .then(deviceState => {
          assert(spy.calledOnce, 'gladys.devcieState.create should be called once')
          assert('has changed', deviceState.value === deviceType.testValue)
        })
      })
      it(`Doesn't update if equals`, () => {
        return updateState(TradfriClientMock.LIGHT_ON, {...deviceType, lastValue: deviceType.testValue})
        .then(deviceState => {
          assert(spy.notCalled, 'should not call deviceState.create')
          assert(deviceState === undefined)
        })
      })
    })
  })
  Object.keys(deviceTypesOn).map(key => {
    let deviceType = deviceTypesOn[key]

    return describe(`Wrong updated device values case`, () => {

      beforeEach(() => {
        spy = sinon.spy(gladys.deviceState, 'create')

      })

      afterEach(() => {
        gladys.deviceState.create.restore()
      })

      it(`Change should throw`, () => {
        return updateState(TradfriClientMock.WRONG_DEVICE, deviceType)
        .catch(err => {
          assert(true, 'catched')
          assert(err.message === 'Could not convert value to number.', 'gladys.devcieState.create should throw')
        })
      })
    })
  })
  Object.keys(deviceTypesOff).map(key => {
    let deviceType = deviceTypesOff[key]

    return describe(`${key} case`, () => {

      beforeEach(() => {
        spy = sinon.spy(gladys.deviceState, 'create')

      })

      afterEach(() => {
        gladys.deviceState.create.restore()
      })

      it(`Change ${key} from ${deviceType.lastValue} to ${deviceType.testValue}`, () => {
        return updateState(TradfriClientMock.LIGHT_OFF, deviceType)
        .then(deviceState => {
          assert(spy.calledOnce, 'gladys.devcieState.create should be called once')
          assert('has changed', deviceState.value === deviceType.testValue)
        })
      })
      it(`Doesn't update if equals`, () => {
        return updateState(TradfriClientMock.LIGHT_OFF, {...deviceType, lastValue: deviceType.testValue})
        .then(deviceState => {
          assert(spy.notCalled, 'should not call deviceState.create')
          assert(deviceState === undefined)
        })
      })
    })
  })

  describe('Unhandled deviceType', () => {
    it('should do nothing', () => {
      const deviceType = {name: 'unkonwn', identifier: 'unknown:1'}
      return updateState(TradfriClientMock.LIGHT_ON, {...deviceType, lastValue: deviceType.testValue})
      .then(deviceState => {
        assert(spy.notCalled, 'should not call deviceState.create')
        assert(deviceState === undefined)
      })
    })
  })


  describe('No deviceType set', () => {
    it('Should catch', () => {
      const wrongDeviceType = {
        name: 'onOff',
        type: 'binary',
        identifier: 'onOff:65539',
        lastValue: 0,
        id: 1,
        testValue: 1
      }
      return updateState(TradfriClientMock.LIGHT_ON, wrongDeviceType)
        .catch(err => {
          assert('error catched', true)
        })
    })
  })

})

/**
 deviceType RowDataPacket {
  name: 'onOff',
  type: 'binary',
  category: 'light',
  identifier: 'onOff:65539',
  tag: null,
  sensor: 0,
  unit: null,
  min: 0,
  max: 1,
  display: 1,
  lastValue: 1,
  lastValueDatetime: 2018-09-04T05:28:31.000Z,
  device: 8,
  id: 16,
  createdAt: 2018-09-04T05:28:31.000Z,
  updatedAt: 2018-09-04T05:28:31.000Z,
  lastChanged: 2018-09-04T05:28:31.000Z }
**/
