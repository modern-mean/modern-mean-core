(function() {
  'use strict';

  angular
    .module('users')
    .controller('SocialAccountsController', SocialAccountsController);

  SocialAccountsController.$inject = ['Authentication'];

  function SocialAccountsController(Authentication) {
    var vm = this;

    vm.providers = [
      {
        name: 'facebook',
        image: '/dist/img/users/client/img/buttons/facebook.png'
      },
      {
        name: 'twitter',
        image: '/dist/img/users/client/img/buttons/twitter.png'
      },
      {
        name: 'google',
        image: '/dist/img/users/client/img/buttons/google.png'
      },
      {
        name: 'github',
        image: '/dist/img/users/client/img/buttons/github.png'
      },
      {
        name: 'linkedin',
        image: '/dist/img/users/client/img/buttons/linkedin.png'
      },
      {
        name: 'paypal',
        image: '/dist/img/users/client/img/buttons/paypal.png'
      }
    ];

    vm.remove = remove;
    vm.user = Authentication.user;


    function remove(provider) {
      vm.success = vm.error = undefined;
    }
  }
})();
