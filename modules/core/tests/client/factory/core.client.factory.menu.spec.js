(function() {
  'use strict';

  describe('core.client.factory.menus.js', function () {
    var menuFactory;

    beforeEach(module('core'));

    beforeEach(inject(function(_menuFactory_) {
      menuFactory = _menuFactory_;
    }));

    describe('Core Menu', function () {
      describe('Toolbar', function () {
        beforeEach(inject(function(_menuFactory_) {
          menuFactory = _menuFactory_;
        }));

        it('should be an object', function () {
          expect(menuFactory.toolbar).to.be.an('object');
        });

        it('should have property items that is an array', function () {
          expect(menuFactory.toolbar.items).to.be.an('array');
        });

        it('should have property addItem that is a function', function () {
          expect(menuFactory.toolbar.addItem).to.be.a('function');
        });

        describe('addItem()', function () {
          beforeEach(inject(function(_menuFactory_) {
            menuFactory = _menuFactory_;
          }));

          it('should add an object to items', function () {
            menuFactory.toolbar.addItem({ id: 'test', state: 'whatever' });

            var menu = menuFactory.toolbar.getItem({ id: 'test' });

            expect(menu).to.not.equal(undefined);
            expect(menu.id).to.equal('test');
          });

          it('should not add an existing menu', function () {
            var prevLen = menuFactory.toolbar.items.length;

            menuFactory.toolbar.addItem({ state: 'whatever' });
            menuFactory.toolbar.addItem({ state: 'whatever' });

            expect(menuFactory.toolbar.items.length).to.equal(prevLen + 1);
          });
        });

        it('should have property getItem that is a function', function () {
          expect(menuFactory.toolbar.getItem).to.be.a('function');
        });

        describe('getItem()', function () {
          beforeEach(inject(function(_menuFactory_) {
            menuFactory = _menuFactory_;
          }));

          // This is removed from core menu system
          // it('should return a menu item', function () {
          //   var menu = menuFactory.toolbar.getItem({ state: 'root.home' });
          //   expect(menu).to.not.equal(undefined);
          //   expect(menu.state).to.equal('root.home');
          // });

          it('should return undefined if not found', function () {
            var menu = menuFactory.toolbar.getItem({ state: 'asdfasdfasfdasdf' });

            expect(menu).to.equal(undefined);
          });
        });

        it('should have property removeItem that is a function', function () {
          expect(menuFactory.toolbar.removeItem).to.be.a('function');
        });

        describe('removeItem()', function () {
          beforeEach(inject(function(_menuFactory_) {
            menuFactory = _menuFactory_;
          }));

          it('should remove a menu item', function () {
            menuFactory.toolbar.addItem({ state: 'okiedokie' });

            var prevLen = menuFactory.toolbar.items.length;

            menuFactory.toolbar.removeItem({ state: 'okiedokie' });

            expect(menuFactory.toolbar.items.length).to.equal(prevLen - 1);
          });

          it('should return undefined if not found', function () {
            expect(menuFactory.toolbar.removeItem({ state: 'okiedokie' })).to.equal(undefined);
          });

          it('should return undefined no items', function () {
            menuFactory.toolbar.items = undefined;

            expect(menuFactory.toolbar.removeItem({ state: 'okiedokie' })).to.equal(undefined);
          });
        });
      });
    });
  });
})();
