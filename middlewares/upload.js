// const multer = require("multer");

const uploadDirectory = "./upload";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDirectory);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;



// const multer = require("multer");

// const uploadDirectory = "./upload";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDirectory);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).array('files', 2);

// module.exports = upload;


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadFields = (fields) => {
  return upload.fields(fields);
};

module.exports = uploadFields;
