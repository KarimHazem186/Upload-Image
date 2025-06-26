const mongoose = require('mongoose')

// const DB = 'mongodb+srv://mern-auth:mern1234@mern-auth.embzx.mongodb.net/ImgUpload?retryWrites=true&w=majority&appName=MERN-Auth'
const DB = process.env.DATABASE 

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('Database Connected'))
.catch((error)=>console.log("error: "+error.message))