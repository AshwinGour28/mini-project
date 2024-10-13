import express from "express";
import { verifyToken } from '../utils/verifyUser.js'
import { addFlight, getFlights } from "../controllers/flight.controller.js";

const router = express.Router();

router.post('/add-flight', verifyToken, addFlight);
router.get('/get-flights', getFlights);

export default router;