import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI_PROJECT!);
        console.log("projectdb successfully connected")
    } catch (error: any) {
        console.log(error)
    }
}

export {connectDB};