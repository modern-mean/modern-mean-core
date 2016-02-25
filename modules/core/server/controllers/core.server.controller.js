(function() {
  'use strict';

  var validator = require('validator');

  /**
   * Render the main application page
   */
  exports.renderIndex = function (req, res) {


    res.render('build/core/server/views/index');
  };

  /**
   * Render the server error page
   */
  exports.renderServerError = function (req, res) {
    res.status(500).render('build/core/server/views/500', {
      error: 'Oops! Something went wrong...'
    });
  };

  /**
   * Render the server not found responses
   * Performs content-negotiation on the Accept HTTP header
   */
  exports.renderNotFound = function (req, res) {

    res.status(404).format({
      'text/html': function () {
        res.render('build/core/server/views/404', {
          url: req.originalUrl
        });
      },
      'application/json': function () {
        res.json({
          error: 'Path not found'
        });
      },
      'default': function () {
        res.send('Path not found');
      }
    });
  };
})();
