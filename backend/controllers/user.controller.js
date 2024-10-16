import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res)=>{
    res.json({message: 'Api is working'});
    
}

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out')
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    if(req.user.id != req.params.userId){
        next(errorHandler(403, 'You are not allowed to update this user!'));
    }
    if(req.body.pswd){
        if(req.body.pswd.length < 6){
            next(errorHandler(400, 'Password must be at least 6 characters!'));
        }
        req.body.pswd = bcryptjs.hashSync(req.body.pswd, 10);
    }
    if(req.body.u_name){
        if(req.body.u_name.length < 7 || req.body.u_name.length>20){
            return next(errorHandler(400, 'u_name must be between 7 and 20 characters'));

        }
        if(req.body.u_name.includes(' ')){
            return next(errorHandler(400, 'u_name cannot contain spaces'));
        }
        if(req.body.u_name !== req.body.u_name.toLowerCase()){
            return next(errorHandler(400, 'u_name must be in lower case'));
        }
        if(!req.body.u_name.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'u_name can only contain letters and numbers'));
        }
    }
    try {
        await User.update(
            {
                u_name: req.body.u_name,
                email: req.body.email,
                f_name : req.body.f_name,
                l_name : req.body.l_name,
                pswd: req.body.pswd,
            },
            {
                where: { reg_id: req.params.userId },
            }
        );

        const updatedUser = await User.findByPk(req.params.userId);

        const { password, ...rest } = updatedUser.toJSON(); 

        res.status(200).json(rest);
    } catch (error) {
        next(error); 
    }
    
    
}


export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id != req.params.userId) {
        return next(errorHandler(400, "You are not allowed to delete this user"));
    }

    try {
        const deletedUser = await User.destroy({
            where: { reg_id: req.params.userId } 
        });

        if (deletedUser) {
            res.status(200).json('User has been deleted');
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        const usersCount = await User.count();

        return res.status(200).json({
            users,
            totalUsers: usersCount, 
        });
    } catch (error) {
        next(error);
    }
}