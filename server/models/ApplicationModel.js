const mongoose = require("mongoose")

const applicationSchema = mongoose.Schema({
    jobId:{
        type:mongoose.Schema.ObjectId,
        ref: "Job",
        required : true,
    },
    applicantId :{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
        
    },
    status :{
        type : String,
        enum:["pending", "approved", "rejected",],
        default: "pending"
    },
    details:{
        type: String,
        required:true,
    },
    applicationDate: {
        type: Date,
        default: Date.now
      },
    
},{timestamps:true})

const Application = mongoose.model("Application",applicationSchema);
module.exports = Application;