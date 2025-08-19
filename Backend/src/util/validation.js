// if we check the email id and password is valid then we use validater(npm i validater)
const validater = require('validater')

function validation(data){
    const mandatoryField = ['name','email','password'];

    const ispresent = mandatoryField.every((ele)=>Object.keys(data).includes(ele));
    if(!ispresent){
        throw new Error("Some field are missing");
    }

    if(!validater.isEmail(data.email)){
        throw new Error("Invalid Email ID");
    }

    if(!validater.isStrongPassword(data.password)){
        throw new Error("Week Password");
    }

}

module.exports = validater;