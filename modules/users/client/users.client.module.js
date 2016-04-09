(function(window, angular) {
  'use strict';

  window.modernMeanApplication.registerModule('users', ['core', 'ngFileUpload']);
  window.modernMeanApplication.registerModule('users.routes', ['core.routes']);
  window.modernMeanApplication.registerModule('users.admin', []);
  window.modernMeanApplication.registerModule('users.admin.routes', ['core.routes']);

})(window, angular);
