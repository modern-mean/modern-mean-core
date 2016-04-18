(function(app) {
  'use strict';

  app.registerModule('core', [app.name]);
  app.registerModule('core.routes', ['ui.router']);

})(window.modernMeanApplication);
