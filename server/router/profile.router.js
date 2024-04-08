const express = require("express");
const { verifyToken } = require("../util/authenticate");
const { postProfile, editProfile } = require("../cntrl/profileController");

const Router = express.Router();



//..........Routes for Profile..............

Router.post("/", verifyToken, postProfile)
Router.put("/:id", verifyToken, editProfile)

module.exports = Router; 