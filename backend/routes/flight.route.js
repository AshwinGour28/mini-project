import express from "express";
import { verifyToken } from '../utils/verifyUser.js'
import { addFlight, deleteFlight, getFlights } from "../controllers/flight.controller.js";

const router = express.Router();

router.post('/add-flight', verifyToken, addFlight);
router.get('/get-flights', getFlights);
router.delete('/delete-flight/:flightId/:userId', verifyToken, deleteFlight);
export default router;