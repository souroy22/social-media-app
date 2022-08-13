const User = require("../models/userModel");
const {AuthenticationError} = require("apollo-server-core");
const jwt = require("jsonwebtoken");

const isLoggedIn = (context) => {
     const headers = context?.req?.headers?.authorization;

     if(!headers){
          throw new AuthenticationError("UnAuthorized error", {errors: {headers: "Header is missing!"}});
     }
     const token = headers.split("Bearer ")[1];
     if(!token || token.trim() === ""){
          throw new AuthenticationError("UnAuthorized error", {errors: {token: "Token is missing!"}});
     }
     const user = jwt.verify(token, process.env.SECRET_KEY);
     if(!user){
          throw new AuthenticationError("UnAuthorized error", {errors: {token: "Invalid/Expired token"}});
     }
     return user;
}

const isAuthenticated = async (id, userId) => {
     if(id !== userId){
          throw new AuthenticationError("Invalid user", {errors: {user: "Invalid user"}});
     }
     const isExist = await User.findById(id);
     if(!isExist){
          throw new AuthenticationError("Invalid user, Please login", {errors: {user: "Invalid user, Please login"}});
     }
}

module.exports = {isLoggedIn, isAuthenticated};