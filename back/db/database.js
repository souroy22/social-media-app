const mongoose = require("mongoose");


const connectToDatabase = async () => {
     try {
          await mongoose.connect(process.env.MONGO_URI, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          });
          console.log(`Successfully connected to database`);
     } catch (error) {
          console.log(`Error while connecting to database, error: ${error.message}`);
     }
}

module.exports = connectToDatabase;