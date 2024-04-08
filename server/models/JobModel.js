const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    companyName: {
        type: String,
        required: [true, "Please provide Company name"]
    },
    location: {
        type: String,
        required: [true, "Please provide location details"]
    },
    salary: {
        type: String,
        required: [true, "Please provide the salary details"]
    },
    description: {
        type: String,
        default: ""
    },
    skillsRequired: {
        type: [String],
    },
    vacancy: {
        type: Number,
        required: [true, "Vacancy can't be empty"],
        min: 1
    },
    jobProviderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

const Job = mongoose.model("Job", jobSchema)
module.exports = Job;