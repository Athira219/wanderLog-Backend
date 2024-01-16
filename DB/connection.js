//import monoose
const mongoose = require('mongoose')

//get the connection string

const connectionString = process.env.WanderDatabase
//  const connectionString = process.env.WanderDatabase
console.log(connectionString);

mongoose.connect(connectionString).then(()=>{
   console.log('server connected successfully with mongoDB');
}).catch((err)=>{
   console.log(`something went wrong ERROR:${err}`);
})

