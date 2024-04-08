require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(payload) {
    return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '1d' })

}
module.exports = generateToken;