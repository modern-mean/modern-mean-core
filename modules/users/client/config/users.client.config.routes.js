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
      .state('root.user.dashboard', {
        url: '/dashboard',
        data: {
          pageTitle: "User Dashboard"
        },
        views: {
          'main@': {
            controller: 'DashboardController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/dashboard/users.client.views.dashboard.html'
          }
        }
      })
      .state('root.user.settings', {
        abstract: true,
        url: '/settings'
      })
      .state('root.user.settings.profile', {
        url: '/profile',
        data: {
          pageTitle: 'Edit Profile'
        },
        views: {
          'main@': {
            controller: 'EditProfileController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/settings/users.client.views.edit-profile.html'
          }
        }
      })
      .state('root.user.settings.password', {
        url: '/password',
        data: {
          pageTitle: 'Change Password'
        },
        views: {
          'main@': {
            controller: 'ChangePasswordController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/settings/users.client.views.change-password.html'
          }
        }
      })
      .state('root.user.settings.accounts', {
        url: '/accounts',
        data: {
          pageTitle: 'Manage Social Accounts'
        },
        views: {
          'main@': {
            controller: 'SocialAccountsController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/settings/users.client.views.manage-social-accounts.html'
          }
        }
      })
      .state('root.user.settings.picture', {
        url: '/picture',
        data: {
          pageTitle: 'Change Profile Picture'
        },
        views: {
          'main@': {
            controller: 'ChangeProfilePictureController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/settings/users.client.views.change-profile-picture.html'
          }
        }
      })
      .state('root.user.authentication', {
        abstract: true,
        url: '/authentication',
        views: {
          'main@': {
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.html'
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
        data: {
          ignoreAuth: true,
          pageTitle: 'Signed Out'
        },
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/authentication/users.client.views.signout.html'
          }
        }
      })
      .state('root.user.password', {
        abstract: true,
        url: '/password',
        data: {
          ignoreAuth: true
        }
      })
      .state('root.user.password.forgot', {
        url: '/forgot',
        data: {
          pageTitle: 'Forgot Password'
        },
        views: {
          'main@': {
            controller: 'PasswordController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/password/users.client.views.forgot-password.html'
          }
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
        data: {
          pageTitle: 'Password Reset Form'
        },
        views: {
          'main@': {
            controller: 'PasswordController',
            controllerAs: 'vm',
            templateUrl: 'modules/users/client/views/password/users.client.views.reset-password.html'
          }
        }
      });

    console.log('Users::Routes::Loaded', $stateProvider);
  }
})();
