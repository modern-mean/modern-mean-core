(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersPictureController', UsersPictureController);

  UsersPictureController.$inject = ['Authentication', 'Upload', '$mdToast', '$log'];

  function UsersPictureController(Authentication, Upload, $mdToast, $log) {
    var vm = this;

    vm.clear = clear;
    vm.file = undefined;
    vm.save = save;
    vm.user = Authentication.user;

    function clear() {
      vm.file = undefined;
    }

    function save() {
      $log.debug('UsersPictureController::save', vm);
      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Upload.upload({
        url: '/api/me/picture',
        data: { newProfilePicture: vm.file },
        headers: {
          Authorization: 'JWT ' + Authentication.token
        }
      })
      .then(function (response) {
        vm.file = undefined;
        Authentication.user.$get();
        toast.textContent('Profile Picture Updated Successfully!').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersPictureController::save::success', response);
      }, function (err) {
        toast.textContent('Profile Picture Update Error!').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersPictureController::save::error', err);
      });
    }

  }
})();
