// usermodel polethanne
const mongoose = require('mongoose')
const blogschema = mongoose.Schema({
    heading:{
        type:String,
        required:true,
        default:"new heading"

    },
    createdAt:{
        type:Date,
        default:new Date()
        
    },
    createdBy:{
       type:mongoose.Types.ObjectId,
       ref: 'user'

    },


    content:{

        type:String,
        required:true,

    },
  image:[]

})

const blogs = mongoose.model("blogs",blogschema)
module.exports=blogs