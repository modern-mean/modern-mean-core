(function() {
  'use strict';

  describe('users.client.module.js', function () {

    it('should have created the main users module', function () {
      expect(angular.module('users')).to.be.an('object');
      expect(angular.module('users').name).to.equal('users');
      expect(angular.module('users').requires.length).to.equal(2);
    });

    it('should have created the users.routes module', function () {
      expect(angular.module('users.routes')).to.be.an('object');
      expect(angular.module('users.routes').name).to.equal('users.routes');
      expect(angular.module('users.routes').requires.length).to.equal(1);
      expect(angular.module('users.routes').requires).to.include('core.routes');
    });

    it('should have created the users.admin module', function () {
      expect(angular.module('users.admin')).to.be.an('object');
      expect(angular.module('users.admin').name).to.equal('users.admin');
      expect(angular.module('users.admin').requires.length).to.equal(1);
    });

    it('should have created the users.routes module', function () {
      expect(angular.module('users.admin.routes')).to.be.an('object');
      expect(angular.module('users.admin.routes').name).to.equal('users.admin.routes');
      expect(angular.module('users.admin.routes').requires.length).to.equal(1);
      expect(angular.module('users.admin.routes').requires).to.include('core.admin.routes');
    });

  });
})();
