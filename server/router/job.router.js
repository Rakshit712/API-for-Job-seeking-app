const { postJob, updateJobRole, deleteJob, getJobs } = require("../cntrl/jobController");
const express = require("express");

const { verifyToken, verifyTokenAndIsProvider, verifyTokenAndAuthenticate } = require("../util/authenticate");

const Router = express.Router();

//........Routes for Job...........

Router.post("/", verifyTokenAndIsProvider, postJob)
Router.put("/:id", verifyTokenAndAuthenticate, updateJobRole)
Router.delete("/:id", verifyTokenAndAuthenticate, deleteJob)
Router.get("/", verifyToken, getJobs)


module.exports = Router