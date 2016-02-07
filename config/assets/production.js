(function() {
  'use strict';

  module.exports = {
    client: {
      lib: {
        css: [
          'public/css/bootstrap.min.css',
          'public/lib/WebFont-OpenSans/css/stylesheet.css',
          'public/lib/font-awesome/css/font-awesome.css'
        ],
        js: [
          'public/lib/jquery/dist/jquery.min.js',
          'public/lib/bootstrap/dist/js/bootstrap.min.js',
          'public/lib/summernote/dist/summernote.min.js',
          'public/lib/moment/moment.js',
          'public/lib/angular/angular.min.js',
          'public/lib/angular-resource/angular-resource.min.js',
          'public/lib/angular-animate/angular-animate.min.js',
          'public/lib/angular-messages/angular-messages.min.js',
          'public/lib/angular-ui-router/release/angular-ui-router.min.js',
          'public/lib/angular-ui-utils/ui-utils.min.js',
          'public/lib/angular-sanitize/angular-sanitize.min.js',
          'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
          'public/lib/angular-file-upload/angular-file-upload.min.js',
          'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
          'public/lib/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
          'public/lib/angular-summernote/dist/angular-summernote.min.js',
          'public/lib/angular-moment/angular-moment.min.js'
        ]
      },
      css: 'public/dist/application.min.css',
      js: 'public/dist/application.min.js'
    }
  };
})();
