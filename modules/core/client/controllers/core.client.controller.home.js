(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$log'];

  function HomeController($log) {
    var vm = this;

    $log.info('HomeController::Init', vm);
  }
})();
