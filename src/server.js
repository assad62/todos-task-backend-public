const express = require('express')
const app = express();
const dotenv = require('dotenv');
const dbConnection = require('./database/connection')
const helmet = require("helmet");
const cors = require('cors')

dotenv.config();
dbConnection()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/user/',  require('./routes/taskRoutes'))
app.use('/api/v1/user/',  require('./routes/profileRoutes'))
app.use('/api/v1/auth/',  require('./routes/authRoutes'))
//app.use('/api/v1/upload/',require('./routes/fileuploadRoutes'))

const PORT = process.env.PORT || 3000;



module.exports = {
    start: () =>{
        app.listen(PORT, () =>{
          
            console.log(`server is running on port ${PORT}`)
            
        });
    }
}