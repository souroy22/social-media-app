const validateSignupFields = (name, email, phone, username, password, confirmPassword) => {
     const errors = {};
     if(!name || name.trim() === ""){
          errors.name = "Name must not be empty";
     }
     const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
     if(!email || email.trim() === ""){
          errors.email = "Email id must not be empty";
     }else if(!email.match(regEx)){
          // valid email or not
          errors.email = "Invalid email id!";
     }
     if(!password || password.trim() === ""){
          errors.password = "Password must not be empty";
     }
     if(!phone || phone.trim() === ""){
          errors.phone = "Phone number must not be empty";
     }else if(phone.length < 10){
          errors.phone = "Invalid Phone number";
     }
     if(!username || username.trim() === ""){
          errors.username = "Name must not be empty";
     }
     if(!confirmPassword || confirmPassword.trim() === ""){
          errors.confirmPassword = "Confirm password must not be empty";
     }
     // match password
     if(password && confirmPassword && password !== confirmPassword){
          errors.confirmPassword = "Passwords must match";
     }
     return {errors, isValid: Object.keys(errors).length < 1};
}

const validateLoginFields = (userIndentity, password) => {
     const errors = {};
     if(!userIndentity || userIndentity.trim() === ""){
          errors.userIndentity = "Please provide Email/username/phone number";
     }
     if(!password || password.trim() === ""){
          errors.password = "Password must not be empty";
     }
     return {errors, isValid: Object.keys(errors).length < 1};
}

module.exports = {validateSignupFields, validateLoginFields};