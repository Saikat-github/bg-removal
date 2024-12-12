import mongoose from "mongoose";


const connectDB = async () => {
    // mongoose.connection.on('connected', () => {
    //     console.log("Database Connected");
    // })
    // await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)

    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database error : ", error.message))
}


export default connectDB;