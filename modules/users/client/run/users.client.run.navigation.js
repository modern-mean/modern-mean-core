(function() {
  'use strict';

  angular
    .module('users.routes')
    .run(navigationConfig);

  navigationConfig.$inject = ['$state', '$log'];

  function navigationConfig($state, $log) {

    var rootState = $state.get('root');
    rootState.views.rightnav.templateUrl = 'modules/users/client/views/navigation/users.client.views.navigation.rightnav.html';
    rootState.views.rightnav.controller = 'UsersRightNavController';
    rootState.views.header.templateUrl = 'modules/users/client/views/navigation/users.client.views.navigation.header.html';
    rootState.views.header.controller = 'UsersHeaderController';

    $log.info('Users::navigationConfig::Init', rootState);
  }

})();
