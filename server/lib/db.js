import mongoose from "mongoose";

export const mongodb_connect = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to mongodb ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}