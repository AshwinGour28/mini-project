import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res)=>{
    const { u_name, email, pswd, f_name, l_name} = req.body;

    if(!u_name || !pswd || !f_name || !l_name){
        return res.status(400).json({message: "All fields required"});
    }

    const hashedPassword = bcryptjs.hashSync(pswd, 10);

    try {
        const newUser = User.create({
            u_name,
            email,
            pswd: hashedPassword,
            f_name,
            l_name,
        });
        res.json('SignUp successfull');

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}