import mongoose from "mongoose"

const connectDB = async () =>{
    if (mongoose.connection.readyState === 1) {
        return;
    }
    try {
        console.time('MongoDB Connection start Time'); 
        await mongoose.connect(process.env.MONGO_URI_USERS!,{
            connectTimeoutMS: 10000, // Timeout for initial connection attempt
            serverSelectionTimeoutMS: 5000, // Timeout for selecting a server
        });
        console.log("usersdb successfully connected")
    } catch (error: any) {
        console.error("Database connection error:", error); 
        throw new Error('Failed to connect to MongoDB'); 
    } finally{
        console.timeEnd('MongoDB Connection end Time');
    }
}

export {connectDB};