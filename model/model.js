const mongoose = require("mongoose");
const { object } = require("webidl-conversions");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    skilltoteach:{
        type:[String],
        required:true
    },
    skilltolearn:{
        type:[String],
        required:true
    },
    email:{
        type:String,
        required:true
    },
      contact:{
        type:Object,
        required:true
    },
    shortdescription:{
        type:String,
        required:true
    }   
})

module.exports = mongoose.model("userdata",userSchema);