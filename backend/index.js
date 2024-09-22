import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/user' ,userRoutes);   
app.use('/api/auth', authRoutes);

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

