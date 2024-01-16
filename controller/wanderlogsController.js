
const wandercollections = require('../Model/wanderlogSchema')


//---------CREATE WANDERLOG------------------//
exports.addWaderlog = async (req, res) => {
    console.log('create wanderlog');


    const userId = req.payload
    console.log('userId=', userId);

    const wanderlogImage = req.file.filename
    console.log('wanderlog Image=', wanderlogImage);

    const { place, date, wanderlog } = req.body
    console.log(`${place},${date},${wanderlog},${wanderlogImage},${userId}`);

    try {
        const existingWanderlog = await wandercollections.findOne({ wanderlog })
        if (existingWanderlog) {
            res.status(406).json('This wanderlog Already Exisist ...Create a new wanderlog')
        } else {
            const newWanderlog = new wandercollections({
                place,
                date,
                wanderlog,
                wanderlogImage,
                userId
            })
            await newWanderlog.save()
            res.status(200).json(newWanderlog)
        }

    }
    catch (err) {
        res.status(401).json(`${err}`)
    }
}

//--------------------ALL WANDERLOG POST --------------------------//

exports.allWanderlogPost = async (req, res) => {


    try {
        const allWanderlog = await wandercollections.find()
        // console.log('allWanderlog=',allWanderlog);
        res.status(200).json(allWanderlog)
    }
    catch (err) {
        res.status(401).json(`error:${err}`)
    }
}
//----------------------INDIVIDUAL WANDERLOG----------------//

exports.individualWanderlog = async (req, res) => {
    const userId = req.payload
    // console.log('individual userid=', userId);
    try {
        const userWanderlog = await wandercollections.find({ userId })
        // console.log('userWanderlog=', userWanderlog);
        res.status(200).json(userWanderlog)
    }
    catch (err) {
        res.status(401).json(`error:${err}`)
    }

}
//--------------------UPDATE WANDERLOG-------------------------//
exports.updateWanderlog = async(req, res) => {
    const { id } = req.params
    // console.log('id=', id);

    const userId = req.payload
    console.log('update userId=', userId);

    const { place, date, wanderlog, wanderlogImage } = req.body

    const updateWanderlogImage = req.file ? req.file.filename : wanderlogImage
    console.log('updateWanderlogImage=', updateWanderlogImage);

    try{
    const editWanderlog = await wandercollections.findByIdAndUpdate({ _id: id }, { place, date, wanderlog, wanderlogImage: updateWanderlogImage, userId }, { new: true })
    await editWanderlog.save()
    res.status(200).json(editWanderlog)
}
catch(err){
    res.status(401).json(`${err}`)
}
}
//---------------------DELETE WANDERLOG----------------------------//
 exports.deleteWanderlog = async(req,res)=>{
    const {id }= req.params
    console.log('deleteWanderlog id=',id);

    try{
        const wanderlogDelete = await wandercollections.findByIdAndDelete({_id:id})
        res.status(200).json(wanderlogDelete)
    }
    catch(err){
        res.status(401).json(`${err}`)
    }

}