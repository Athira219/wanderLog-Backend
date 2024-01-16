//1) import express
const express = require('express')

const logUserController = require('../controller/loguserController')
const wandercollections = require('../controller/wanderlogsController')

const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multer')

//2)create an object for router() class in the express module
const router = new express.Router()

//3)path to resolve the request

//register
router.post('/wanderloguser/register', logUserController.wanderRegister)

//login
router.post('/wanderloguser/login', logUserController.wanderLogin)

//add wanderlog
router.post('/wanderlog/addwanderlog', jwtMiddleware, multerConfig.single('wanderlogImage'), wandercollections.addWaderlog)

/* //all wanderlog post */
router.get('/wanderlog/allWanderlogPost', wandercollections.allWanderlogPost)


/* //user wanderlog  */
router.get('/wanderlog/WanderlogUserPost', jwtMiddleware, wandercollections.individualWanderlog)

/* // update wanderlog*/
router.put('/wanderlog/wanderlogUpdate/:id', jwtMiddleware, multerConfig.single('wanderlogImage'), wandercollections.updateWanderlog)

/* //Delete wanderlog*/
router.delete('/wanderlog/wanderlogDelete/:id', jwtMiddleware, wandercollections.deleteWanderlog)

/* //update profile*/
router.put('/wanderlog/updateWanderlogProfile', jwtMiddleware, multerConfig.single('profile'), logUserController.updateProfile)
//4) export router
module.exports = router
