const assert = require('assert')
const sinon = require ('sinon')
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const should = chai.should()
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
      return authenticate(client).should.be.rejectedWith('You need to enter gateway code in the TRADFRI_SECRET param.')

    });
    it('Should reject if default TRADFRI_SECRET', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: TRADFRI_SECRET})
      return authenticate(client).should.be.rejectedWith('You need to enter gateway code in the TRADFRI_SECRET param.')
    })
    it('Should reject if invalid secret', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: 'invalidSecret'})
      return authenticate(client).should.be.rejectedWith('Invalid secret')
    })
  })
  describe('Valid secret', () => {
    it('Should resolve in credentials', () => {
      gladys.param.setValue({name: TRADFRI_SECRET, value: 'validSecret'})
      return authenticate(client).should.become(['validIdentity', 'validPsk'])
    })
  })
});
