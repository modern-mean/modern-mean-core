(function() {
  'use strict';

  describe('user.client.controller.settings.email.js', function () {

    var $scope,
      $rootScope,
      $compile,
      $mdToast,
      UsersEmailController,
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


      UsersEmailController = $controller('UsersEmailController as vm', {
        $scope: $scope
      });

      $mdToast = _$mdToast_;
      $httpBackend = _$httpBackend_;
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('UsersEmailController', function () {

      it('should have a vm variable', function () {
        expect($scope.vm).to.be.an('object');
      });

      describe('vm', function () {

        it('should have a property add that is a function', function () {
          expect($scope.vm.add).to.be.a('function');
        });

        describe('add()', function () {

          it('should add a value to the users array.', function () {
            $scope.vm.user.emails = [];
            var prevLength = $scope.vm.user.emails.length;
            $scope.vm.add();
            expect($scope.vm.user.emails.length).to.equal(prevLength + 1);
          });

        });

        it('should have a property clear that is a function', function () {
          expect($scope.vm.clear).to.be.a('function');
        });

        describe('clear()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.emailForm"></form>')($scope);
          }));

          it('should refresh the user', function () {
            $scope.vm.user.test = 'test';
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.clear();
            $scope.$digest();
            $httpBackend.flush();

            expect($scope.vm.user.test).to.equal('sure');
          });

        });

        it('should have a property remove that is a function', function () {
          expect($scope.vm.remove).to.be.a('function');
        });

        describe('remove()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.emailForm"></form>')($scope);
          }));

          it('should remove email from user', function () {
            var email = { email: 'test@test.com', primary: false };
            $scope.vm.user.emails = [];
            $scope.vm.user.emails.push(email);
            $scope.vm.remove(email);
            expect($scope.vm.user.emails.indexOf(email)).to.equal(-1);
          });

          it('should set form pristine to false', function () {
            var email = { email: 'test@test.com', primary: false };
            $scope.vm.user.emails = [];
            $scope.vm.remove(email);
            expect($scope.vm.forms.emailForm.$pristine).to.equal(false);
          });

        });

        it('should have a property save that is a function', function () {
          expect($scope.vm.save).to.be.a('function');
        });

        describe('save()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.emailForm"></form>')($scope);
          }));

          it('should put to server, reset the form, and toast', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');

            $scope.vm.user.test = 'test';
            $httpBackend.expectPUT('/api/me').respond(200, { message: 'Yippee' });
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            expect(toastSpy).to.be.called;
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

      it('should have a property togglePrimary that is a function', function () {
        expect($scope.vm.togglePrimary).to.be.a('function');
      });

      describe('togglePrimary()', function () {

        it('should set the given email to primary', function () {
          var email = { email: 'test@test.com', primary: true };
          var email1 = { email: 'test@test.com', primary: false };
          $scope.vm.user.emails = [];
          $scope.vm.user.emails.push(email);
          $scope.vm.user.emails.push(email1);
          $scope.vm.togglePrimary(email1);
          expect($scope.vm.user.emails[0].primary).to.equal(false);
          expect($scope.vm.user.emails[1].primary).to.equal(true);
        });

      });


    });
  });
})();
