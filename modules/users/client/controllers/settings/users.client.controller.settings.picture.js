(function() {
  'use strict';

  angular
    .module('users')
    .controller('ChangeProfilePictureController', ChangeProfilePictureController);

  ChangeProfilePictureController.$inject = ['Authentication', 'Upload', '$timeout', '$window', '$scope'];

  function ChangeProfilePictureController(Authentication, Upload, $timeout, $window, $scope) {
    var vm = this;

    vm.upload = upload;
    vm.user = Authentication.user;

    function upload(file) {
      vm.success = vm.error = undefined;
      Upload.upload({
        url: '/api/users/picture',
        data: { newProfilePicture: vm.file },
        headers: {
          Authorization: 'JWT ' + Authentication.token
        }
      })
      .then(function (response) {
        vm.success = response.data.message;
        vm.file = undefined;
      }, function (err) {
        vm.error = err.data.message;
      });
    }
    /*
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: '/api/users/picture',
      alias: 'newProfilePicture',
      headers: {
        Authorization: 'JWT ' + Authentication.token
      }
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    vm.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      vm.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      vm.cancelUpload();

      // Show error message
      vm.error = response.message;
    };

    // Change user profile picture
    vm.uploadProfilePicture = function () {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    };

    // Cancel the upload process
    vm.cancelUpload = function () {
      vm.uploader.clearQueue();
      vm.imageURL = vm.user.profileImageURL;
    };
    */
  }
})();
