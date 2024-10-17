import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI_SUBSCRIPTION!);
        console.log("subscriptiondb successfully connected")
    } catch (error: any) {
        console.log(error)
    }
}

export {connectDB};