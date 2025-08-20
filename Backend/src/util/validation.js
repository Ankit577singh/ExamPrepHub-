// if we check the email id and password is valid then we use validator (npm i validator)
const validator = require('validator')

function validation(data) {
    const mandatoryField = ['name', 'email', 'password'];

    const ispresent = mandatoryField.every((ele) => Object.keys(data).includes(ele));
    if (!ispresent) {
        return { success: false, message: "Some required fields are missing" };
    }

    if (!validator.isEmail(data.email)) {
        return { success: false, message: "Invalid Email ID" };
    }

    if (!validator.isStrongPassword(data.password)) {
        return { success: false, message: "Weak Password! Password must include uppercase, lowercase, number & special character." };
    }

    return { success: true };
}

module.exports = validation;
