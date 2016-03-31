(function() {
  'use strict';

  var $state,
    state;

  describe('user.client.routes.js', function () {

    beforeEach(module('users'));

    beforeEach(inject(function(_$state_) {
      $state = _$state_;
    }));


    describe('root.user', function () {

      beforeEach(function() {
        state = $state.get('root.user');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /user', function () {
        expect(state.url).to.equal('/user');
      });

      it('should have property abstract that is true', function () {
        expect(state.abstract).to.equal(true);
      });

      it('should have property data that is an array with roles user and admin', function () {
        expect(state.data.roles).to.be.an('array');
        expect(state.data.roles).to.contain('user');
        expect(state.data.roles).to.contain('admin');
      });

    });

    describe('root.user.settings', function () {

      beforeEach(function() {
        state = $state.get('root.user.settings');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /settings', function () {
        expect(state.url).to.equal('/settings');
      });

      it('should have property views that is an object with leftnav@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['leftnav@']).to.be.an('object');
      });

      describe('leftnav@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['leftnav@'].templateUrl).to.equal('modules/users/client/views/settings/users.client.views.settings.html');
        });

        it('should have property controller', function () {
          expect(state.views['leftnav@'].controller).to.equal('SettingsController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['leftnav@'].controllerAs).to.equal('vm');
        });


      });

    });

    describe('root.user.settings.profile', function () {

      beforeEach(function() {
        state = $state.get('root.user.settings.profile');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /profile', function () {
        expect(state.url).to.equal('/profile');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Edit Profile');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/settings/users.client.views.edit-profile.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('EditProfileController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.settings.password', function () {

      beforeEach(function() {
        state = $state.get('root.user.settings.password');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /profile', function () {
        expect(state.url).to.equal('/password');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Change Password');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/settings/users.client.views.change-password.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('ChangePasswordController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.settings.accounts', function () {

      beforeEach(function() {
        state = $state.get('root.user.settings.accounts');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /accounts', function () {
        expect(state.url).to.equal('/accounts');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Manage Social Accounts');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/settings/users.client.views.manage-social-accounts.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('SocialAccountsController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.settings.picture', function () {

      beforeEach(function() {
        state = $state.get('root.user.settings.picture');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /picture', function () {
        expect(state.url).to.equal('/picture');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Change Profile Picture');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/settings/users.client.views.change-profile-picture.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('ChangeProfilePictureController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.authentication', function () {

      beforeEach(function() {
        state = $state.get('root.user.authentication');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /authentication', function () {
        expect(state.url).to.equal('/authentication');
      });

      it('should have property abstract', function () {
        expect(state.abstract).to.equal(true);
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/authentication/users.client.views.authentication.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('AuthenticationController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });


    describe('root.user.authentication.signup', function () {

      beforeEach(function() {
        state = $state.get('root.user.authentication.signup');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /signup', function () {
        expect(state.url).to.equal('/signup');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Account Sign Up');
      });

      it('should have property data.ignoreAuth', function () {
        expect(state.data.ignoreAuth).to.equal(true);
      });

      it('should have property views that is an object with authform@root.user.authentication property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['authform@root.user.authentication']).to.be.an('object');
      });

      describe('authform@root.user.authentication', function () {

        it('should have property templateUrl', function () {
          expect(state.views['authform@root.user.authentication'].templateUrl).to.equal('modules/users/client/views/authentication/users.client.views.signup.html');
        });

      });

    });

    describe('root.user.authentication.signin', function () {

      beforeEach(function() {
        state = $state.get('root.user.authentication.signin');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /signin', function () {
        expect(state.url).to.equal('/signin?err');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Account Sign In');
      });

      it('should have property data.ignoreAuth', function () {
        expect(state.data.ignoreAuth).to.equal(true);
      });

      it('should have property views that is an object with authform@root.user.authentication property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['authform@root.user.authentication']).to.be.an('object');
      });

      describe('authform@root.user.authentication', function () {

        it('should have property templateUrl', function () {
          expect(state.views['authform@root.user.authentication'].templateUrl).to.equal('modules/users/client/views/authentication/users.client.views.signin.html');
        });

      });

    });

    describe('root.signout', function () {

      beforeEach(function() {
        state = $state.get('root.signout');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /signout', function () {
        expect(state.url).to.equal('/signout');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Signed Out');
      });

      it('should have property data.ignoreAuth', function () {
        expect(state.data.ignoreAuth).to.equal(true);
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/authentication/users.client.views.signout.html');
        });

      });

    });

    describe('root.user.password', function () {

      beforeEach(function() {
        state = $state.get('root.user.password');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /password', function () {
        expect(state.url).to.equal('/password');
      });

      it('should have property data that is an object', function () {
        expect(state.abstract).to.equal(true);
      });

    });

    describe('root.user.password.forgot', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.forgot');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /forgot', function () {
        expect(state.url).to.equal('/forgot');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Forgot Password');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/password/users.client.views.forgot-password.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('PasswordController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.password.reset', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.reset');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /password', function () {
        expect(state.url).to.equal('/reset');
      });

      it('should have property data that is an object', function () {
        expect(state.abstract).to.equal(true);
      });

    });

    describe('root.user.password.reset.success', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.reset.success');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /success', function () {
        expect(state.url).to.equal('/success');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/password/users.client.views.reset-password-success.html');
        });

      });

    });

    describe('root.user.password.reset.form', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.reset.form');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /success', function () {
        expect(state.url).to.equal('/:token');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Password Reset Form');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modules/users/client/views/password/users.client.views.reset-password.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('PasswordController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });



  });
})();
