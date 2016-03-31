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
        '<input ng-model="password" name="password" password-validator />' +
        '</form>'
      );

      $compile(element)($scope);


    }));

    it('should set form.$valid to true if there is no password', function() {

      $scope.$digest();

      expect($scope.form.$valid).to.equal(true);
    });

    it('should set form.$valid to false password is too short', function() {

      $scope.form.password.$setViewValue('test');
      $scope.$digest();

      expect($scope.form.$valid).to.equal(false);
    });

    it('should set form.$valid to false password requirement is not met', function() {

      $scope.form.password.$setViewValue('test1111aaaN');
      $scope.$digest();

      expect($scope.form.$valid).to.equal(false);
    });

    it('should set form.$valid to false if requirements are met', function() {

      $scope.form.password.$setViewValue('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
      $scope.$digest();

      expect($scope.form.$valid).to.equal(false);
    });

    it('should set form.$valid to true if requirements are met', function() {

      $scope.form.password.$setViewValue('test1@a%Madb');
      $scope.$digest();

      expect($scope.form.$valid).to.equal(true);
    });



  });
})();
