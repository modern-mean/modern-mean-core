(function() {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['Authentication'];

  function SettingsController(Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
})();
