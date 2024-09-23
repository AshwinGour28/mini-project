import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next)=>{
    const { u_name, email, pswd, f_name, l_name} = req.body;

    if(!u_name || !pswd || !f_name || !l_name){
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(pswd, 10);

    try {
        const newUser =await User.create({
            u_name,
            email,
            pswd: hashedPassword,
            f_name,
            l_name,
        });
        res.json('SignUp successfull');

    } catch (error) {
        next(error);
    }
}