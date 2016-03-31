'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import * as profileUpload from '../../../server/config/profileUpload';
import config from 'modernMean/config';

chai.use(promised);
chai.use(sinonChai);

let expect = chai.expect;
let should = chai.should();

let sandbox;

describe('/modules/users/server/config/profileUpload.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('export', () => {

    it('should export default', () => {
      return profileUpload.default.should.be.an('object');
    });

    it('should export filter', () => {
      return profileUpload.filter.should.be.a('function');
    });

    describe('filter', () => {
      let mockReq, mockFile, mockCb;

      describe('success', () => {

        beforeEach(() => {
          mockReq = {};
          mockFile = {
            mimetype: 'image/png'
          };
          mockCb = sandbox.stub();
          profileUpload.filter(mockReq, mockFile, mockCb);
        });

        it('should allow an image file', () => {
          return mockCb.should.have.been.calledWith(null, true);
        });

      });

      describe('error', () => {

        beforeEach(() => {
          mockReq = {};
          mockFile = {
            mimetype: 'text/html'
          };
          mockCb = sandbox.stub();
          profileUpload.filter(mockReq, mockFile, mockCb);
        });

        it('should not allow a non image file', () => {
          return mockCb.should.have.been.calledWith(new Error('Only image files are allowed!'), false);
        });

      });

    });

    it('should export storage', () => {
      return profileUpload.filter.should.be.a('function');
    });

    describe('storage()', () => {

      it('should return an object of Disk Storage', () => {
        let test = profileUpload.storage();
        test.should.be.an('object');
        test.getFilename.should.be.a('function');
        return test.getDestination.should.be.a('function');
      });

    });

    it('should export destination', () => {
      return profileUpload.destination.should.be.a('function');
    });

    describe('destination()', () => {
      let mockReq, mockFile, mockCb;

      beforeEach(() => {
        mockReq = {};
        mockFile = {
          mimetype: 'image/png'
        };
        mockCb = sandbox.stub();
        profileUpload.destination(mockReq, mockFile, mockCb);
      });

      it('should call the callback', () => {
        return mockCb.should.have.been.calledWith(null, config.uploads.profileUpload.dest);
      });

    });

    it('should export filename', () => {
      return profileUpload.filename.should.be.a('function');
    });

    describe('destination()', () => {
      let mockReq, mockFile, mockCb;

      beforeEach(() => {
        mockReq = {
          user: {
            _id: 'okie'
          }
        };
        mockFile = {
          mimetype: 'image/png',
          originalname: 'test.png'
        };
        mockCb = sandbox.stub();
        profileUpload.filename(mockReq, mockFile, mockCb);
      });

      it('should call the callback', () => {
        return mockCb.should.have.been.called;
      });

    });

  });

});
