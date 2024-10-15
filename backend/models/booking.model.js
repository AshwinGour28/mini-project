import dotenv from 'dotenv';
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST, 
    dialect: 'mysql',
})

const Booking = sequelize.define('Booking', {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: 'Adult',
    },
    f_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    l_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mob_no: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    pass_no: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flightId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reg_id: {
        type: DataTypes.INTEGER,
    }
},{
    timestamps: true,
});

sequelize.sync()
.then(()=>{
    console.log("Booking table created successfully.")
})
.catch(error =>{
    console.error("Error creating table: ", error);
});

export default Booking;