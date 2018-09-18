const assert = require('assert')
const sinon = require ('sinon')
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const should = chai.should()

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
      return connect(null).should.be.rejectedWith(Error)
    })
  })

  describe('Using validSecret', () => {
    let clientMock, authenticateFunc, connectFunc
    beforeEach (() => {
      // mock tradfriClient
      clientMock = new TradfriClientMock()
      authenticateFunc = sinon.stub(TradfriClient.prototype, 'authenticate').callsFake(clientMock.authenticate)
      connectFunc = sinon.stub(TradfriClient.prototype, 'connect').callsFake(clientMock.connect)
      gladys.param.setValue({name: TRADFRI_SECRET, value: 'validSecret'})

    })
    afterEach(() => {
      authenticateFunc.restore()
      connectFunc.restore()
      gladys.param.clearCache()
    })

    it('Should connect if validSecret', () => {
      // Set a valid secret
      return connect(discoveredGatewayMock).should.be.fulfilled
    })

    it('should authenticate if no credentials', async () => {
      const setParamSpy = sinon.spy(gladys.param, 'setValue')
      await connect(discoveredGatewayMock)
      setParamSpy.restore()
      // assert(authenticate.called, 'should not call deviceState.create')
      assert(authenticateFunc.calledOnce, 'should Authenticate')
      assert(setParamSpy.getCall(0).args[0].name == IDENTITY, 'should store IDENTITY')
      assert(setParamSpy.getCall(1).args[0].name == PSK, 'should store PSK')
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
