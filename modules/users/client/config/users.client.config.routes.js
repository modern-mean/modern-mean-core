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
        }
      })
      .state('root.user.settings', {
        abstract: true,
        url: '/settings',
        views: {
          'leftnav@': {
            controller: 'SettingsController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/settings/users.client.views.settings.html',
          }
        }
      })
      .state('root.user.settings.profile', {
        url: '/profile',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/settings/users.client.views.edit-profile.html',
            controller: 'EditProfileController',
            controllerAs: 'vm',
          }
        },
        data: {
          pageTitle: 'Edit Profile'
        }
      })
      .state('root.user.settings.password', {
        url: '/password',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/settings/users.client.views.change-password.html',
            controller: 'ChangePasswordController',
            controllerAs: 'vm',
          }
        },
        data: {
          pageTitle: 'Change Password'
        }
      })
      .state('root.user.settings.accounts', {
        url: '/accounts',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/settings/users.client.views.manage-social-accounts.html',
            controller: 'SocialAccountsController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Manage Social Accounts'
        }
      })
      .state('root.user.settings.picture', {
        url: '/picture',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/settings/users.client.views.change-profile-picture.html',
            controller: 'ChangeProfilePictureController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Change Profile Picture'
        }
      })
      .state('root.user.authentication', {
        abstract: true,
        url: '/authentication',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.html',
            controller: 'AuthenticationController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.user.authentication.signup', {
        url: '/signup',
        views: {
          'authform@root.user.authentication': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.signup.html'
          }
        },
        data: {
          ignoreAuth: true,
          pageTitle: 'Account Sign Up'
        }
      })
      .state('root.user.authentication.signin', {
        url: '/signin?err',
        views: {
          'authform@root.user.authentication': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.signin.html'
          }
        },
        data: {
          ignoreAuth: true,
          pageTitle: 'Account Sign In'
        }
      })
      .state('root.signout', {
        url: '/signout',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.signout.html'
          }
        },
        data: {
          ignoreAuth: true,
          pageTitle: 'Signed Out'
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

    console.log('Users::Routes::Loaded', $stateProvider);
  }
})();
