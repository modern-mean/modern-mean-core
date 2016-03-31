(function() {
  'use strict';

  describe('user.client.service.password.validator.js', function () {

    var $rootScope,
      PasswordValidator,
      $window;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, _PasswordValidator_, _$window_) {
      $rootScope = _$rootScope_;
      PasswordValidator = _PasswordValidator_;
      $window = _$window_;
    }));

    describe('PasswordValidator', function () {

      it('should have an property getResult', function () {
        expect(PasswordValidator.getResult).to.be.a('function');
      });

      describe('getResult()', function () {
        it('should return an object with properties', function () {
          var result = PasswordValidator.getResult('test');
          expect(result).to.be.an('object');
          expect(result).to.include.keys('errors');
          expect(result).to.include.keys('failedTests');
          expect(result).to.include.keys('passedTests');
          expect(result).to.include.keys('requiredTestErrors');
          expect(result).to.include.keys('optionalTestErrors');
          expect(result).to.include.keys('isPassphrase');
          expect(result).to.include.keys('optionalTestsPassed');
          expect(result).to.include.keys('strong');
        });
      });

      it('should have an property getPopoverMsg', function () {
        expect(PasswordValidator.getPopoverMsg).to.be.a('function');
      });

      describe('getPopoverMsg()', function () {
        it('should return a string', function () {
          var result = PasswordValidator.getPopoverMsg('test');
          expect(result).to.equal('Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.');
        });
      });

    });
  });
})();
