(function() {
  'use strict';

  angular
    .module('users')
    .controller('UserRightNavController', UserRightNavController);

  UserRightNavController.$inject = ['Authentication', '$state', '$mdSidenav' ];

  function UserRightNavController(Authentication, $state, $mdSidenav) {
    var vm = this;

    vm.authentication = Authentication;

    vm.close = close;

    function close(navID) {
      $mdSidenav(navID)
        .close();
    }


    console.log('UserRightNavController::Init::vm', vm);
  }
})();
