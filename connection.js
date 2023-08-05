/*This code is a JavaScript function that connects a Node.js application 
to a MongoDB database using the Mongoose library*/
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.mongodb_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB