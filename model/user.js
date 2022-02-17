const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
 
   email:{
    type:String,
    required:true,
    unique:true
   },
    
      mentor: {
        type: String,
        required:true,
      },
      village: {
        type: String,
        required:true,
      },
      groupLeader: {
        type: String,
        required:true,
      },
      memberNumber: {
        type: String,
        required:true,
      },
      phone:{
        type:Number,
        required:true,
      },
      address: {
        type: String,
        required:true,
        
      },
      
      birthDay: { type: Number ,required:true,},
      birthMonth: { type: Number,required:true, },
      birthYear: { type: Number,required:true, },


  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
