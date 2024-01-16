// import dotenvenv
require('dotenv').config()

// import express
const express = require('express')
//import cors
const cors = require('cors')

//import router
const router = require('./Routing/router')

//import connection.js
require('./DB/connection')



//create server using express
const wanderlogServer = express()

//use of cors by server
wanderlogServer.use(cors())

wanderlogServer.use(express.json())

//server using the router
wanderlogServer.use(router)

wanderlogServer.use('/uploads', express.static('./uploads'))


//customize port

const PORT = process.env.PORT || 4000;

/* run server  */
wanderlogServer.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})

// wanderlogServer.get('/',(req,res)=>{
//     res.send(`<h1>Wanderlog</h1>`)
// })
