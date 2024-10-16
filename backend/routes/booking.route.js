import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addBooking, getBooking, getBookingsWithAirline } from '../controllers/booking.controller.js';
const router = express.Router();

router.post('/add-booking/:flightId', verifyToken, addBooking);
router.get('/get-bookings', getBooking)
router.get('/get-bookings-airline', getBookingsWithAirline)

export default router;