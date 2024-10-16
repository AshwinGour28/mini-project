import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addBooking, getBooking } from '../controllers/booking.controller.js';
const router = express.Router();

router.post('/add-booking/:flightId', verifyToken, addBooking);
router.get('/get-bookings', getBooking)

export default router;