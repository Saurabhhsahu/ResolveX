import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

const db = async() => {
    try{
        const conn = await mongoose.connect(MONGO_URL)
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error in connecting db : ",err);
    }
}

export default db;