const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({

    // user_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:"User"
    // },
    salutation: {
        type: String,
        required: [true, "enter the salutation"],
    },
    firstName: {
        type: String,
        required: [true, "enter the firstname"]
    },
    lastName: {
        type: String,
        required: [true, "enter the lastname"]
    },

    email: {
        type: String,
        required: [true, "enter the email"]
    },

    phone: {
        type: String,
        required: [true, "enter the mobilenumber"]
    },
    username: {
        type: String,
        required: [true, "enter the username"]
    },
    password: {
        type: String,
        required: [true, "enter the password"]
    },

    dob: {
        type: String,
        required: [true, "enter the date of birth"]
    },

    gender: {
        type: String,
        required: [true, "enter the gender"]
    },

    qualifications: {
        type: String,
        required: [true, "enter the qualification"]
    },

    address: {
        type: String,
        required: [true, "enter the address"]
    },

    country: {
        type: String,
        required: [true, "enter the country"]
    },

    state: {
        type: String,
        required: [true, "enter the state"]
    },
    city: {
        type: String,
        required: [true, "enter the city"]
    },
    // pinzip:{
    //     type:String,
    //     required:[true,"enter the pinzip"]
    // },
    image: {
        type: String,
        required: [false, "default image"]
    }

}
    , {
        timestamps: true,
    }
)

module.exports = mongoose.model("employee", contactSchema);
