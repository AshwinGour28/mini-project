import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}
)

app.listen(8081, ()=>{
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

app.get('/', (req, res)=>{
    return res.json("From Backend side");
})



