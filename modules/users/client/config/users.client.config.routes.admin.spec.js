(function() {
  'use strict';

  describe('user.client.routes.admin.js', function () {

    var $state,
      $rootScope,
      $httpBackend,
      $stateParams,
      Authentication,
      $location;

    beforeEach(module('users.admin'));

    beforeEach(inject(function(_$state_, _$rootScope_, _$httpBackend_, _$stateParams_, _Authentication_, _$location_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $stateParams = _$stateParams_;
      Authentication = _Authentication_;
      $location = _$location_;

      Authentication.user = {
        roles: ['admin']
      }
    }));

    it('should have an admin.users state', function () {
      var state = $state.get('admin.users');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/users');
      expect(state.templateUrl).to.equal('modules/users/client/views/admin/users.client.views.list-users.html');
      expect(state.controller).to.equal('UserListController');
      expect(state.controllerAs).to.equal('vm');
    });

    it('should have an admin.user state', function () {
      var state = $state.get('admin.user');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/users/:userId');
      expect(state.templateUrl).to.equal('modules/users/client/views/admin/users.client.views.view-user.html');
      expect(state.controller).to.equal('UserController');
      expect(state.controllerAs).to.equal('vm');
      expect(state.resolve).to.be.an('object');
      expect(state.resolve.userResolve).to.be.a('function');
    });

    it('should have an admin.user-edit state', function () {
      var state = $state.get('admin.user-edit');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/users/:userId/edit');
      expect(state.templateUrl).to.equal('modules/users/client/views/admin/users.client.views.edit-user.html');
      expect(state.controller).to.equal('UserController');
      expect(state.controllerAs).to.equal('vm');
      expect(state.resolve).to.be.an('object');
      expect(state.resolve.userResolve).to.be.a('function');
    });

    it('should resolve a user id', function () {
      $httpBackend.expectGET('api/admin/users/test').respond(200, { id: 'sure' });
      $httpBackend.expectGET('modules/users/client/views/admin/users.client.views.view-user.html').respond(200, '<div></div>');
      //$httpBackend.expectGET('modules/core/client/views/core.client.views.home.html').respond(200, '<div></div>');
      //TODO HERE
      $location.url('/admin/users/test');
      $rootScope.$digest();
      $httpBackend.flush();
      console.log(JSON.stringify($state.current));
      expect($stateParams.userId).to.equal('test');
    });

  });
})();
