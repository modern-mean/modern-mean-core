(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersRightNavController', UsersRightNavController);

  UsersRightNavController.$inject = ['Authentication', '$state', '$mdComponentRegistry', '$mdToast', '$log'];

  function UsersRightNavController(Authentication, $state, $mdComponentRegistry, $mdToast, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.signout = signout;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation = nav;
      });


    function signout() {
      $log.debug('UserRightNavController::signout', vm);
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
          $log.debug('UserRightNavController::success', Authentication);
        });

    }


    $log.info('UserRightNavController::Init', vm);
  }
})();
