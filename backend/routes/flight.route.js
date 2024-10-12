import express from "express";
import { verifyToken } from '../utils/verifyUser.js'
import { addFlight } from "../controllers/flight.controller.js";

const router = express.Router();

router.post('/add-flight', verifyToken, addFlight);

export default router;