const express = require('express')
const router = express.Router()
const ResearchController = require('../app/controllers/ResearchsController')

router.post('/', ResearchController.create)
// router.delete('/:id', ResearchController.delete)
router.put('/', ResearchController.update)
router.get('/one/:_id', ResearchController.findOne)
router.get('/', ResearchController.index)

module.exports = router