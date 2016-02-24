(function(window) {
  'use strict';

  angular
    .module('core')
    .constant('AUTH_EVENTS', {
      loginSuccess: window.modernMeanApplication.name + '-auth-login-success',
      loginFailed: window.modernMeanApplication.name + '-auth-login-failed',
      logoutSuccess: window.modernMeanApplication.name + '-auth-logout-success'
    });

})(window);
