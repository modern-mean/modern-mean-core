(function(window, document, angular) {
  'use strict';

  window.modernMeanApplication = {
    name: 'modernMean',
    dependencies: ['ngResource', 'ui.router', 'ngSanitize', 'ngMaterial', 'ngMessages', 'ngAria', 'ngMdIcons', 'angular-google-analytics', 'ngLodash'],
    registerModule: registerModule
  };

  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(window.modernMeanApplication.name).requires.push(moduleName);
    console.log('Module::Init::a' + moduleName, angular.module(moduleName));
  }

  //Start by defining the main module and adding the module dependencies
  window.modernMeanApplication.registerModule(window.modernMeanApplication.name, window.modernMeanApplication.dependencies);

  //Then define the init function for starting up the application
  angular
    .element(document)
    .ready(function () {
      angular
        .bootstrap(document, [window.modernMeanApplication.name]);
    });

})(window, document, angular);
