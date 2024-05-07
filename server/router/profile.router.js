const express = require("express");
const { verifyToken } = require("../util/authenticate");
const { postProfile, editProfile ,getProfile} = require("../cntrl/profileController");

const Router = express.Router();



//..........Routes for Profile..............

Router.post("/", verifyToken, postProfile)
Router.get('/:id',verifyToken,getProfile)
Router.patch("/:id", verifyToken, editProfile)

module.exports = Router; 