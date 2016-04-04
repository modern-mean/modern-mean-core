(function () {
  'use strict';

  angular
    .module('users')
    .controller('UsersHeaderController', UsersHeaderController);

  UsersHeaderController.$inject = ['$mdComponentRegistry', 'Authentication'];

  function UsersHeaderController($mdComponentRegistry, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.navigation = {};

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation.left = nav;
      });

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation.right = nav;
      });

    console.log('UsersHeaderController::Init', vm);
  }
})();
