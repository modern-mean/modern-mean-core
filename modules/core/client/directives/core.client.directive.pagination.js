(function() {
  'use strict';

  angular
    .module('core')
    .directive('mdPaginate', mdPaginateDirective);

    // Custom Pagination for Material Design
    // To use:
    //
    // <md-pagination item-total="=" goto-page="&" position="@" current-page="=" step="="></md-pagination>

  function mdPaginateDirective() {
    return {
      restrict: 'EA',
      scope: {
        itemTotal: '=',
        position: '@',
        gotoPage: '&',
        step: '=',
        currentPage: '='
      },
      controller: Controller,
      controllerAs: 'vm',
      template: [
        '<div layout="row" class="md-pagination" layout-align="{{ position }}">',
        '  <md-button class="md-raised md-primary paginate-button" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>',
        '  <md-button class="md-raised paginate-button" ng-click="vm.gotoPrev()" ng-show="vm.index - 1 >= 0">...</md-button>',
        '  <md-button class="md-raised paginate-button" ng-repeat="i in vm.stepInfo"',
        '    ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ',
        '    ng-class="{true: \'md-primary\', false: \'\'}[vm.page[vm.index + i] === currentPage]">',
        '    {{ vm.page[vm.index + i] }}',
        '  </md-button>',
        '  <md-button class="md-raised paginate-button" ng-click="vm.gotoNext()" ng-show="vm.index + vm.step < itemTotal">...</md-button>',
        '  <md-button class="md-raised md-primary paginate-button" ng-click="vm.gotoLast()">{{ vm.last }}</md-button>',
        '</div>'
      ].join('')
    };
  }

  function Controller($scope) {
    var vm = this;

    vm.first = '<<';
    vm.last = '>>';
    vm.index = 0;
    vm.step = $scope.step;

    vm.goto = function(index) {
      $scope.currentPage = vm.page[index];
    };

    vm.gotoPrev = function(){
      $scope.currentPage = vm.index;
      vm.index -= vm.step;
    };

    vm.gotoNext = function(){
      vm.index += vm.step;
      $scope.currentPage = vm.index + 1;
    };

    vm.gotoFirst = function(){
      vm.index = 0;
      $scope.currentPage = 1;
    };

    vm.gotoLast = function(){
      vm.index = parseInt($scope.itemTotal / vm.step) * vm.step;
      vm.index === $scope.itemTotal ? vm.index = vm.index - vm.step : '';
      $scope.currentPage = $scope.itemTotal;
    };

    $scope.$watch('currentPage', function() {
      $scope.gotoPage();
    });

    $scope.$watch('itemTotal', function() {
      vm.init();
    });

    vm.init = function() {
      vm.stepInfo = (function() {
        var i, result = [];
        for (i = 0; i < vm.step; i++) {
          result.push(i)
        }
        return result;
      })();

      vm.page = (function() {
        var i, result = [];
        for (i = 1; i <= $scope.itemTotal; i++) {
          result.push(i);
        }
        return result;
      })();

    };
  }

})();
