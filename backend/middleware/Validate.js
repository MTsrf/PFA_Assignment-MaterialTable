const { body, validationResult } = require('express-validator')
const Account = require('../model/Account')
const userValidationRules = () => {
    return [
        body("name")
            .isLength({ max: 25 })
            .withMessage("Name should be maximum 25 character")
            .matches(/^[a-zA-Z]+$/)
            .withMessage("Name must contain Letter")
            .notEmpty()
            .withMessage("Name required"),
        body("email", "Please enter a valid email to continue.").isEmail()
            .custom((value, { req }) => {
                return Account.findOne({ email: value }).then((accountDoc) => {
                    if (accountDoc) {
                        return Promise.reject(
                            "Email address already exists , Please try again with another email"
                        )
                    }
                });
            })
            .notEmpty()
            .withMessage("Email required")
            .normalizeEmail(),
        body("dob")
            .notEmpty()
            .withMessage("Date of Birth required"),
        body("address",)
            .isLength({ max: 150 })
            .withMessage("Name should be maximum 150 character")
            .notEmpty()
            .withMessage("Address required"),
        body("country")
            .notEmpty()
            .withMessage("Country required")
            .matches(/^[a-zA-Z]+$/)
            .withMessage("Country must contain Letter")
            .trim()
    ]
}
const userUpdationValidationRules = () => {
    return [
        body("name")
            .isLength({ max: 25 })
            .withMessage("Name should be maximum 25 character")
            .matches(/^[a-zA-Z]+$/)
            .withMessage("Name must contain Letter")
            .notEmpty()
            .withMessage("Name required"),
        body("email", "Please enter a valid email to continue.").isEmail()
            .notEmpty()
            .withMessage("Email required")
            .normalizeEmail(),
        body("dob")
            .notEmpty()
            .withMessage("Date of Birth required"),
        body("address",)
            .isLength({ max: 150 })
            .withMessage("Name should be maximum 150 character")
            .notEmpty()
            .withMessage("Address required"),
        body("country")
            .notEmpty()
            .withMessage("Country required")
            .matches(/^[a-zA-Z]+$/)
            .withMessage("Country must contain Letter")
            .trim()
    ]
}
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({
        errors: extractedErrors,
    })
}
module.exports = {
    userValidationRules,
    validate,
    userUpdationValidationRules
}
