(function() {
  'use strict';

  describe('user.client.service.user.js', function () {

    var $rootScope,
      User;

    beforeEach(module('users'));

    beforeEach(inject(function(_$rootScope_, _User_) {
      $rootScope = _$rootScope_;
      User = new _User_();
    }));

    describe('UserAdmin resource', function () {

      it('should have an update method', function () {
        expect(User.$update).to.be.a('function');
      });

      it('should have an me method', function () {
        expect(User.$me).to.be.a('function');
      });

    });
  });
})();
