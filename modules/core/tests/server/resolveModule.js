'use strict';

function init () {
  return new Promise(function (resolve, reject) {
    resolve('Module Success');
  });
}

let service = { init: init };

export default service;
export { init };
