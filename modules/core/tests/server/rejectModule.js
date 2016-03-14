'use strict';

function init () {
  return new Promise(function (resolve, reject) {
    reject('rejectModule Error');
  });
}

let service = { init: init };

export default service;
export { init }
