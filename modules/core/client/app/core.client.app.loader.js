(function(window, document, angular) {
  'use strict';

  window.modernMeanApplication = {
    name: 'modernMean',
    dependencies: ['ngResource', 'ui.router', 'ngSanitize', 'ngMaterial'],
    registerModule: registerModule
  };

  function registerModule(moduleName, dependencies) {
    // Create angular module
    console.log('Load');
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(window.modernMeanApplication.name).requires.push(moduleName);
    console.log('Module::Init::' + moduleName, angular.module(moduleName));
  }

  //Start by defining the main module and adding the module dependencies
  window.modernMeanApplication.registerModule(window.modernMeanApplication.name, window.modernMeanApplication.dependencies);

  //Then define the init function for starting up the application
  angular
    .element(document.body)
    .ready(function () {
      angular
        .bootstrap(document.body, [window.modernMeanApplication.name]);
    });

})(window, document, angular);
