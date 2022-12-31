const Account = require("../model/Account")

exports.iterateData = async (arr) => {
    try {
        const upload = []
        for (let i = 0; i < arr.length; i++) {
            let file = await addData(arr[i])
            upload.push(file)
        }
        return upload
    } catch (err) {
        throw err
    }
}

const addData = async (array) => {
    const { Name, Email, DOB, Address, Country } = array
    try {
        const upload = await Account({
            name: Name,
            email: Email,
            dob: DOB,
            address: Address,
            country: Country,
        }).save()
        return upload
    } catch (err) {
        throw err
    }
}