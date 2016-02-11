(function(window) {
  'use strict';

  window.modernMeanApplication.registerModule('core', []);
  window.modernMeanApplication.registerModule('core.routes', ['ui.router']);
  window.modernMeanApplication.registerModule('core.admin', []);
  window.modernMeanApplication.registerModule('core.admin.routes', ['core.routes']);
  
})(window);
