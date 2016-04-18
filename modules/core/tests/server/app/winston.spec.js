'use strict';

import winstonModule from '../../../server/app/winston';
import winston from 'winston';

let sandbox;

describe('/modules/core/server/app/winston.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });


  it('should have property init that is a function', () => {
    return winstonModule.init.should.be.a('function');
  });

  describe('init() with file', () => {
    let addStub;
    beforeEach(() => {
      config.logs.winston.file = true;
      addStub = sandbox.stub(winston, 'add');
      return winstonModule.init();
    });

    afterEach(() => {
      return config.logs.winston.file = false;
    });

    it('should read level from config', () => {
      return winston.level.should.equal(config.logs.winston.level);
    });

    it('should add file transport', () => {
      return addStub.should.be.called;
    });

  });

});
