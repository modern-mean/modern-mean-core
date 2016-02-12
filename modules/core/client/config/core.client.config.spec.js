(function() {
  'use strict';

  var $location;

  beforeEach(module('core'));

  describe('core.config.client.js', function () {

    describe('$locationProvider', function () {
      beforeEach(inject(function(_$location_) {
        $location = _$location_;
      }));

      it('should be in HTML5 mode', function () {
        expect($location.$$html5).to.equal(true);
      });
    });

  });
})();
