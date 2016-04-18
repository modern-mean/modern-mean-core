(function(app) {
  'use strict';

  app.registerModule('users', ['core', 'ngFileUpload']);
  app.registerModule('users.routes', ['core.routes']);
  app.registerModule('users.admin', []);
  app.registerModule('users.admin.routes', ['core.routes']);

})(window.modernMeanApplication);
