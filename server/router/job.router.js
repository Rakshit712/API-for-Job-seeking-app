const { postJob, updateJobRole, deleteJob, getJobs, getjobById, filterJobs, getjobByProviderId } = require("../cntrl/jobController");
const express = require("express");

const { verifyToken, verifyTokenAndIsProvider, verifyTokenAndAuthenticate } = require("../util/authenticate");

const Router = express.Router();

//........Routes for Job...........

Router.post("/",verifyToken, postJob)
Router.get("/MyJobs/:id",verifyToken,getjobByProviderId)
Router.patch("/:id", verifyTokenAndAuthenticate, updateJobRole)
Router.delete("/:id", verifyTokenAndAuthenticate, deleteJob)
Router.get("/",  getJobs)
Router.get("/searchh",filterJobs);
Router.get("/:id",getjobById)


module.exports = Router