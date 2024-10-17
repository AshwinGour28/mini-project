import dotenv from 'dotenv';
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST, 
    dialect: 'mysql',
})

const Flight = sequelize.define('Flights', {
    flightId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    airline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dep_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    arrival_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    route: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_of_stops: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reg_id: {
        type: DataTypes.INTEGER,
        defaultValue: 27
    },
    
},{
    timestamps: false, 
});

sequelize.sync()
.then(()=>{
    console.log("Flight Details table created successfully.")
})
.catch(error =>{
    console.error("Error creating table: ", error);
});

export default Flight;