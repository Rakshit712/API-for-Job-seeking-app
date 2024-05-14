const { postJob, updateJobRole, deleteJob, getJobs, getjobById, filterJobs } = require("../cntrl/jobController");
const express = require("express");

const { verifyToken, verifyTokenAndIsProvider, verifyTokenAndAuthenticate } = require("../util/authenticate");

const Router = express.Router();

//........Routes for Job...........

Router.post("/", postJob)
Router.put("/:id", verifyTokenAndAuthenticate, updateJobRole)
Router.delete("/:id", verifyTokenAndAuthenticate, deleteJob)
Router.get("/",  getJobs)
Router.get("/searchh",filterJobs);
Router.get("/:id",getjobById)


module.exports = Router