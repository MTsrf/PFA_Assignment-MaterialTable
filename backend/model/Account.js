const mongoose = require('mongoose')


const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    dob: {
        type: String,
        requied: [true, "Date of birth required"],
    },
    address: {
        type: String,
        required: [true, "Address required"],
    },
    country: {
        type: String,
        trim: true,
        required: [true, "Country required"]
    },
}, { timestamps: true })

module.exports = mongoose.model("Account", accountSchema)