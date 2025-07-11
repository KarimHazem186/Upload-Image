const express = require('express')
const router = new express.Router();
const multer = require('multer');
const usersModel = require('../model/usersSchema')
const moment = require('moment');

// router.get("/",(req,res)=>{
//     res.send("Server Start router")
// })

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")

    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}. ${file.originalname}`)
    }
})

// img filter

const isImage = (req,file,callback)=> {
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    } else {
        callback(new Error("Only images are allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})


router.post("/register",upload.single("photo"),async(req,res)=>{
    const {filename} = req.file;
    
    const {fname} = req.body;
    
    if(!fname||!filename) {
        res.status(401).json({status:401,message:"Fill all the data"})
    }

    try {
        const date=moment(Date.now()).format("YYYY-MM-DD")  ;

        const userdata = new usersModel({
            fname:fname,
            imgpath:filename,
            date:date
        });
        const finaldata = await userdata.save();

        res.status(201).json({status:201,finaldata})

    } catch(error) {
        res.status(401).json({status:401,error})
    }

})

// user data get 
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await usersModel.find();

        res.status(201).json({status:201,getUser})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

// delete user data 
router.delete("/:id",async(req,res)=>{
    try {
        const {id} =req.params;

        const dltUser = await usersModel.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser})
    } catch(error) {
        res.status(401).json({status:401,error})

    }
})


module.exports = router