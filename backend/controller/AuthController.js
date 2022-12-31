const { iterateData } = require('../helper/fileUpload')
const Account = require('../model/Account')
exports.CreateAccount = async (req, res, next) => {
    console.log(req.body)
    const { name, email, dob, address, country } = req.body
    try {
        const model = await new Account({
            name,
            email,
            dob,
            address,
            country,
        }).save()
        if (!model) {
            const error = new Error(
                "Registraion failed"
            );
            error.statusCode = 500;
            throw error;
        }
        console.log(model)
        res.status(200).json({
            success: true,
            message: "Account Successfully Created"
        })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}


exports.getFormData = async (req, res) => {
    try {
        const fetchdata = await Account.find()
        res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            data: fetchdata
        })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}


exports.editData = async (req, res) => {
    try {
        const updated = await Account.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: updated
        })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}


exports.deleteData = async (req, res, next) => {
    try {
        const deletedata = await Account.findByIdAndDelete(req.params.id)
        if (!deletedata) {
            const error = new Error(
                "Deletion failed"
            );
            error.statusCode = 204;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
        })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}

exports.uploadFilesData = async (req, res, next) => {
    try {
        const data = await iterateData(req.body)
        if (!data.length) {
            const error = new Error(
                "Upload Failed"
            );
            error.statusCode = 504;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Upload Successfully",
        })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}