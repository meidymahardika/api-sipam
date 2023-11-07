const multer = require('multer')
const { dirname } = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dirname(require.main.filename) + '/img');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
// Set saved storage options:
const upload = multer({ storage: storage })

module.exports = upload
