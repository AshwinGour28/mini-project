import Flight from "../models/flight.model.js";
import { errorHandler } from "../utils/error.js"
import { Op } from 'sequelize';


export const addFlight = async (req, res, next) => {
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

export const getFlights = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

        const queryOptions = {
            where: {
                ...(req.query.flightId && { flightId: req.query.flightId }), 
                ...(req.query.userId && { reg_id: req.query.userId }),  
                ...(req.query.date && { date: req.query.date }),  
                ...(req.query.arrival_time && { arrival_time: req.query.arrival_time }),  
                ...(req.query.dep_time && { dep_time: req.query.dep_time }),  
                ...(req.query.source && { source: req.query.source }), 
                ...(req.query.destination && { destination: req.query.destination }), 
                ...(req.query.searchTerm && {
                    [Op.or]: [
                        { route: { [Op.like]: `%${req.query.searchTerm}%` } },
                    ],
                }),
            },
            order: [['price', sortDirection]],
            offset: startIndex,
            limit: limit,
        };

        const flights = await Flight.findAll(queryOptions);

        const totalFlights = await Flight.count();

        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const lastMonthFlights = await Flight.count({
            where: {
                createdAt: { [Op.gte]: oneMonthAgo },
            },
        });

        res.status(200).json({
            flights,
            totalFlights,
            lastMonthFlights,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFlight = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id != req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this flight'));
    }

    try {
        const deletedFlight = await Flight.destroy({
            where: { flightId: req.params.flightId } 
        });
        if (deletedFlight) {
            res.status(200).json('Flight has been deleted');
        } else {
            res.status(404).json('Flight not found');
        }
    } catch (error) {
        next(error);
    }
};
