(function() {
  'use strict';

  describe('core.client.services.menus.js', function () {
    var menuService;

    beforeEach(module('core'));


    beforeEach(inject(function(_menuService_) {
      menuService = _menuService_;
    }));


    describe('Core Menu', function () {

      describe('Toolbar', function () {

        beforeEach(inject(function(_menuService_) {
          menuService = _menuService_;
        }));

        it('should be an object', function () {
          expect(menuService.toolbar).to.be.an('object');
        });

        it('should have property items that is an array', function () {
          expect(menuService.toolbar.items).to.be.an('array');
        });

        it('should have property addItem that is a function', function () {
          expect(menuService.toolbar.addItem).to.be.a('function');
        });

        describe('addItem()', function () {
          beforeEach(inject(function(_menuService_) {
            menuService = _menuService_;
          }));

          it('should add an object to items', function () {
            menuService.toolbar.addItem({ id: 'test', state: 'whatever' });
            var menu = menuService.toolbar.getItem({ id: 'test' })
            expect(menu).to.exist;
            expect(menu.id).to.equal('test');
          });

          it('should not add an existing menu', function () {
            var prevLen = menuService.toolbar.items.length;
            menuService.toolbar.addItem({ state: 'whatever' });
            menuService.toolbar.addItem({ state: 'whatever' });
            expect(menuService.toolbar.items.length).to.equal(prevLen + 1);
          });

        });



        it('should have property getItem that is a function', function () {
          expect(menuService.toolbar.getItem).to.be.a('function');
        });

        describe('getItem()', function () {
          beforeEach(inject(function(_menuService_) {
            menuService = _menuService_;
          }));

          it('should return a menu item', function () {
            var menu = menuService.toolbar.getItem({ state: 'home' });
            expect(menu).to.exist;
            expect(menu.state).to.equal('home');
          });

          it('should return undefined if not found', function () {
            var menu = menuService.toolbar.getItem({ state: 'asdfasdfasfdasdf' });
            expect(menu).to.not.exist;
          });

        });

        it('should have property removeItem that is a function', function () {
          expect(menuService.toolbar.removeItem).to.be.a('function');
        });

        describe('removeItem()', function () {
          beforeEach(inject(function(_menuService_) {
            menuService = _menuService_;
          }));

          it('should remove a menu item', function () {
            menuService.toolbar.addItem({ state: 'okiedokie' });
            var prevLen = menuService.toolbar.items.length;
            menuService.toolbar.removeItem({ state: 'okiedokie' });
            expect(menuService.toolbar.items.length).to.equal(prevLen - 1);
          });

          it('should return undefined if not found', function () {
            expect(menuService.toolbar.removeItem({ state: 'okiedokie' })).to.not.exist;
          });

          it('should return undefined no items', function () {
            menuService.toolbar.items = undefined;
            expect(menuService.toolbar.removeItem({ state: 'okiedokie' })).to.not.exist;
          });

        });

      });



    });

  });
})();
