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

    it('should have a home state', function () {
      var state = $state.get('home');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/');
      expect(state.templateUrl).to.equal('modules/core/client/views/core.client.views.home.html');
      expect(state.controller).to.equal('HomeController');
      expect(state.controllerAs).to.equal('vm');
    });

    it('should have a not found state', function () {
      var state = $state.get('not-found');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/not-found');
      expect(state.templateUrl).to.equal('modules/core/client/views/core.client.views.404.html');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
    });

    it('should have a bad request state', function () {
      var state = $state.get('bad-request');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/bad-request');
      expect(state.templateUrl).to.equal('modules/core/client/views/core.client.views.400.html');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
    });

    it('should have a forbidden state', function () {
      var state = $state.get('forbidden');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/forbidden');
      expect(state.templateUrl).to.equal('modules/core/client/views/core.client.views.403.html');
      expect(state.data).to.be.an('object');
      expect(state.data.ignoreState).to.equal(true);
    });

    it('should have otherwise go to not found', function () {
      $templateCache.put('modules/core/client/views/core.client.views.404.html', '<div>test</div>');
      $location.url('/asdfsadfasdf');
      $rootScope.$digest();
      expect($state.current.name).to.equal('not-found');
    });

  });
})();
