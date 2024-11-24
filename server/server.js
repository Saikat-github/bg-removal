import 'dotenv/config' 
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';


//App Config
const PORT = process.env.PORT || 4000;
const app = express();
connectDB()

//Initialize middleware
app.use(express.json());
app.use(cors());




//API routes
app.get('/', (req, res) => {
    res.send("API working")
});

app.use("/api/user", userRouter);

// app.use((req, res, next) => {
//     res.status(404).json({ error: "Route not found" });
// });



app.listen(PORT, () => console.log("Server running on port", PORT))