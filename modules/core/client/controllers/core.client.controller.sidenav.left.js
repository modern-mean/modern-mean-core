(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavLeftController', SideNavLeftController);

  SideNavLeftController.$inject = ['$mdComponentRegistry'];

  function SideNavLeftController($mdComponentRegistry) {
    var vm = this;

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation = nav;
      });


    console.log('SideNavLeftController::Init', vm);
  }
})();
