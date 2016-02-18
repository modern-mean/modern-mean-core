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

        //TODO finalize after menu rewrite

      });



    });

  });
})();
