(function() {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    menuService.toolbar.addItem({
      aria: 'Home',
      icon: 'menu',
      order: 1,
      state: 'root.home',
      show: true,
      title: 'Modern-Mean',
      type: 'button'
    });

    menuService.toolbar.addItem({
      flex: 100,
      order: 2,
      show: true,
    });


  }
})();
