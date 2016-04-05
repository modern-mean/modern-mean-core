(function() {
  'use strict';

  describe('user.client.controller.settings.profile.js', function () {

    var $scope,
      $rootScope,
      $compile,
      $mdToast,
      UsersProfileController,
      Authentication,
      $httpBackend,
      User,
      sandbox;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _User_, _$mdToast_) {
      $rootScope = _$rootScope_;
      Authentication = _Authentication_;
      User = _User_;
      $scope = $rootScope.$new();


      UsersProfileController = $controller('UsersProfileController as vm', {
        $scope: $scope,
        Authentication: Authentication
      });

      $mdToast = _$mdToast_;
      $httpBackend = _$httpBackend_;
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('UsersProfileController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property clear that is a function', function () {
          expect($scope.vm.clear).to.be.a('function');
        });

        describe('clear()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.profileForm"></form>')($scope);
          }));

          it('should refresh the user', function () {
            $scope.vm.user.test = 'test';
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.clear();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.user.test).to.equal('sure');
          });

          it('should reset the form', function () {
            var pristineSpy = sandbox.spy($scope.vm.forms.profileForm, '$setPristine');
            var touchedSpy = sandbox.spy($scope.vm.forms.profileForm, '$setUntouched');
            $httpBackend.expectGET('/api/me').respond(200, { name: { first: 'sure' } });
            $scope.vm.clear();
            $scope.$digest();
            $httpBackend.flush();

            expect(pristineSpy).to.be.called;
            expect(touchedSpy).to.be.called;
          });

        });

        it('should have a property save that is a function', function () {
          expect($scope.vm.save).to.be.a('function');
        });

        describe('save()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.profileForm"></form>')($scope);
          }));

          it('should put to server, reset the form, and toast', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');
            var clearSpy = sandbox.spy($scope.vm, 'clear');
            $scope.vm.user.test = 'test';
            $httpBackend.expectPUT('/api/me').respond(200, { message: 'Yippee' });
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            expect(toastSpy).to.be.called;
            expect(clearSpy).to.be.called;
            expect($scope.vm.user.test).to.equal('sure');
          });

          it('should put to server and toast on error', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');
            $httpBackend.expectPUT('/api/me').respond(400, { message: 'Oops' });
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            expect(toastSpy).to.be.called;
          });
        });

      });


    });
  });
})();
