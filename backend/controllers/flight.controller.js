import Flight from "../models/flight.model.js";
import { errorHandler } from "../utils/error.js"

export const addFlight = async (req, res, next) => {
    console.log(req.user.id);
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to add new flight'));
    }
    const { flightId, airline, source, destination, dep_time, arrival_time, date, route, no_of_stops, price } = req.body;
    const reg_id = req.user.id;
    if (!flightId || !airline || !destination || !source || !dep_time || !arrival_time || !date || !route || !no_of_stops || !price) {
        return next(errorHandler(400, 'Please provide all the fields'));
      }
    try{
        const newFlight = await Flight.create({
            ...req.body, reg_id,
        });

        res.status(201).json(newFlight);
    }catch(error){
        next(error)
    }
    
    
}