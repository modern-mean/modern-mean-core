(function() {
  'use strict';

  describe('core.client.directive.page.title.js', function() {
    var $compile,
      $rootScope,
      $state,
      $scope,
      $templateCache;

    beforeEach(module());

    beforeEach(inject(function(_$compile_, _$rootScope_, _$state_, _$templateCache_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $templateCache = _$templateCache_;
      $scope = $rootScope.$new();
    }));

    it('should inject the state.data.pageTitle into DOM', function() {
      var element = $compile('<div page-title></div>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).to.equal('Modern MEAN - Welcome');
    });

    it('should inject the core page title constant into DOM if page title doesnt exist on the state', function() {
      $state.get('root.home').data.pageTitle = undefined;
      var element = $compile('<div page-title></div>')($rootScope);
      $state.transitionTo('root.home');
      $rootScope.$digest();
      expect(element.html()).to.equal('Modern MEAN');
    });
  });
})();
