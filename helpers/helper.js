const USER = require('../models/usersmodel').user
const mongoose = require('mongoose')



const getUserData = (userId) =>{
   
 return USER.find({_id:userId},{password:0})


}

module.exports = getUserData