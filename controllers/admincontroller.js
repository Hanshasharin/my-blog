const multer = require("multer");
const BLOGS = require("../models/blogschema");
const { response } = require("express");
const fs = require("fs")
const path = require("path");
const { log } = require("console");



const adminLog =((req,res)=>{
  res.render('admin/login.hbs')
})





const uploadPage = (req, res) => {
  res.render("admin/upload.hbs");
};
const createBlog = (req, res) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "public/uploads");
    },
    filename: (req, files, cb) => {
      cb(null, Date.now() + "-" + files.originalname);
    },
  });

  const upload = multer({ storage: fileStorage }).array("images", 4);

  upload(req, res, (err) => {
    if (err) {
      console.log("File upload error");
    } else {
      BLOGS({
        heading: req.body.title,
        content: req.body.content,
        images: req.files,
      })
        .save()
        .then((respose) => {
          res.redirect("/admin/uploads");
        });
    }
  });
};


const homePage = (req,res) =>{
  BLOGS.find().then((response) => {
    // console.log(response)
    res.render('admin/home.hbs',{data:response})
  })

}
const deletePost =(req,res) =>{
BLOGS.findOne({_id:req.body.postId}).then((selectedFileData) =>{
    console.log(selectedFileData);
    BLOGS.deleteOne({_id:req.body.postId}).then((resp)=>{
for(let i = 0; i < selectedFileData.image.length; i++) {
    const filePath = path.join(__dirname,'..','public/uploads',selectedFileData.image[i].filename)
    fs.unlink(filePath, (err)=>{
        console.log(err);
    })
} 
   res.json({delete:true})
  }).catch(err =>{
    res.json({delete:false})
    
})
})
}
module.exports = { uploadPage, createBlog,homePage,deletePost,adminLog};