//import model
const wanderlogusers = require('../Model/loguserSchema')
//import 
const jwt = require('jsonwebtoken')

//---------------------------register------------------------------//

exports.wanderRegister = async (req, res) => {
    console.log('wanderRegister');
    //extract data from request body - json() in index.js file json data into javascript object
    const { username, email, password, } = req.body
    try {
        const existingUser = await wanderlogusers.findOne({ email })
        if (existingUser) {
            res.status(406).json('Account already exist... Please Login ')
        } else {
            const newWanderUser = new wanderlogusers({
                username: username,
                email,
                password,
                bio: '',
                profile: ''
            })
            //save function in mongoose - to permanently store this data in mongodb
            await newWanderUser.save()
            //response 
            res.status(200).json(newWanderUser)

        }
    }
    catch (err) {
        res.status(401).json(`registration failed due to ${err}`)
    }
    
}
//-------------------------------login -----------------------------//

exports.wanderLogin = async (req, res) => {
    console.log('login function');
    const { email, password } = req.body

    try {
        const existLoginUser = await wanderlogusers.findOne({ email, password })
        console.log(existLoginUser);
        if (existLoginUser) {
            const token = jwt.sign({ userId: existLoginUser._id }, 'jwtkey')
            res.status(200).json({
                existLoginUser,
                token
            })

        } else {
            res.status(406).json('Invalid Email & Password')
        }

    }
    catch (err) {
        res.status(401).json(`${err}`)
    }

}
//---------------------UPDATE PROFILE---------------------------------//
exports.updateProfile = async(req, res) => {
    const userId = req.payload
    console.log('userid', userId);

    const { username, bio, profile } = req.body
    const updateProfileImage = req.file ? req.file.filename : profile

    try{
    const editProfile = await wanderlogusers.findByIdAndUpdate({_id:userId},{username,bio,profile:updateProfileImage},{new:true})
    await editProfile.save()
    res.status(200).json(editProfile)
    }
    catch(err){
        res.status(401).json(`${err}`)
    }
}