(function() {
  'use strict';

  var $rootScope,
    $state,
    $compile,
    $mdComponentRegistry;

  describe('core.client.run.stateChangeStart.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_$rootScope_, _$state_, _$compile_ ,_$mdComponentRegistry_) {
      $rootScope = _$rootScope_;
      $state = _$state_;
      $compile = _$compile_;
      $mdComponentRegistry = _$mdComponentRegistry_;
    }));

    describe('on stateChangeStart', function () {

      it('should close right navigation', function () {
        $compile('<md-sidenav md-component-id="coreRightNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($rootScope);
        $rootScope.$digest();

        var rightNav = $mdComponentRegistry.get('coreRightNav');
        rightNav.open();
        $rootScope.$broadcast('$stateChangeStart', $state.get('root.not-found'), { test: 'test' }, $state.get('root.home'), { test: 'test' });
        $rootScope.$digest();

        return expect(rightNav.isOpen()).to.equal(false);
      });

      it('should close left navigation', function () {
        $compile('<md-sidenav md-component-id="coreLeftNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($rootScope);
        $rootScope.$digest();

        var leftNav = $mdComponentRegistry.get('coreLeftNav');
        leftNav.open();
        $rootScope.$broadcast('$stateChangeStart', $state.get('root.not-found'), { test: 'test' }, $state.get('root.home'), { test: 'test' });
        $rootScope.$digest();

        return expect(leftNav.isOpen()).to.equal(false);
      });

    });

  });
})();
