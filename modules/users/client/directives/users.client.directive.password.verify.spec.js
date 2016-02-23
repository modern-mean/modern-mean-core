(function() {
  'use strict';

  describe('users.client.directive.password.validator.js', function() {
    var $compile,
      $rootScope,
      $state,
      $scope,
      $templateCache;

    beforeEach(module('users'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$state_, _$templateCache_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $templateCache = _$templateCache_;
      $scope = $rootScope.$new();

      var element = angular.element(
        '<form name="form">' +
        '<input name="password1" ng-model="passwords.newPassword" />' +
        '<input name="password2" ng-model="passwords.verifyPassword" password-verify="passwords" />' +
        '</form>'
      );

      $compile(element)($scope);

      $scope.passwords = {
        newPassword: '',
        verifyPassword: ''
      };


    }));

    it('should set form.$invalid to true if passwords do not match', function() {
      $scope.form.password1.$setViewValue('Test1234!');
      $scope.form.password2.$setViewValue('Test1234!!');
      $scope.$digest();

      expect($scope.form.$invalid).to.equal(true);
    });

    it('should set form.$invalid to true if passwords match', function() {
      $scope.form.password1.$setViewValue('test');
      $scope.form.password2.$setViewValue('test');
      $scope.$digest();

      expect($scope.form.$valid).to.equal(true);
    });





  });
})();
