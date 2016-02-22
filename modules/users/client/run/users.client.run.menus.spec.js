(function() {
  'use strict';

  describe('users.client.run.menus.js', function () {
    var menuService,
      $rootScope,
      Authentication,
      AUTH_EVENTS;

    beforeEach(module('users'));


    beforeEach(inject(function(_$rootScope_, _menuService_, _AUTH_EVENTS_, _Authentication_) {
      AUTH_EVENTS = _AUTH_EVENTS_;
      Authentication = _Authentication_;
      $rootScope = _$rootScope_;
      menuService = _menuService_;

      Authentication.user = {
        id: 'testid',
        displayName: 'okiedokie',
        profileImageURL: 'imgurl'
      };
    }));


    describe('Users Menu', function () {

      it('should inject signin button into toolbar', function () {
        expect(menuService.toolbar.getItem({ state: 'authentication.signin' })).to.not.equal(undefined);
      });

      it('should inject signup button into toolbar', function () {
        expect(menuService.toolbar.getItem({ state: 'authentication.signup' })).to.not.equal(undefined);
      });

      describe('user login event', function () {

        beforeEach(function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $rootScope.$digest();
        });

        it('should inject user menu on login event', function () {
          expect(menuService.toolbar.getItem({ id: 'usermenu' })).to.not.equal(undefined);
          expect(menuService.toolbar.getItem({ id: 'usermenu' }).title).to.equal('okiedokie');
          expect(menuService.toolbar.getItem({ id: 'usermenu' }).image).to.equal('imgurl');
        });

        it('should set signin button to hidden', function () {
          expect(menuService.toolbar.getItem({ state: 'authentication.signin' }).show).to.equal(false);
        });

        it('should set signup button to hidden', function () {
          expect(menuService.toolbar.getItem({ state: 'authentication.signup' }).show).to.equal(false);
        });
      });

      describe('user logout event', function () {

        beforeEach(function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $rootScope.$digest();
          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
          $rootScope.$digest();
        });

        it('should remove user menu on logout event', function () {
          expect(menuService.toolbar.getItem({ id: 'usermenu' })).to.equal(undefined);
        });

        it('should set signin button to show', function () {
          expect(menuService.toolbar.getItem({ state: 'authentication.signin' }).show).to.equal(true);
        });

        it('should set signup button to show', function () {
          expect(menuService.toolbar.getItem({ state: 'authentication.signup' }).show).to.equal(true);
        });
      });




    });

  });
})();
