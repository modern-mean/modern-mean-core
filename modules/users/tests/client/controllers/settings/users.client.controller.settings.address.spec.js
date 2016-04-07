(function() {
  'use strict';

  describe('user.client.controller.settings.address.js', function () {

    var $scope,
      $rootScope,
      $compile,
      $mdToast,
      $mdDialog,
      UsersAddressController,
      Authentication,
      $httpBackend,
      User,
      sandbox;


    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, $controller, _Authentication_, _$httpBackend_, _User_, _$mdToast_, _$mdDialog_) {
      $rootScope = _$rootScope_;
      Authentication = _Authentication_;
      User = _User_;
      $scope = $rootScope.$new();


      UsersAddressController = $controller('UsersAddressController as vm', {
        $scope: $scope
      });

      $mdToast = _$mdToast_;
      $mdDialog = _$mdDialog_;
      $httpBackend = _$httpBackend_;
      sandbox = sinon.sandbox.create();
    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('UsersAddressController', function () {

      it('should have a vm variable', function () {
        return $scope.vm.should.be.an('object');
      });

      describe('vm', function () {

        it('should have a property address that is an object', function () {
          return $scope.vm.address.should.be.an('object');
        });

        it('should have a property clear that is a function', function () {
          return $scope.vm.clear.should.be.a('function');
        });

        describe('clear()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.addressForm"></form>')($scope);
          }));

          it('should refresh the user', function () {
            $scope.vm.user.test = 'test';
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.clear();
            $scope.$digest();
            $httpBackend.flush();

            return $scope.vm.user.test.should.equal('sure');
          });

          it('should reset address object', function () {
            $scope.vm.address.test = 'test';
            $scope.vm.clear();
            return expect($scope.vm.address.test).to.not.exist;
          });

          it('should set editing to false', function () {
            $scope.vm.editing = true;
            $scope.vm.clear();
            return $scope.vm.editing.should.equal(false);
          });

          it('should reset the form', function () {
            var pristineSpy = sandbox.spy($scope.vm.forms.addressForm, '$setPristine');
            var touchedSpy = sandbox.spy($scope.vm.forms.addressForm, '$setUntouched');
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.clear();
            $scope.$digest();
            $httpBackend.flush();

            pristineSpy.should.be.called;
            return touchedSpy.should.be.called;
          });

        });

        it('should have a property edit that is a function', function () {
          return $scope.vm.edit.should.be.a('function');
        });

        describe('edit()', function () {

          it('should take an argument and set the vm.address variable', function () {
            var address = { test: 'test' };
            $scope.vm.edit(address);
            return $scope.vm.address.should.equal(address);
          });

          it('should set vm.editing to true', function () {
            var address = { test: 'test' };
            $scope.vm.edit(address);
            return $scope.vm.editing.should.equal(true);
          });

        });

        it('should have a property remove that is a function', function () {
          return $scope.vm.remove.should.be.a('function');
        });

        describe('remove()', function () {
          var dialogStub;

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.addressForm"></form>')($scope);

          }));

          it('should create a confirm dialog', function () {
            var address = { test: 'test' };
            var confirmSpy = sandbox.spy($mdDialog, 'confirm');
            $scope.vm.remove(address);
            return confirmSpy.should.have.been.called;
          });

          it('should show a confirm dialog', function () {
            var address = { test: 'test' };
            var confirmSpy = sandbox.spy($mdDialog, 'show');
            $scope.vm.remove(address);
            return confirmSpy.should.have.been.called;
          });


          it('should remove an address from vm.user.addresses', function () {
            var address = { test: 'test' };
            var address1 = { test1: 'test' };
            var confirmStub = sandbox.stub($mdDialog, 'show').resolves();
            $scope.vm.user.addresses = [];
            $scope.vm.user.addresses.push(address);
            $scope.vm.user.addresses.push(address1);
            return $scope.vm.remove(address)
              .then(function () {
                return $scope.vm.user.addresses.length.should.be.equal(1);
              });

          });

          it('should save the user', function () {
            var address = { test: 'test' };
            var address1 = { test1: 'test' };
            var confirmStub = sandbox.stub($mdDialog, 'show').resolves();
            var saveSpy = sandbox.spy($scope.vm, 'save');
            $scope.vm.user.addresses = [];
            $scope.vm.user.addresses.push(address);
            $scope.vm.user.addresses.push(address1);
            return $scope.vm.remove(address)
              .then(function () {
                return saveSpy.should.have.been.called;
              });

          });

        });

        it('should have a property save that is a function', function () {
          return $scope.vm.save.should.be.a('function');
        });

        describe('save()', function () {

          beforeEach(inject(function (_$compile_) {
            $compile = _$compile_;
            $compile('<form name="vm.forms.addressForm"></form>')($scope);
          }));

          it('should set executing to true', function () {
            $scope.vm.executing = false;
            $scope.vm.save();
            return $scope.vm.executing.should.be.equal(true);
          });

          it('should append to user addresses if vm.address is valid', function () {
            $scope.vm.user.addresses = [];
            $scope.vm.address = { test: 'test' };
            $scope.vm.save();
            return $scope.vm.user.addresses.length.should.equal(1);
          });

          it('should put to server, reset the form, and toast', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');

            $scope.vm.user.test = 'test';
            $httpBackend.expectPUT('/api/me/addresses').respond(200, { message: 'Yippee' });
            $httpBackend.expectGET('/api/me').respond(200, { test: 'sure' });
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            toastSpy.should.be.called;
            return $scope.vm.user.test.should.equal('sure');
          });

          it('should put to server and toast on error', function () {
            var toastSpy = sandbox.spy($mdToast, 'show');
            $httpBackend.expectPUT('/api/me/addresses').respond(400, { message: 'Oops' });
            $scope.vm.save();
            $scope.$digest();
            $httpBackend.flush();

            return toastSpy.should.be.called;
          });

        });

      });

    });

  });

})();
