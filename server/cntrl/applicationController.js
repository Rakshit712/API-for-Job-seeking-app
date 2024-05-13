const Application = require("../models/ApplicationModel");
const Job = require("../models/JobModel");
const errorWrapper = require("../util/error");

//..........function to apply for a job...........

async function addApplication(req, res) {
    try {
        const { jobId, details } = req.body;
        // console.log(jobId)
        const applicantId = req.user.payload.userId;
        console.log(applicantId)
        const application = await Application.findOne({ jobId: jobId, applicantId: applicantId })

        console.log(application)
        if (!application) {

            const applicationData = {
                jobId: jobId,
                applicantId: applicantId,
                details: details
            };
            console.log(applicationData)
            const newApp = await Application.create(applicationData)
            if (newApp) {
                return res.status(201).json({
                    status: "success",
                    message: "application Created"
                })
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: "Something went wrong while applying."
                });
            }

        } else {
            return res.status(401).json({
                status: "application already exist",
                message: "application is already registered"
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

//...........function to  get all applications by Applicant Id......................

async function getApplication(req, res) {

    try {
        const applicantId = req.user.payload.userId;

        const applications = await Application.find({ applicantId: applicantId });
        if (applications && applications.length > 0) {
            return res.status(200).json({
                status: "success",
                message: "applications  fetched Successfully",
                data: [...applications]
            })
        } else {
            throw {
                statusCode: 404,
                status: "failure",
                message: "no applications Found"

            }

        }

    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }



}

//..............funtion to cancel  the application.............

async function cancelApplication(req, res) {
    try {
        let applicationId = req.params.id;

        const deletedApplication = await Application.findByIdAndDelete(applicationId);
        if (deletedApplication) {
            return res.status(200).json({
                status: 'Success',
                message: 'Deleted the application successfully!',

            })
        } else {
            return res.status(404).json({
                status: 'Failure',
                message: 'The specified application was not found in our records.'
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




//......................function for job provider to get all the applications...........

async function getApplicationsForProvider(req, res) {

    try {
        const providerId = req.user.payload.userId;
        const jobPostings = await Job.find({ jobProviderId: providerId });
        const jobPostingIDs = jobPostings.map(job => job._id);

        const jobApplications = await Application.find({ jobId: { $in: jobPostingIDs } }).populate("applicantId");
        console.log(jobApplications)
        if (jobApplications && jobApplications.length > 0) {
            return res.status(200).json({
                status: 'Success',
                message: 'Job Applications retrieved successfully!',
                data: {
                    applications: jobApplications
                }
            })
        } else {
            return res.status(404).json({
                status: "Fail",
                message: 'No Job Applications found for this Provider!'
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

//..............function for job provider to manage the application status..............

async function manageApplicationStatus(req, res) {

    try {
        let applicationId = req.params.id;
        const body = req.body;
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, body);
        if (!updatedApplication) {
            return res.status(404).json({
                status: "failure",
                message: "No such  job found."
            })
        } else {
            return res.status(200).json({
                status: "success",
                message: "job Role updated  Successfully.",
                data: {
                    Application: updatedApplication
                }
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



module.exports = {
    addApplication: errorWrapper(addApplication)
    , getApplication: errorWrapper(getApplication)
    , manageApplicationStatus: errorWrapper(manageApplicationStatus)
    , getApplicationsForProvider: errorWrapper(getApplicationsForProvider)
    , cancelApplication: errorWrapper(cancelApplication),
  
};