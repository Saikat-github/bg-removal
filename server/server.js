import 'dotenv/config' 
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';


//App Config
const PORT = process.env.PORT || 8080;
const app = express();
await connectDB()

//Initialize middleware
app.use(express.json());
app.use(cors());


//API routes
app.get('/', (req, res) => {
    res.send("API working")
});

app.use("/api/user", userRouter);


app.listen(PORT, () => console.log("Server running on port", PORT))