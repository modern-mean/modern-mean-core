(function() {
  'use strict';

  angular
    .module('users')
    .controller('SocialAccountsController', SocialAccountsController);

  SocialAccountsController.$inject = ['Authentication', '$http', '$scope'];

  function SocialAccountsController(Authentication, $http, $scope) {
    var vm = this;

    vm.user = Authentication.user;

    // Check if there are additional accounts
    vm.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in vm.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    vm.isConnectedSocialAccount = function (provider) {
      return vm.user.provider === provider || (vm.user.additionalProvidersData && vm.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = vm.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        vm.success = true;
        vm.user = Authentication.user = response;
      }).error(function (response) {
        vm.error = response.message;
      });
    };
  }
})();
