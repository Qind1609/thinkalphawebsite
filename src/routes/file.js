const express = require('express')
const router = express.Router()
const FileController = require('../app/controllers/FileController')

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/files')
    },
    filename: function (req, file, cb) {
      console.log('file', file)
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.get('/', FileController.listfile)
router.post('/', upload.single('file'), FileController.upfile)
router.delete('/:id', FileController.delete)
module.exports = router