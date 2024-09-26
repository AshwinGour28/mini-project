import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


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

export const signin = async (req, res, next) => {
    const {email, pswd} = req.body;

    if(!email || !pswd || email==='' || pswd===''){
        next(errorHandler(400,'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ where : {email} })

        if(!validUser){
            return next(errorHandler(404, "User not Found!"));
        }

        const validPassword = bcryptjs.compareSync(pswd, validUser.pswd);
        if(!validPassword){
            return next(errorHandler(400, "Invalid Password"));
        }

        const token = jwt.sign(
            { id: validUser.reg_id }, process.env.JWT_SECRET
        );

        const { pswd: password, ...rest} = validUser.dataValues;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
}