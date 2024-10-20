import Flight from "../models/flight.model.js";
import { errorHandler } from "../utils/error.js"
import { Op, Sequelize } from 'sequelize';


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
        const sortDirection = req.query.order === 'asc' ? 'DESC' : 'ASC';

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
        
        const flightsByAirline = await Flight.findAll({
            attributes: ['airline', [Sequelize.fn('COUNT', Sequelize.col('airline')), 'totalFlights']],
            group: ['airline'],
        });

        const revenueByAirline = await Flight.findAll({
            attributes: ['airline', [Sequelize.fn('SUM', Sequelize.col('price')), 'totalRevenue']],
            group: ['airline'],
        });

        const averagePriceResult = await Flight.findOne({
            attributes: [[Sequelize.fn('AVG', Sequelize.col('price')), 'avgPrice']],
        });
    
        const averagePrice = averagePriceResult ? parseFloat(averagePriceResult.dataValues.avgPrice) : null;

        function formatNumber(num) {
            if (num >= 1e6) {
                return (num / 1e6).toFixed(2) + 'M';
            } else if (num >= 1e3) {
                return (num / 1e3).toFixed(2) + 'K';
            } else {
                return num.toFixed(2);
            }
        }

        const formattedAveragePrice = averagePrice !== null ? formatNumber(averagePrice) : null;
        

        res.status(200).json({
            flights,
            totalFlights,
            flightsByAirline,
            revenueByAirline,
            averagePrice:formattedAveragePrice,
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
