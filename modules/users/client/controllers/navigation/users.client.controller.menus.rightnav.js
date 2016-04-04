(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersRightNavController', UsersRightNavController);

  UsersRightNavController.$inject = ['Authentication', '$state', '$mdComponentRegistry', '$mdToast'];

  function UsersRightNavController(Authentication, $state, $mdComponentRegistry, $mdToast) {
    var vm = this;

    vm.authentication = Authentication;
    vm.signout = signout;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        console.log('yippeee', nav);
        vm.navigation = nav;
      });


    function signout() {
      vm.navigation
        .close()
        .then(Authentication.signout)
        .then(function () {
          $state.go('root.user.authentication.signin');
          var toast = $mdToast.simple()
            .textContent('Signout Successful!')
            .position('bottom right')
            .hideDelay(6000)
            .theme('toast-success');

          $mdToast.show(toast);
        });

    }


    console.log('UserRightNavController::Init::vm', vm);
  }
})();
