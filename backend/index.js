import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'tiger',
    database: 'airlinereservationsystem',
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

app.get('/registration', (req, res)=>{
    const sql = "SELECT * FROM registration";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


