const mongoose = require('mongoose');
const  { Schema } = mongoose;

const userSchema = new Schema({
    name : {type:String , required : true },
    email : {type:String , required : true , unique : true},
    password : { type : String , required : true},

    verifyOtp : {type:String , default : ""  },
    verifyOtpExpired : {type:Number , default : 0  },
    isAccountVerified : {type:Boolean , default : false  },
    resetOtp : {type:String , default : ""  },
    resetOtpExpired : {type:Number , default : 0  }
});

const User = mongoose.models.user || new mongoose.model('user',userSchema);

module.exports = User;