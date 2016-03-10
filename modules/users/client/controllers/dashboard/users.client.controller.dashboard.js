(function() {
  'use strict';

  angular
    .module('users')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['Authentication'];

  function DashboardController(Authentication) {
    var vm = this;

    vm.user = Authentication.user;

  }
})();
