import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("employeeDb successfully connected")
    } catch (error: any) {
        console.log(error)
    }
}

export {connectDB};