import mongoose from "mongoose";

const connectDatabase = async () => {
    console.log("Waiting for database connection");

    mongoose.connect(
        process.env.MONGODB_URI
    ).then(
        () => console.log("MongoDB Atlas Connected")
    ).catch(
        (error) => console.log(error)
    );
};

export default connectDatabase;