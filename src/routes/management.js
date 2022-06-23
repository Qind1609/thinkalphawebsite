const express = require('express')
const router = express.Router()
const ManagementController = require('../app/controllers/ManagementController')

router.get('/', ManagementController.index)
router.patch('/', ManagementController.authorization)
module.exports = router