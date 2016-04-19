(function() {
  'use strict';

  // Setting up route
  angular
    .module('users')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('root.user', {
        abstract: true,
        url: '/user',
        data: {
          roles: ['user', 'admin']
        },
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/settings/users.client.views.settings.grid.html'
          }
        }
      })
      .state('root.user.settings', {
        url: '/settings',
        views: {
          'address': {
            templateUrl: 'modules/users/client/views/cards/users.client.views.cards.addresses.html',
            controller: 'UsersAddressController',
            controllerAs: 'vm'
          },
          'email': {
            templateUrl: 'modules/users/client/views/cards/users.client.views.cards.emails.html',
            controller: 'UsersEmailController',
            controllerAs: 'vm'
          },
          'profile': {
            templateUrl: 'modules/users/client/views/cards/users.client.views.cards.profile.html',
            controller: 'UsersProfileController',
            controllerAs: 'vm'
          },
          'password': {
            templateUrl: 'modules/users/client/views/cards/users.client.views.cards.password.html',
            controller: 'UsersPasswordController',
            controllerAs: 'vm',
          },
          'picture': {
            templateUrl: 'modules/users/client/views/cards/users.client.views.cards.picture.html',
            controller: 'UsersPictureController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.user.authentication', {
        abstract: true,
        url: '/authentication',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.html',
          }
        }
      })
      .state('root.user.authentication.signup', {
        url: '/signup',
        views: {
          'social': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.social.html',
            controller: 'SocialAuthenticationController',
            controllerAs: 'vm'
          },
          'auth': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.signup.html',
            controller: 'SignupAuthenticationController',
            controllerAs: 'vm'
          }
        },
        data: {
          ignoreAuth: true,
          pageTitle: 'Account Sign Up'
        }
      })
      .state('root.user.authentication.signin', {
        url: '/signin',
        views: {
          'social': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.social.html',
            controller: 'SocialAuthenticationController',
            controllerAs: 'vm'
          },
          'auth': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.signin.html',
            controller: 'SigninAuthenticationController',
            controllerAs: 'vm'
          }
        },
        data: {
          ignoreAuth: true,
          pageTitle: 'Account Sign In'
        }
      })
      .state('root.user.password', {
        abstract: true,
        url: '/password'
      })
      .state('root.user.password.forgot', {
        url: '/forgot',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/password/users.client.views.forgot-password.html',
            controller: 'PasswordController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Forgot Password'
        }
      })
      .state('root.user.password.reset', {
        abstract: true,
        url: '/reset'
      })
      .state('root.user.password.reset.invalid', {
        url: '/invalid',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/password/users.client.views.reset-password-invalid.html'
          }
        }
      })
      .state('root.user.password.reset.success', {
        url: '/success',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/password/users.client.views.reset-password-success.html'
          }
        }
      })
      .state('root.user.password.reset.form', {
        url: '/:token',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/password/users.client.views.reset-password.html',
            controller: 'PasswordController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Password Reset Form'
        }
      });
  }
})();
