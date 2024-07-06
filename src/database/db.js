const mongoose = require("mongoose");

const connectDatabase = async () => {
    console.log("Waiting for database connection");

    mongoose.connect(
        "mongodb+srv://matheusmaqueda10:q4l0ODNJtOtBam9D@mongocluster.dzvyysh.mongodb.net/?retryWrites=true&w=majority&appName=mongoCluster"
    ).then(
        () => console.log("MongoDB Atlas Connected")
    ).catch(
        (error) => console.log(error)
    );
};

module.exports = connectDatabase;