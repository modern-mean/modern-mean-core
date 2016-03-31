(function() {
  'use strict';

  var $state;

  describe('core.client.config.routes.admin.js', function () {

    beforeEach(module('core.admin.routes'));

    beforeEach(inject(function(_$state_) {
      $state = _$state_;
    }));

    it('should have a home state', function () {
      var state = $state.get('root.admin');
      expect(state).to.be.an('object');
      expect(state.url).to.equal('/admin');
      expect(state.data).to.be.an('object');
      expect(state.data.roles).to.be.an('array');
      expect(state.data.roles.length).to.equal(1);
      expect(state.data.roles).to.include('admin');
    });



  });
})();
