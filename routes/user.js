const express = require('express')
const router = express.Router()
const {doSignUP,loginPage,showSignUp, doSignUp, doLogin,getHomePage,detailedView,logout,createBlog,addBlogData} = require('../controllers/usercontroller')
const userAuth = require('../middleware/userAuth')


router.get('/', loginPage)
router.get('/signup', showSignUp)
router.post('/register', doSignUp)
router.post('/login',doLogin)
router.get('/home',userAuth, getHomePage)
router.get('/detailedView',userAuth,detailedView)
router.get('/logout',logout)
router.get('/createBlog',userAuth,createBlog)
router.post('/createBlog',userAuth,addBlogData)


module.exports = router