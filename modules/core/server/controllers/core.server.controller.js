'use strict';

function renderIndex(req, res) {
  res.render('build/core/server/views/index');
}

function renderServerError(req, res) {
  res.status(500).render('build/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
}

function renderNotFound(req, res) {
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
}

export {
  renderIndex,
  renderServerError,
  renderNotFound
};
