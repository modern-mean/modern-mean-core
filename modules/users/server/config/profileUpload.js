import multer from 'multer';
import config from 'modernMean/config';

function filter(req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

function storage() {
  return multer.diskStorage({
    destination: destination,
    filename: filename
  });
}

function destination(req, file, cb) {
  cb(null, config.uploads.profileUpload.dest);
}

function filename(req, file, cb) {
  var datetimestamp = Date.now();
  cb(null, req.user._id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
}

let service = { filter: filter, destination: destination, filename: filename, storage: storage };

export default service;
export { filter, destination, filename, storage };
