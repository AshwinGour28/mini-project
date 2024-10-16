import { Op, Sequelize } from "sequelize";
import Booking from "../models/booking.model.js";
import Flight from "../models/flight.model.js";
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

export const getBooking = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

        const queryOptions = {
            where: {
                ...(req.query.book_id && { book_id: req.query.book_id }), 
                ...(req.query.userId && { reg_id: req.query.userId }),  
                ...(req.query.flightId && { date: req.query.flightId }),  
                
            },
            order: [['updatedAt', sortDirection]],
            offset: startIndex,
            limit: limit,
        };

        const bookings = await Booking.findAll(queryOptions);

        const totalBookings = await Booking.count();

        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const lastMonthBookings = await Booking.count({
            where: {
                createdAt: { [Op.gte]: oneMonthAgo },
            },
        });

        res.status(200).json({
            bookings,
            totalBookings,
            lastMonthBookings,
        });
    } catch (error) {
        next(error);
    }
};

export const getBookingsWithAirline = async (req, res, next) => {
    try {
      const bookingsWithAirlines = await Booking.findAll({
        include: [
          {
            model: Flight,
            as: 'flight',
            attributes: ['airline'],  // Get only the 'airline' column from Flight
            where: {
              flightId: Sequelize.col('Booking.flightId')
            }
          }
        ]
      });
  
      res.status(200).json({ bookings: bookingsWithAirlines });
    } catch (error) {
      next(error)
    }
  };