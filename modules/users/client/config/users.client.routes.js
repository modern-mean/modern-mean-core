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
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/users.client.views.settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/users.client.views.edit-profile.html',
        controller: 'EditProfileController',
        controllerAs: 'vm'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/users.client.views.change-password.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/users.client.views.manage-social-accounts.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/users.client.views.change-profile-picture.html',
        controller: 'ChangeProfilePictureController',
        controllerAs: 'vm'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/users.client.views.authentication.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/users.client.views.signup.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/users.client.views.signin.html'
      })
      .state('signout', {
        url: '/signout',
        templateUrl: 'modules/users/client/views/authentication/users.client.views.signout.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/users.client.views.forgot-password.html',
        controller: 'PasswordController',
        controllerAs: 'vm'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/users.client.views.reset-password-invalid.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/users.client.views.reset-password-success.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/users.client.views.reset-password.html',
        controller: 'PasswordController',
        controllerAs: 'vm'
      });

    console.log('Users::Routes::Loaded', $stateProvider);
  }
})();
