(function() {
  'use strict';

  angular
    .module('users')
    .controller('UserRightNavController', UserRightNavController);

  UserRightNavController.$inject = ['Authentication', '$state', '$mdComponentRegistry' ];

  function UserRightNavController(Authentication, $state, $mdComponentRegistry) {
    var vm = this;

    vm.authentication = Authentication;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav){
        vm.navigation = nav;
      });


    console.log('UserRightNavController::Init::vm', vm);
  }
})();
