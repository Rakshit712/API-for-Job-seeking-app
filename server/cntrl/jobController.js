const Job = require("../models/JobModel");
const errorWrapper = require("../util/error");

//...........Posting a job role............

async function postJob(req, res) {
    try {
        const jobData = req.body;
        const newJob = await Job.create(jobData);
        if (newJob) {
            return res.status(201).json({
                status: "success",
                message: "new job  created successfully",
                data: {
                    job: newJob
                }
            })
        }
        else {
            return res.status(400).json({
                status: "failure",
                message: "Failed to create a new job"
            })

        }


    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }


}

//.............getting all job Roles.....................

async function getJobs(req, res) {
    try {
        const jobs = await Job.find().populate("jobProviderId")
        if (jobs && jobs.length > 0) {
            return res.status(200).json({
                status: "success",
                message: "jobs  fetched Successfully",
                data: [...jobs]
            })
        } else {
            throw {
                statusCode: 404,
                status: "failure",
                message: "no jobs Found"

            }

        }

    } catch (error) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }
}

//.................get job by id..............

async function getjobById(req,res){
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(job){
            return res.status(200).json({
                status: "success",
                message: "job found",
                job
            })
        }
        else{
            return res.status(404).json({
                status: "error",
                message: "job not found"
            })
        }
        
    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }
}

//.............updating job role........

async function updateJobRole(req, res) {
    try {
        let id = req.params.id;
        const body = req.body;

        const updatedJob = await Job.findByIdAndUpdate(id, body);
        if (updatedJob) {
            return res.status(200).json({
                status: "success",
                message: "job Role updated  Successfully.",
                data: {
                    job: updatedJob
                }
            })
        } else {
            return res.status(404).json({
                status: "failure",
                message: "No such  job found."
            })
        }
    }
    catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }

    }
}

//..............deleting a job role..........

async function deleteJob(req, res) {
    try {
        let id = req.params.id;

        const deletedJob = await Job.findByIdAndDelete(id)
        if (deletedJob) {
            return res.status(200).json({
                status: 'Success',
                message: 'Deleted the job role successfully!',

            })
        } else {
            return res.status(404).json({
                status: 'Failure',
                message: 'The specified job was not found in our records.'
            });
        }

    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }


    }
}

module.exports = {
    postJob: errorWrapper(postJob)
    , updateJobRole: errorWrapper(updateJobRole)
    , deleteJob: errorWrapper(deleteJob)
    , getJobs: errorWrapper(getJobs),
    getjobById:errorWrapper(getjobById)


};