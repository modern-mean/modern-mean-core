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
      item.addItem = addItem;
      this.items.push(item);
    }

    return service;
  }
})();
