const express = require("express");
const { addApplication, getApplication, manageApplicationStatus, getApplicationsForProvider, cancelApplication } = require("../cntrl/applicationController");
const { verifyToken, verifyTokenAndIsProvider } = require("../util/authenticate");

const Router = express.Router();

//...............Routes for job seeker............

Router.post("/",verifyToken,addApplication);
Router.get("/",verifyToken,getApplication);
Router.delete("/cancellation/:id",verifyToken,cancelApplication);

 

//..............Routes for job provider...........

Router.get("/provider",verifyTokenAndIsProvider,getApplicationsForProvider);
Router.put("/:id",verifyTokenAndIsProvider,manageApplicationStatus);



module.exports = Router;