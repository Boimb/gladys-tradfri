const assert = require('assert');
const sinon = require ('sinon')
const {TradfriClient} = require ('node-tradfri-client')
const gladysMock = require('gladys-node-api-mock')
const sailsGlobal = require('./mocks/sails')
const {discoveredGatewayMock, TradfriClientMock} = require('./mocks/tradfriClient')
const connect = require('../lib/connect')
const {TRADFRI_SECRET, IDENTITY, PSK} = require ('../lib/const')

beforeEach(function() {
  sails = sailsGlobal
  gladys = gladysMock
});
describe('CONNECT TESTS', () => {

  describe('Finding gateway', () => {
    it('Should reject if no gateway found', () => {
      return connect(null)
        .then(() => {
          assert(true === false, 'Should not have resolved')
        })
        .catch(err => {
          assert(err.message === 'Could not find any TRADFRI gateway', 'Attended rejection')
        })
    })
  })

  describe('Using validSecret', () => {
    it('Should connect if validSecret', () => {
      // Set a valid secret
      gladys.param.setValue({name: TRADFRI_SECRET, value: 'validSecret'})

      // mock tradfriClient
      const clientMock = new TradfriClientMock()
      sinon.stub(TradfriClient.prototype, 'authenticate').callsFake(clientMock.authenticate)
      sinon.stub(TradfriClient.prototype, 'connect').callsFake(clientMock.connect)

      return connect(discoveredGatewayMock)
        .then(client => {
          assert(client instanceof TradfriClient, 'Got client')
        })
        .catch(err => {
          assert(true === false, 'Should not have been rejected')
        })
    })

    it('Should connect if valid credentials', () => {
      // Set a valid secret
      gladys.param.setValue({name: IDENTITY, value: TradfriClientMock.VALID_IDENTITY})
      gladys.param.setValue({name: PSK, value: TradfriClientMock.VALID_PSK})
      return connect(discoveredGatewayMock)
      .then(client => {
        assert(client instanceof TradfriClient, 'Got client')
      })
      .catch(err => {
        assert(true === false, 'Should not have been rejected')
      })
    })
  })
})
