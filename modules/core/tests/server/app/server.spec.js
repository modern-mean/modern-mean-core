import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promised from 'chai-as-promised';
import app from '../../../server/app/init';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();



describe('/modules/core/server/app/server.js', function () {
  let mockStart, mockStop;

  describe('success', () => {

    beforeEach(() => {
      mockStart = sinon.stub(app, 'start').resolves();

    });

    afterEach(() => {
      mockStart.restore();
      delete require.cache[require.resolve('../../../server/app/server')];
    });

    it('should call app.start()', function () {
      require('../../../server/app/server');
      //delete require.cache[require.resolve('../../../server/app/server')];
      return mockStart.should.have.been.calledOnce;
    });

  });

  describe('error', () => {


    beforeEach(() => {
      mockStart = sinon.stub(app, 'start').rejects('test');
      mockStop = sinon.stub(app, 'stop').resolves();
    });

    afterEach(() => {
      mockStart.restore();
      mockStop.restore();
    });

    it('should call app.stop()', (done) => {
      require('../../../server/app/server');
      //delete require.cache[require.resolve('../../../server/app/server')];
      setTimeout(() => {
        mockStop.should.have.been.called;
        done();
      }, 75);
    });

  });




});
