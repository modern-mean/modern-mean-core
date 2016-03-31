(function() {
  'use strict';

  describe('core.client.config.constants.js', function () {
    var constants;

    beforeEach(module('core'));

    beforeEach(inject(function(_CORE_CONSTANTS_) {
      constants = _CORE_CONSTANTS_;
    }));

    it('should a page object', function () {
      expect(constants.page).to.be.an('object');
    });

    it('should a page object with title property', function () {
      expect(constants.page.title).to.equal('Modern MEAN');
    });

  });
})();
