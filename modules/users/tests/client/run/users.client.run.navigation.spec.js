(function() {
  'use strict';

  describe('users.client.run.navigation.js', function () {
    var $rootScope,
      $state;

    beforeEach(module('users'));


    beforeEach(inject(function(_$rootScope_, _$state_) {

      $rootScope = _$rootScope_;
      $state = _$state_;

    }));


    describe('Users Menu', function () {

      it('should override the core right nav', function () {
        var rootState = $state.get('root');
        expect(rootState.views.rightnav.templateUrl).to.equal('modules/users/client/views/navigation/users.client.views.navigation.rightnav.html');
        expect(rootState.views.rightnav.controller).to.equal('UsersRightNavController');
      });

      it('should override the core header', function () {
        var rootState = $state.get('root');
        expect(rootState.views.header.templateUrl).to.equal('modules/users/client/views/navigation/users.client.views.navigation.header.html');
        expect(rootState.views.header.controller).to.equal('UsersHeaderController');
      });

    });

  });
})();
