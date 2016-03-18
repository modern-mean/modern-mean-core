import path from 'path';

function renderIndex(req, res) {
  res.render(__dirname + '/../views/index');
}

function renderServerError(req, res) {
  res.status(500).render(__dirname + '/../views/500', {
    error: 'Oops! Something went wrong...'
  });
}

function renderNotFound(req, res) {
  res.status(404).format({
    'text/html': function () {
      res.render(__dirname + '/../views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.json({
        error: 'Path not found'
      });
    }
  });
}

let controller = { renderIndex: renderIndex, renderServerError: renderServerError, renderNotFound: renderNotFound };

export default controller;
export {
  renderIndex,
  renderServerError,
  renderNotFound
};
