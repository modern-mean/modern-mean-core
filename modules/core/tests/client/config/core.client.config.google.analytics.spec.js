(function() {
  'use strict';

  var Analytics;

  describe('core.client.config.google.analytics.js', function () {

    beforeEach(module('core'));

    beforeEach(inject(function(_Analytics_) {
      Analytics = _Analytics_;
    }));

    it('should set pageEvent tracking', function () {
      expect(Analytics.configuration.pageEvent).to.equal('$stateChangeSuccess');
    });

    it('should set trackRoutes', function () {
      expect(Analytics.configuration.trackRoutes).to.equal(true);
    });

    it('should set trackUrlParams', function () {
      expect(Analytics.configuration.trackUrlParams).to.equal(true);
    });

  });
})();
