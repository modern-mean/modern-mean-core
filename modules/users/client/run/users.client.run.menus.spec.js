(function() {
  'use strict';

  describe('users.client.run.menus.js', function () {
    var menuService;

    beforeEach(module('users'));


    beforeEach(inject(function(_menuService_) {
      menuService = _menuService_;
    }));


    describe('Users Menu', function () {

      describe('Account Menu', function () {

        beforeEach(inject(function(_menuService_) {
          menuService = _menuService_;
        }));


        it('should have a menu called account', function () {
          expect(menuService.getMenu('account')).to.be.an('object');
        });

        it('should have a property roles', function () {
          expect(menuService.getMenu('account').roles).to.be.an('array');
          expect(menuService.getMenu('account').roles).to.include('user');
        });

        it('should have a property menus', function () {
          expect(menuService.getMenu('account').items).to.be.an('array');
          expect(menuService.getMenu('account').items.length).to.equal(1);
        });



        //TODO finalize after menu rewrite

      });



    });

  });
})();
