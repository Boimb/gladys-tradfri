const assert = require('assert');
const sinon = require ('sinon')
const gladysMock = require('gladys-node-api-mock')
const sailsGlobal = require('./mocks/sails')
const TradfriClientMock = require('./mocks/tradfriClient')
const authenticate = require('../lib/authenticate')
const {TRADFRI_SECRET} = require('../lib/const')

beforeEach(function() {
  sails = sailsGlobal
  gladys = gladysMock
});

describe('Authenticate test', () => {
  before(() => {
    // Set a valid client
    client = new TradfriClientMock(TradfriClientMock.OK_ADRESS)
  })
  after(()=> {
    client = null
  })
  describe('WRONG SECRET', () => {
    it('Should reject if no TRADFRI_SECRET', () => {
      const fake = sinon.fake.returns(Promise.reject(new Error()));
      sinon.replace(gladys.param, 'getValue', fake);
      return authenticate(client)
        .then(res => {
          assert(true === false, 'Promise should have been rejected')
        })
        .catch(err => {
          assert(err.message === 'You need to enter gateway code in the TRADFRI_SECRET param.', 'Correct error thrown')
        })
    });
    it('Should reject if default TRADFRI_SECRET', () => {
      sinon.restore()
      const fake = sinon.fake.returns(Promise.reject(new Error()))
      sinon.replace(gladys.param, 'getValue', fake);
      return authenticate(client)
        .then(res => {
          assert(true === false, 'Promise should have been rejected')
        })
        .catch(err => {
        assert(err.message === 'You need to enter gateway code in the TRADFRI_SECRET param.', 'Correct error thrown')
      })
    })
    it('Should reject if invalid secret', () => {
      sinon.restore()
      const fake = sinon.fake.returns(Promise.resolve('invalidSecret'))
      sinon.replace(gladys.param, 'getValue', fake);
      return authenticate(client)
      .then(() => {
        assert(true === false, 'Promise should have been rejected')
      })
      .catch(err => {
        assert(err.message === 'Invalid secret', 'Successfully connected to get')
      })
    })
  })
  describe('VALID SECRET', () => {
    it('Should resolve in credentials', () => {
      sinon.restore()
      const fake = sinon.fake.returns(Promise.resolve('validSecret'))
      sinon.replace(gladys.param, 'getValue', fake);
      return authenticate(client)
        .then(credentials => {
          assert(Array.isArray(credentials), 'Credentials is an array')
          assert(credentials.length === 2, 'Array has 2 values')
          assert(credentials[0] === 'validIdentity', 'Identity is Correct')
          assert(credentials[1] === 'validPsk', 'Psk is correct')
        })
    })
  })
});

describe('Gateway connection', () => {
  describe('Wrong adress', () => {
    it('should throw if no gateway reachable with IP', () => {
      try {
        client = new TradfriClientMock(TradfriClientMock.KO_ADRESS)
      } catch (err) {
        assert(err.message === 'Gateway unreachable', 'OK')
      }
    })
    it('should throw if no gateway reachable with hostname', () => {
      try {
        client = new TradfriClientMock(TradfriClientMock.KO_HOSTNAME)
      } catch (err) {
        assert(err.message === 'Gateway unreachable', 'OK')
      }
    })
  })
  describe('Good adress', () => {
    it('should not throw if adress OK', () => {
      try {
        client = new TradfriClientMock(TradfriClientMock.OK_ADRESS)
      } catch (err) {
        assert(true === false, 'Should not have thrown')
      } finally {
        assert(true === true, 'Connection OK')
      }
    })
    it('should not throw if hostname OK', () => {
      try {
        client = new TradfriClientMock(TradfriClientMock.OK_HOSTNAME)
      } catch (err) {
        assert(true === false, 'Should not have thrown')
      } finally {
        assert(true === true, 'Connection OK')
      }
    })
  })
})
