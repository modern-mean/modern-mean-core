import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import promised from 'chai-as-promised';
import app from '../../../server/app/init';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();



describe('/modules/core/server/app/server.js', function () {

  describe('success', () => {
    let mockStart;

    beforeEach(() => {
      mockStart = sinon.stub(app, 'start').resolves();
      require('../../../server/app/server');
    });

    afterEach(() => {
      mockStart.restore();
      delete require.cache[require.resolve('../../../server/app/server')];
    });

    it('should call app.start()', function () {

      return mockStart.should.have.been.calledOnce;
    });

  });

  describe('error', () => {
    let mockStart, mockStop;

    beforeEach(() => {
      mockStart = sinon.stub(app, 'start').rejects('test');
      mockStop = sinon.stub(app, 'stop').resolves();
      require('../../../server/app/server');
    });

    afterEach(() => {
      mockStart.restore();
      mockStop.restore();
      delete require.cache[require.resolve('../../../server/app/server')];
    });

    it('should call app.stop()', function (done) {
      setTimeout(() => {
        mockStop.should.have.been.calledOnce;
        return done();
      }, 25);
    });

  });




});
