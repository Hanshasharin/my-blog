

const { response } = require("express");
const mongoose = require('mongoose')
const USER = require('../models/usersmodel').user;
const BLOGS =require('../models/blogschema') 
const jwt = require('jsonwebtoken');
const multer = require('multer')






const loginPage = (req , res ) =>
{
      if(req.cookies.userJwt){
        res.redirect('/home')
}
    else{
    res.render('users/login.hbs');}
};

const showSignUp = (req , res ) =>
{
    res.render('users/signup.hbs')
};



const doSignUp = async (req,res) =>{

    console.log(req.body);
    try{
        const UserExist = await USER.findOne({email:req.body.email})
        if(UserExist){
            return res.json({signup:false})
        
    }else{
    USER({

        email:req.body.email,
        name:req.body.name,
        password:req.body.password,
    }).save().then((resp)=>{
        
        res.json({signup:true});
    }).catch(()=>{
        res.json({signup:false});

    });
}
}catch(error){
    res.json({error:"somethimg went wrong"})
}
};

const doLogin =  (req,res) =>{

    
    USER.find({

        email:req.body.email,
        password:req.body.password
    }).then((response) =>{
        
        if(response.length > 0){

            const token = jwt.sign({userID:response[0]._id},"secretkey",{expiresIn:'2d'})
            res.cookie('userJwt',token,{
       httpOnly:true,
       sameSite:'lax',
       secure:false,
       maxAge:24*60*60*1000

            })

            res.status(200).json({login:true});
        }
        else{
            res.json({login:false});
              
        }
    })

}

const getHomePage = (req,res) =>{
    BLOGS.find().then((response) => {
        // console.log(response);
    res.render('users/home.hbs', {data:response})
})
}
    
 const detailedView = (req,res)   =>{
    BLOGS.find({_id:req.query.id}).populate({
        path:"createdBy",
        select:['name','email']}).then((response)=>{
        console.log(response);
        res.render('users/detailedView.hbs',{data:response[0]})
    })
 
 }

 const logout = (req,res)   =>{
    res.cookie('userJwt',null,{
        httpOnly:true,
                sameSite:'lax',
                secure:false,
                maxAge:1})

                req.cookies.userJwt = null
                res.redirect('/')
              
 
 }

const createBlog = (req,res)=>{
    res.render('users/upload.hbs')
}
const addBlogData = (req,res)=>{
    
        const fileStorage = multer.diskStorage({
        
            destination:(req,file,callback)=>{
                callback(null,"public/uploads");
            },
            filename:(req,files,cb)=>{
                cb(null,Date.now()+"-"+files.originalname);},
            });
        
        const upload= multer({storage:fileStorage}).array('image',4);
        upload(req,res,(err)=>{
            if(err){
            console.log("file upload error");}
            else{
                BLOGS({
        heading:req.body.title,
        content:req.body.content,
        createdBy:req.query.id,
        image:req.files,
                }).save().then(
        (response)=>{
            res.redirect("/home");
        })
            }
        });
        };



module.exports ={doLogin,doSignUp,loginPage,showSignUp,getHomePage,detailedView,logout,createBlog,addBlogData}





