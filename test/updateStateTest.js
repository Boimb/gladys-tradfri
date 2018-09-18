const assert = require('assert')
const sinon = require ('sinon')
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const should = chai.should()
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

      it(`Change ${key} from ${deviceType.lastValue} to ${deviceType.testValue}`, async () => {
        await updateState(TradfriClientMock.LIGHT_ON, deviceType)
        assert(spy.calledOnce, 'gladys.deviceState.create should be called once')
        assert.equal(spy.args[0][0].value, deviceType.testValue, 'gladys.deviceState.create should be called with testValue')
        assert.equal(spy.args[0][0].devicetype, deviceType.id, 'gladys.deviceState.create should be called with deviceType')

      })
      it(`Doesn't update if equals`, async () => {
        const result = await updateState(TradfriClientMock.LIGHT_ON, {...deviceType, lastValue: deviceType.testValue})
        assert(spy.notCalled, 'should not call deviceState.create')
        assert(result === undefined, 'updateState returns undefined')
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
        return updateState(TradfriClientMock.WRONG_DEVICE, deviceType).should.be.rejectedWith('Could not convert value to number.')
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

      it(`Change ${key} from ${deviceType.lastValue} to ${deviceType.testValue}`, async () => {
        await updateState(TradfriClientMock.LIGHT_OFF, deviceType)
        assert(spy.calledOnce, 'gladys.deviceState.create should be called once')
        assert.equal(spy.args[0][0].value, deviceType.testValue, 'gladys.deviceState.create should be called with testValue')
        assert.equal(spy.args[0][0].devicetype, deviceType.id, 'gladys.deviceState.create should be called with deviceType')

      })
      it(`Doesn't update if equals`, async () => {
        const result = await updateState(TradfriClientMock.LIGHT_OFF, {...deviceType, lastValue: deviceType.testValue})
        assert(spy.notCalled, 'should not call deviceState.create')
        assert(result === undefined, 'updateState returns undefined')
      })
    })
  })

  describe('Unhandled deviceType', () => {
    it('should do nothing', async () => {
      const deviceType = {name: 'unkonwn', identifier: 'unknown:1'}
      const result = await updateState(TradfriClientMock.LIGHT_ON, {...deviceType, lastValue: deviceType.testValue})
      assert(spy.notCalled, 'should not call deviceState.create')
      assert(result === undefined)
    })
  })

  describe('No deviceType set', () => {
    it('Should catch', () => {
      const wrongDeviceType = {
        name: 'onOff',
        type: 'binary',
        identifier: 'onOff:65539',
        lastValue: 0,
        testValue: 1
      }
      return updateState(TradfriClientMock.LIGHT_ON, wrongDeviceType).should.be.rejectedWith(Error)
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
