const { CreateAccount, getFormData, editData, deleteData, uploadFilesData } = require('../controller/AuthController')
const { userValidationRules, validate, userUpdationValidationRules } = require('../middleware/Validate')

const router = require('express').Router()

router.post("/create", userValidationRules(), validate, CreateAccount)

router.get("/user-data", getFormData)

router.put('/edit-data/:id', userUpdationValidationRules(), validate, editData)

router.delete("/delete-data/:id", deleteData)

router.post('/send-files-data', uploadFilesData)

module.exports = router