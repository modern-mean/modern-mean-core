(function () {
  'use strict';

  angular
    .module('core')
    .factory('menuService', menuService);

  function menuService() {

    var service = {
      toolbar: {
        items: [],
        addItem: addItem
      },
      leftnav: {
        items: [],
        addItem: addItem
      },
      rightnav: {
        items: [],
        addItem: addItem
      }
    };

    function addItem(item) {
      var menu = this.getItem(item);
      if (menu) {
        console.log('Menu Exists:' , menu);
        return menu;
      }
      item.addItem = addItem;
      this.items.push(item);
    }

    return service;
  }
})();
