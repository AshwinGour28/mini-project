import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addBooking } from '../controllers/booking.controller.js';
const router = express.Router();

router.post('/add-booking/:flightId', verifyToken, addBooking);

export default router;