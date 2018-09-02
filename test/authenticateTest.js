const assert = require('assert');
const {TRADFRI_SECRET} = require ('../lib/const')
const gladysMock = require('gladys-node-api-mock')
const sailsGlobal = require('./mocks/sails')
const {TradfriClientMock} = require('./mocks/tradfriClient')
const authenticate = require('../lib/authenticate')

beforeEach(function() {
  sails = sailsGlobal
  gladys = gladysMock
});

describe('AUTHENTICATE TESTS', () => {
  before(() => {
    // Set a valid client
    client = new TradfriClientMock(TradfriClientMock.OK_IPV4_ADRESS)
  })
  after(()=> {
    client = null
  })
  describe('Invalid Secret', () => {
    it('Should reject if no TRADFRI_SECRET', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: null})
      return authenticate(client)
        .then(res => {
          assert(true === false, 'Promise should have been rejected')
        })
        .catch(err => {
          assert(err.message === 'You need to enter gateway code in the TRADFRI_SECRET param.', 'Correct error thrown')
        })
    });
    it('Should reject if default TRADFRI_SECRET', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: TRADFRI_SECRET})
      return authenticate(client)
        .then(res => {
          assert(true === false, 'Promise should have been rejected')
        })
        .catch(err => {
        assert(err.message === 'You need to enter gateway code in the TRADFRI_SECRET param.', 'Correct error thrown')
      })
    })
    it('Should reject if invalid secret', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: 'invalidSecret'})
      return authenticate(client)
      .then(() => {
        assert(true === false, 'Promise should have been rejected')
      })
      .catch(err => {
        assert(err.message === 'Invalid secret', 'Successfully connected to get')
      })
    })
  })
  describe('Valid secret', () => {
    it('Should resolve in credentials', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: 'validSecret'})
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
