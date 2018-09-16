const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-like'))
chai.use(require('chai-things'))
const gladysMock = require('gladys-node-api-mock')
const sailsGlobal = require('./mocks/sails')
const {TradfriClientMock} = require('./mocks/tradfriClient')
const helpers = require('../lib/helpers')

beforeEach(function() {
  sails = sailsGlobal
  gladys = gladysMock
});

return describe('HELPERS', () => {
  describe('Create a white bulb', () => {
    return it('Should create 2 deviceTypes', () => {
      const deviceTypes = helpers.createDeviceTypesFromDevice(TradfriClientMock.LIGHT_BULB)
      expect(deviceTypes).to.be.an('array').that.has.lengthOf(2)
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'dimmer',
        type: 'multilevel',
        sensor: false,
        min: 0,
        max: 100,
        category: 'light'
      });
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'onOff',
        type: 'binary',
        sensor: false,
        min: 0,
        max: 1,
        category: 'light'
      });
    })
  })
  describe('Create a color bulb', () => {
    return it('Should create 5 deviceTypes', () => {
      const deviceTypes = helpers.createDeviceTypesFromDevice(TradfriClientMock.COLOR_BULB)

      expect(deviceTypes).to.be.an('array').that.has.lengthOf(5)
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'dimmer',
        type: 'multilevel',
        sensor: false,
        min: 0,
        max: 100,
        category: 'light'
      });
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'onOff',
        type: 'binary',
        sensor: false,
        min: 0,
        max: 1,
        category: 'light'
      });
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'hue',
        type: 'multilevel',
        sensor: false,
        min: 0,
        max: 360
      });
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'saturation',
        type: 'multilevel',
        sensor: false,
        min: 0,
        max: 100
      });
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'color',
        type: 'multilevel',
        sensor: false,
        min: parseInt('000000', 16),
        max: parseInt('FFFFFF', 16)
      });
    })
  })
  describe('Create a remote', () => {
    return it('Should create 1 deviceType', () => {
      const deviceTypes = helpers.createDeviceTypesFromDevice(TradfriClientMock.REMOTE)
      expect(deviceTypes).to.be.an('array').that.has.lengthOf(1)
      expect(deviceTypes).to.be.an('array').that.contains.something.like({
        name: 'battery',
        type: 'multilevel',
        sensor: true,
        min: 0,
        max: 100
      });
    })
  })
  describe('Unhandled device', () => {
    return it('Should not create any deviceType', () => {
      const deviceTypes = helpers.createDeviceTypesFromDevice(TradfriClientMock.UNKNOWN)
      expect(deviceTypes).to.be.an('array').that.has.lengthOf(0)
    })
  })
})