const express = require("express");
const { signUp, login } = require("../cntrl/userController");


const Router = express.Router();


Router.post("/register", signUp)
Router.post("/", login)


module.exports = Router;