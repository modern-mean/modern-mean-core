(function() {
  'use strict';

  describe('core.client.app.loader.spec.js', function () {

    it('should have created the main application module', function () {
      expect(angular.module(window.modernMeanApplication.name)).to.be.an('object');
      expect(angular.module(window.modernMeanApplication.name).name).to.equal('modernMean');
    });

    it('should create window.modernMeanApplication as an object', function () {
      expect(window.modernMeanApplication).to.be.an('object');
    });

    describe('window.modernMeanApplication.name', function () {
      it('should equal modernMean', function () {
        expect(window.modernMeanApplication.name).to.equal('modernMean');
      });
    });

    describe('window.modernMeanApplication.dependencies', function () {
      it('should be an array', function () {
        expect(window.modernMeanApplication.dependencies).to.be.an('array');
      });
    });

    describe('window.modernMeanApplication.registerModule', function () {
      it('should be a function', function () {
        expect(window.modernMeanApplication.registerModule).to.be.a('function');
      });

      it('should register an angular module', function () {
        //var spy = chai.spy.on(angular, 'module');
        //window.modernMeanApplication.registerModule('moduleName', ['dependency']);
        //expect(spy).to.have.been.called.with('moduleName', ['dependency']);
        //expect(angular.module(window.modernMeanApplication.name).requires).to.include('moduleName');
      });
    });



  });
})();
