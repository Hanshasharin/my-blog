const express = require('express')
const router = express.Router()
const{uploadPage, createBlog,homePage,deletePost,adminLog}=require('../controllers/admincontroller')

router.get('/',homePage) 

    router.get('/uploads',uploadPage)
router.post('/createBlog',createBlog)
router.delete('/deletePost',deletePost)
router.get('/admin',adminLog)
    module.exports = router
