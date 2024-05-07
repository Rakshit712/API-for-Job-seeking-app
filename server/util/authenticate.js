const jwt = require("jsonwebtoken");
const Job = require("../models/JobModel");



const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        //console.log(token)
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: "failure",
                    message: "session expired....Please login again"
                })
            }
            else {
                req.user = user;
                next()
            }
        })
    } else {
        return res.status(401).json({
            status: "failure",
            message: "you are not authenticated"
        })
    }
}

const verifyTokenAndIsProvider = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user.payload);
        if (req.user.payload.isProvider) {
            next()
        } else {
            res.status(401).json({
                status: "failure",
                message: "you are not allowed to do the changes"
            })
        }
    })

}
const verifyTokenAndAuthenticate = (req, res, next) => {
    verifyToken(req, res, async () => {
        //console.log(req.params);
        //console.log(req.user.payload.userId);
        const jobPost = await Job.findById(req.params.id);
        if (!jobPost) {
            return res.status(404).json({
                status: 'failure',
                message: 'Job post does not exist'
            });
        }
        //console.log(jobPost)
        const postAuthorId = jobPost.jobProviderId.toString();
        if (req.user.payload.userId === postAuthorId && req.user.payload.isProvider) {
            next()
        } else {
            return res.status(401).json({
                status: "failure",
                message: "you are not  authorized for this operation"
            })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndIsProvider, verifyTokenAndAuthenticate };