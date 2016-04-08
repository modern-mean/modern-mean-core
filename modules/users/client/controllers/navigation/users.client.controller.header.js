(function () {
  'use strict';

  angular
    .module('users')
    .controller('UsersHeaderController', UsersHeaderController);

  UsersHeaderController.$inject = ['$mdComponentRegistry', 'Authentication'];

  function UsersHeaderController($mdComponentRegistry, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.isAdmin = false;
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

    Authentication.ready
      .then(function () {
        vm.isAdmin = (Authentication.authorization.roles && Authentication.authorization.roles.indexOf('admin') !== -1);
      });


    console.log('UsersHeaderController::Init', vm);
  }
})();
