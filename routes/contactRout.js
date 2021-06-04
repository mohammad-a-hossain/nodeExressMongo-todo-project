const router = require('express').Router()

const {
    createContact,
    getAllContact,
    getContactById,
    updateDAta,
    deletingData
} = require('../controller/controller')

router.post('/',createContact)
router.get('/', getAllContact)
router.get('/:id',getContactById)
router.put('/:id',updateDAta)
router.delete('/:id',deletingData)



module.exports = router