(function() {
  'use strict';

  describe('user.client.controller.settings.password.js', function () {

    var $scope,
      $rootScope,
      $compile,
      $mdToast,
      UsersPasswordController,
      Authentication,
      $httpBackend,
      sandbox;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _$mdToast_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      UsersPasswordController = $controller('UsersPasswordController as vm', {
        $scope: $scope
      });
      Authentication = _Authentication_;
      $httpBackend = _$httpBackend_;
      $mdToast = _$mdToast_;
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('UsersPasswordController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property clear that is a function', function () {
          expect($scope.vm.clear).to.be.an('function');
        });

        describe('clear()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.passwordForm"></form>')($scope);
          }));

          it('should clear the password', function () {
            $scope.vm.password.newPassword = 'test';
            $scope.vm.clear();
            expect($scope.vm.password.newPassword).to.not.exist;
          });

          it('should reset the form', function () {
            var pristineSpy = sandbox.spy($scope.vm.forms.passwordForm, '$setPristine');
            var touchedSpy = sandbox.spy($scope.vm.forms.passwordForm, '$setUntouched');
            $scope.vm.clear();
            expect(pristineSpy).to.be.called;
            expect(touchedSpy).to.be.called;
          });

        });

        it('should have a property save that is a function', function () {
          expect($scope.vm.save).to.be.an('function');
        });

        describe('save()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.passwordForm"></form>')($scope);
          }));

          it('should post to server, clear, and toast', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');
            var clearSpy = sandbox.spy($scope.vm, 'clear');
            $httpBackend.expectPOST('/api/me/password').respond(200, { message: 'Yippee' });
            $scope.vm.password.newPassword = 'test';
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            expect(toastSpy).to.be.called;
            expect(clearSpy).to.be.called;
          });

          it('should post to server and toast', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');

            $httpBackend.expectPOST('/api/me/password').respond(400, { message: 'Oops' });
            $scope.vm.password.newPassword = 'test';
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.password.newPassword).to.equal('test');
            expect(toastSpy).to.be.called;
          });
        });

      });


    });
  });
})();
