const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
            required: [true, "please provide your phone Number"]

        },
        address: {
            type: String,
        },
        bio: {
            type: String,
        },

        education: {
            type: String,

        },
        experience: {
            type: String,
        },
        skills: {
            type: [String],

        },
        companyName: {
            type: String,
        }
    }
)
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;