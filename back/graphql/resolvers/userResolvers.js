const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const {
     validateSignupFields,
     validateLoginFields,
} = require("../../utils/validationCheck");

const userResolvers = {
     Query: {},
     Mutation: {
          signup: async (parent, args, context, info) => {
               const { name, email, phone, username, password, confirmPassword } = args.signupFields;
               const { errors, isValid } = validateSignupFields(
                    name,
                    email,
                    phone,
                    username,
                    password,
                    confirmPassword
               );
               if (!isValid) {
                    throw new UserInputError("Errors", { errors });
               }
               let isExist = await User.find({ email });
               if (isExist.length) {
                    throw new UserInputError(
                         `This email id is already exists. Please use another email id`,
                         {
                              errors: {
                                   email:
                                        "This email id is already exists. Please use another email id",
                              },
                         }
                    );
               }
               isExist = await User.find({ username });
               if (isExist.length) {
                    throw new UserInputError(
                         `This username is already exists. Please use another username`,
                         {
                              errors: {
                                   username:
                                        "This username is already exists. Please use another username",
                              },
                         }
                    );
               }
               isExist = await User.find({ phone });
               if (isExist.length) {
                    throw new UserInputError(
                         `This phone number is already exists. Please use another phone number`,
                         {
                              errors: {
                                   phone:
                                        "This phone number is already exists. Please use another phone number",
                              },
                         }
                    );
               }
               // hash password
               const hashPassword = await bcrypt.hash(password, 12);
               let newUser = new User({
                    name,
                    email,
                    password: hashPassword,
                    username,
                    phone,
               });
               newUser = await newUser.save();
               return newUser;
          },
          login: async (parent, args, context, info) => {
               const { userIdentity, password } = args;
               const { errors, isValid } = validateLoginFields(userIdentity, password);
               if (!isValid) {
                    throw new UserInputError("Erros", { errors });
               }
               let user = await User.find({ email: userIdentity });

               if (!user.length) {
                    user = await User.find({ username: userIdentity });
               }
               if (!user.length) {
                    user = await User.find({ phone: userIdentity });
               }
               if (!user.length) {
                    throw new UserInputError(`No such user found! Please Signup first.`, {
                         errors: {
                              user: "No such user found! Please Signup first.",
                         },
                    });
               }
               user = user[0];
               const verifyPassword = await bcrypt.compare(password, user.password);

               if (!verifyPassword) {
                    throw new AuthenticationError("EmailId or password doesn't match", {
                         errors: {
                              validationError: "EmailId or password doesn't match",
                         },
                    });
               }

               // generate token
               const token = jwt.sign(
                    {
                         id: user.id,
                         email: user.email,
                         username: user.username,
                         phone: user.phone,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "7d" }
               );
               return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    phone: user.phone,
                    token,
               };
          },
     },
};

module.exports = userResolvers;
