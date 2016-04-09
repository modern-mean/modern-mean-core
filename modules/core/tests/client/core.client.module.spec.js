(function() {
  'use strict';

  describe('core.client.module.js', function () {

    it('should have created the main core module', function () {
      expect(angular.module('core')).to.be.an('object');
      expect(angular.module('core').name).to.equal('core');
      expect(angular.module('core').requires.length).to.equal(1);
    });

    it('should have created the core.routes module', function () {
      expect(angular.module('core.routes')).to.be.an('object');
      expect(angular.module('core.routes').name).to.equal('core.routes');
      expect(angular.module('core.routes').requires.length).to.equal(1);
      expect(angular.module('core.routes').requires).to.include('ui.router');
    });

  });
  
})();
