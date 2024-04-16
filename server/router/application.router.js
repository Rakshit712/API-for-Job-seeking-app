const express = require("express");
const { addApplication, getApplication, manageApplicationStatus, getApplicationsForProvider, cancelApplication, filterApplications } = require("../cntrl/applicationController");
const { verifyToken, verifyTokenAndIsProvider } = require("../util/authenticate");

const Router = express.Router();

//...............Routes for job seeker............

Router.post("/",verifyToken,addApplication);
Router.get("/",verifyToken,getApplication);
Router.delete("/cancel/:id",verifyToken,cancelApplication);
Router.get("/filter",verifyToken,filterApplications);
 

//..............Routes for job provider...........

Router.get("/jobApplication",verifyTokenAndIsProvider,getApplicationsForProvider);
Router.put("/updateApplication/:id",verifyTokenAndIsProvider,manageApplicationStatus);



module.exports = Router;