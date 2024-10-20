import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import flightRoutes from './routes/flight.route.js';
import bookingRoutes from './routes/booking.route.js';

dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/user' ,userRoutes);   
app.use('/api/auth', authRoutes);
app.use('/api/flight', flightRoutes);
app.use('/api/booking', bookingRoutes)

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}
)

app.listen(3000, ()=>{
    console.log("Server is running !!");
})

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected")
    }
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})