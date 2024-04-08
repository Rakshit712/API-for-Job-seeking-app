
const User = require("../models/UserModel");
const errorWrapper = require("../util/error");
const generateToken = require("../util/token");
const { isValiduserData } = require("../util/validator");
const bcrypt = require("bcrypt")


async function signUp(req, res) {
    try {
        const userData = req.body;
        //console.log(userData)
        const userr = await User.findOne({ email: userData.email });
        if (userr) {
            return res.status(401).json({
                status: "User already exists",
                message: "User with this email already exists"
            });
        }
        const [isValidUser, message] = isValiduserData(userData);
        if (!isValidUser) {
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }

        userData.password = await bcrypt.hash(userData.password, 10)
        const user = await User.create(userData);
        return res.status(201).json({
            status: "User created successfully",
            user
        })

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(403).json({
                status: err.message,
                message: err.message
            });
        } return res.status(err.statusCode || 500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });
    }
}
async function login(req, res) {

    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
        throw {
            statusCode: 403,
            status: "Login failure",
            message: "User is not signed in"

        }

    }
    // console.log(user.password)
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw {
            statusCode: 401,
            status: 'Login Failure',
            message: "Wrong Password"

        }

    }
    const token = generateToken({
        userId: user._id,
        isProvider: user.isProvider
    })
    // console.log(token);
    return res.status(200).json({
        status: 'Login success!',

        message: "user logged  In Successfully",
        token: token
    })



}


module.exports = {
    signUp: errorWrapper(signUp),
    login: errorWrapper(login)
};