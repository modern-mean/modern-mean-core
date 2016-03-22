(function() {
  'use strict';

  var $rootScope,
    $state,
    $location,
    $templateCache;

  describe('core.client.config.routes.js', function () {

    beforeEach(module('core.routes'));

    beforeEach(inject(function(_$rootScope_, _$state_, _$location_, _$templateCache_) {
      $state = _$state_;
      $location = _$location_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    }));

    it('should have a root state', function () {
      var state = $state.get('root');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('');
      expect(state.views).to.be.an('object');
      //Header
      expect(state.views.header).to.be.an('object');
      expect(state.views.header.templateUrl).to.equal('modules/core/client/views/core.client.views.header.html');
      expect(state.views.header.controller).to.equal('HeaderController');
      expect(state.views.header.controllerAs).to.equal('vm');
      //Main
      expect(state.views.main).to.be.an('object');
      //LeftNav
      expect(state.views.leftnav).to.be.an('object');
      //LeftNav
      expect(state.views.rightnav).to.be.an('object');
      //footer
      expect(state.views.footer).to.be.an('object');
    });

    it('should have a home state', function () {
      var state = $state.get('root.home');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/');
      expect(state.views).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/core/client/views/core.client.views.home.html');
      expect(state.views['main@'].controller).to.equal('HomeController');
      expect(state.views['main@'].controllerAs).to.equal('vm');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
      expect(state.data.pageTitle).to.exist;
    });

    it('should have a not found state', function () {
      var state = $state.get('root.not-found');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/not-found');
      expect(state.views).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/core/client/views/core.client.views.404.html');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
    });

    it('should have a bad request state', function () {
      var state = $state.get('root.bad-request');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/bad-request');
      expect(state.views).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/core/client/views/core.client.views.400.html');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
    });

    it('should have a forbidden state', function () {
      var state = $state.get('root.forbidden');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/forbidden');
      expect(state.views).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/core/client/views/core.client.views.403.html');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
    });

    it('should have otherwise go to not found', function () {
      $location.url('/asdfsadfasdf');
      $rootScope.$digest();
      expect($state.current.name).to.equal('root.not-found');
    });

  });
})();
