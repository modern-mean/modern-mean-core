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
      };
    }));

    it('should have an admin.users state', function () {
      var state = $state.get('root.admin.users');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/users');
      expect(state.views).to.be.an('object');
      expect(state.views['main@']).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/admin/users.client.views.list-users.html');
      expect(state.views['main@'].controller).to.equal('UserListController');
      expect(state.views['main@'].controllerAs).to.equal('vm');
    });

    it('should have an admin.user state', function () {
      var state = $state.get('root.admin.user');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/users/:userId');
      expect(state.views).to.be.an('object');
      expect(state.views['main@']).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/admin/users.client.views.view-user.html');
      expect(state.views['main@'].controller).to.equal('UserController');
      expect(state.views['main@'].controllerAs).to.equal('vm');
      expect(state.views['main@'].resolve).to.be.an('object');
      expect(state.views['main@'].resolve.userResolve).to.be.a('function');
    });

    it('should have an admin.user-edit state', function () {
      var state = $state.get('root.admin.user-edit');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/users/:userId/edit');
      expect(state.views).to.be.an('object');
      expect(state.views['main@']).to.be.an('object');
      expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/admin/users.client.views.edit-user.html');
      expect(state.views['main@'].controller).to.equal('UserController');
      expect(state.views['main@'].controllerAs).to.equal('vm');
      expect(state.views['main@'].resolve).to.be.an('object');
      expect(state.views['main@'].resolve.userResolve).to.be.a('function');
    });

    it('should resolve a user id', function () {
      $httpBackend.expectGET('/api/admin/users/test').respond(200, { _id: 'sure' });
      //$httpBackend.expectGET('modules/users/client/views/admin/users.client.views.view-user.html').respond(200, '<div></div>');
      //$httpBackend.expectGET('modules/core/client/views/core.client.views.home.html').respond(200, '<div></div>');
      //TODO HERE
      $location.url('/admin/users/test');
      $rootScope.$digest();
      $httpBackend.flush();

      expect($stateParams.userId).to.equal('test');
    });

  });
})();
