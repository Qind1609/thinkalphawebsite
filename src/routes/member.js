const express = require('express')
const router = express.Router()
const memberController = require('../app/controllers/MembersController')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req)
      cb(null, './src/public/members')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/',upload.single('imageFile'), memberController.create)
router.delete('/:id', memberController.delete)
router.put('/',upload.single('imageFile'), memberController.update)
router.get('/', memberController.index)

module.exports = router