import 'dotenv/config' 
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';


//App Config
const PORT = process.env.PORT || 8080;
const app = express();

//Initialize middleware
app.use(express.json());
app.use(cors());


//DB connection
await connectDB()


//API routes
app.get('/', (req, res) => {
    res.send("API working")
});

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);


app.listen(PORT, () => console.log("Server running on port", PORT))