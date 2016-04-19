(function() {
  'use strict';

  angular
    .module('core')
    .config(logging);

  logging.$inject = ['$provide', 'CORE_CONSTANTS'];
  function logging($provide, CORE_CONSTANTS) {
    $provide.decorator('$log', function ($delegate) {
      /* istanbul ignore if  */
      if(!CORE_CONSTANTS.logs.levels.debug) {
        $delegate.debug = function () { return true; };
      }
      /* istanbul ignore if  */
      if(!CORE_CONSTANTS.logs.levels.info) {
        $delegate.info = function () { return true; };
      }
      /* istanbul ignore if  */
      if(!CORE_CONSTANTS.logs.levels.warn) {
        $delegate.warn = function () { return true; };
      }
      /* istanbul ignore if  */
      if(!CORE_CONSTANTS.logs.levels.error) {
        $delegate.error = function () { return true; };
      }

      return $delegate;
    });
  }

})();
