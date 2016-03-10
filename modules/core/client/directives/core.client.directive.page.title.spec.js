(function() {
  'use strict';

  describe('core.client.directive.page.title.js', function() {
    var $compile,
      $rootScope,
      $state,
      $scope,
      $templateCache;

    beforeEach(module('core'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$state_, _$templateCache_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $templateCache = _$templateCache_;
      $scope = $rootScope.$new();
    }));

    it('should inject the state.data.pageTitle into DOM', function() {
      $templateCache.put('modules/core/client/views/core.client.views.home.html', '<div></div>');

      var element = $compile('<div page-title></div>')($rootScope);

      $rootScope.$digest();

      expect(element.html()).to.equal('Modern MEAN - Welcome');
    });

    it('should inject the core page title constant into DOM if page title doesnt exist on the state', function() {
      $templateCache.put('modules/core/client/views/core.client.views.home.html', '<div></div>');
      $state.get('root.home').data.pageTitle = undefined;
      $state.transitionTo('root.home');

      var element = $compile('<div page-title></div>')($rootScope);

      $scope.$digest();

      expect(element.html()).to.equal('Modern MEAN');
    });
  });
})();
