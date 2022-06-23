const express = require('express')
const router = express.Router()
const equipmentController = require('../app/controllers/EquipmentsController')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/equipments')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/',upload.single('imageFile'), equipmentController.create)
router.delete('/:id', equipmentController.delete)
router.put('/',upload.single('imageFile'), equipmentController.update)
router.get('/', equipmentController.index)

module.exports = router