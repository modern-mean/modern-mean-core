(function() {
  'use strict';

  describe('user.client.service.admin.js', function () {

    var $rootScope,
      UserAdmin;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, _UserAdmin_) {
      $rootScope = _$rootScope_;
      UserAdmin = new _UserAdmin_();
    }));

    describe('UserAdmin resource', function () {

      it('should have an update method', function () {
        expect( UserAdmin.$update ).to.be.a('function');
      });

    });
  });
})();
