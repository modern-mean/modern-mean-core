(function () {
  'use strict';

  angular
    .module('core')
    .factory('menuFactory', menuFactory);

  menuFactory.$inject = ['lodash', '$log'];
  function menuFactory(lodash, $log) {
    var factory = {
      toolbar: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      sidenavleft: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      sidenavright: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      }
    };

    function addItem(item) {
      var menu = this.getItem(item);  // jshint ignore:line

      if (menu) {
        $log.info('Menu Exists:' , menu);
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

    return factory;
  }
})();
