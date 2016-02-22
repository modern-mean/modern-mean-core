(function () {
  'use strict';

  angular
    .module('core')
    .factory('menuService', menuService);

  menuService.$inject = ['lodash'];
  function menuService(lodash) {

    var service = {
      toolbar: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      leftnav: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      rightnav: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      }
    };

    function addItem(item) {
      var menu = this.getItem(item);  // jshint ignore:line
      if (menu) {
        console.log('Menu Exists:' , menu);
        return menu;
      }
      item.addItem = addItem;
      item.getItem = getItem;
      item.removeItem = removeItem;
      this.items.push(item);  // jshint ignore:line
    }

    function getItem(find) {
      return lodash.find(this.items, find);  // jshint ignore:line
    }

    function removeItem(find) {
      if (this.items) {  // jshint ignore:line
        var item = lodash.find(this.items, find); // jshint ignore:line
        if (item !== undefined) {
          return this.items.splice(this.items.indexOf(item), 1); // jshint ignore:line
        }
      }
    }

    return service;
  }
})();
