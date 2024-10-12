import Flight from "../models/flight.model.js";
import { errorHandler } from "../utils/error.js"

export const addFlight = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to add new flight'));
    }
    if (!flightDetails.flightNumber || !flightDetails.departure || !flightDetails.arrival || !flightDetails.date || !flightDetails.time || !flightDetails.airline || !flightDetails.route || !flightDetails.numberOfStops || flightDetails.price) {
        return next(errorHandler(400, 'Please provide all the fields'));
      }
    try{
        const newFlight = new Flight({
            ...req.body, userId: req.user.id,
        });
        res.status(201).json(newFlight)
    }catch(error){
        next(error)
    }
    
    
}