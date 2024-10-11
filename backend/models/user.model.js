import dotenv from 'dotenv';
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST, 
    dialect: 'mysql',
})

const User = sequelize.define('User', {
    reg_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    u_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    pswd: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    f_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    l_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: '/profilepic.png',
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},{
    timestamps: true,
});

sequelize.sync()
.then(()=>{
    console.log("User table created successfully.")
})
.catch(error =>{
    console.error("Error creating tabel: ", error);
});

export default User;