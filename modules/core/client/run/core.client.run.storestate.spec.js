(function() {
  'use strict';

  var $rootScope,
    $state;

  describe('core.client.run.storestate.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$rootScope_, _$state_) {
      $rootScope = _$rootScope_;
      $state = _$state_;
    }));

    describe('$rootScope', function () {

      it('should have a function storePreviousState', function () {
        expect($rootScope.storePreviousState).to.be.an('function');
      });

    });

    describe('$rootScope.storePreviousState', function () {

      it('should store previous state on transitions', function () {

        $rootScope.$broadcast('$stateChangeSuccess', $state.get('not-found'), { test: 'test' }, $state.get('home'), { test: 'test' });

        expect($state.previous).to.be.an('object');
        expect($state.previous.state.name).to.equal('home');
        expect($state.previous.params.test).to.equal('test');
        expect($state.previous.href).to.equal('/');
      });

      it('should not store previous state if ignored', function () {

        $rootScope.$broadcast('$stateChangeSuccess', $state.get('not-found'), { test: 'test' }, $state.get('home'), { test: 'test' });
        $rootScope.$broadcast('$stateChangeSuccess', $state.get('home'), { test: 'test' }, $state.get('not-found'), { test: 'test' });

        expect($state.previous).to.be.an('object');
        expect($state.previous.state.name).to.equal('home');
        expect($state.previous.params.test).to.equal('test');
        expect($state.previous.href).to.equal('/');
      });

    });

  });
})();
