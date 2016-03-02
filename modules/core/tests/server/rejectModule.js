export default function () {
  return new Promise(function (resolve, reject) {
    reject('rejectModule Error');
  });
}
