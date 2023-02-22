const  mongoose = require ('mongoose')
const dotenv = require('dotenv');
dotenv.config();

module.exports = async() => {
    try{
      
        mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
           
        })
    }catch(error){
        console.log("error is ",error)
        throw new Error (error)
    }
}