(function() {
  'use strict';

  var $state,
    $scope,
    $rootScope,
    $compile,
    UsersRightNavController,
    Authentication;

  var sandbox;

  describe('users.client.controller.navigation.rightnav.js', function () {

    beforeEach(module('users'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$compile_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $compile = _$compile_;

      UsersRightNavController = $controller('UsersRightNavController as vm', {
        $scope: $scope
      });

      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('UsersRightNavController', function () {
      it('should have a vm variable that is an object', function () {
        expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.authentication property that is an object', function () {
        expect($scope.vm.authentication).to.be.an('object');
      });

      it('should have a vm.navigation variable that is an object', function () {
        var element = $compile('<md-sidenav md-component-id="coreRightNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($scope);
        $scope.$digest();
        return expect($scope.vm.navigation).to.be.an('object');
      });

      it('should have a vm.signout property that is a function', function () {
        expect($scope.vm.signout).to.be.a('function');
      });

      describe('signout()', function () {

        beforeEach(inject(function (_Authentication_) {
          Authentication = _Authentication_;
          Authentication.token = 'asdf';
          $compile('<md-sidenav md-component-id="coreRightNav" class="md-sidenav-right md-whiteframe-z2"></md-sidenav>')($rootScope);
          $rootScope.$digest();
        }));

        it('should redirect to signin route', function () {
          var spy = sandbox.spy($state, 'go');
          $scope.vm.signout();
          $scope.$digest();
          expect(spy).to.have.been.calledWith('root.user.authentication.signin');
        });


      });

    });

  });

})();
