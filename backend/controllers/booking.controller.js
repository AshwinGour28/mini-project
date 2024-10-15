import Booking from "../models/booking.model.js";
import { errorHandler } from "../utils/error.js";

export const addBooking = async (req, res, next) => {
    const { f_name , l_name, gender, mob_no, email, pass_no} = req.body;
    const reg_id = req.user.id;
    const flightId = req.params.flightId;
    if(!f_name | !l_name | !gender | !mob_no | !email | !pass_no ){
        return next(errorHandler(400, 'Please provide all the fields'));
    }
    try{
        const newBooking = await Booking.create({
            ...req.body, reg_id, flightId,
        });

        res.status(201).json(newBooking);
    }catch(error){
        next(error)
    }
} 