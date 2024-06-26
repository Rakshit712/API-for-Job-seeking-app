const Profile = require("../models/ProfileModel");

async function postProfile(req, res) {
    try {
        const profileData = req.body;
        const profile = await Profile.findOne({ email: profileData.email })
        if (profile) {
            return res.status(401).json({
                status: "Profile already exist",
                message: "profile with  this email is already registered"
            })
        }
        const newProfile = await Profile.create(profileData);
        if (newProfile) {
            return res.status(201).json({
                status: "success",
                message: "profile Created",
                data:newProfile
            })
        }
        else {
            return res.status(400).json({
                status: "failure",
                message: "Something went wrong while creating the profile."
            });
        }

    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });

    }
}

async function editProfile(req, res) {
    try {
        let id = req.params.id;
        const body = req.body;

        const updatedUser = await Profile.findByIdAndUpdate({ _id: id }, body)
        if (updatedUser) {
            res.status(200).json({
                status: "success",
                message: "profile updated successfully",
                data:updatedUser
            })

        }
        else {
            res.status(404).json({
                status: 'fail',
                message: 'No such user found'
            })
        }
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });

    }
}

async function getProfile(req,res){
    try {
        
        const id = req.params.id;
        const user = await Profile.find({userId:id});
        if(user.length>0){
            return res.status(200).json({
                status: "success",
                message: "profile fetched successfully",
                data:user
            })
        }
        else{
            return res.status(403).json(
                {
                    status:"failure",
                    message:"No Profile found for this user"
                }
            )
        }

    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });
    }
}

module.exports = { postProfile, editProfile ,getProfile};