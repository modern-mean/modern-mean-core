(function(window, angular) {
  'use strict';

  window.modernMeanApplication.registerModule('users', ['core', 'ngFileUpload']);
  window.modernMeanApplication.registerModule('users.routes', ['core.routes']);
  window.modernMeanApplication.registerModule('users.admin', ['core.admin']);
  window.modernMeanApplication.registerModule('users.admin.routes', ['core.admin.routes']);

})(window, angular);
