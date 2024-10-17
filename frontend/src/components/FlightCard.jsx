import React, { useState } from "react";
import "../styles/FlightCard.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const FlightCard = ({ flight }) => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (!currentUser) {
            navigate('/login');
        } else {
            setShowModal(true); // Show the modal
        }
    };

    const handleConfirmBooking = () => {
        setShowModal(false); // Close the modal
        navigate(`/booking/${flight.flightId}`); // Use template literal for dynamic route
    };

    return (
        <div className="flex flex-row gap-20 mt-5 justify-center items-center p-4 w-fit mx-auto bg-white border-4 border-blue-400 rounded-2xl text-2xl">
            {/* Airline and flight number */}
            <div className="airline-info">
                <div className="airline-name">{flight.airline}</div>
                <div className="flight-id">{flight.flightId}</div>
            </div>

            {/* Time and route */}
            <div className="flight-time-route">
                <div className="departure-time">{flight.dep_time}</div>
                <div className="departure-city">{flight.source}</div>
            </div>

            {/* Stops and duration */}
            <div className="stops-duration">
                <div className="duration">02 h 45 m</div>
                <HiArrowNarrowRight className="w-full size-9" />
                <div className="stops">{flight.no_of_stops > 0 ? `${flight.no_of_stops} stops` : "Non-stop"}</div>
            </div>

            <div className="flight-time-route">
                <div className="departure-time">{flight.arrival_time}</div>
                <div className="departure-city">{flight.destination}</div>
            </div>

            {/* Price and actions */}
            <div>
                <div className="price">₹ {flight.price}</div>
                <button className="view-prices-btn" onClick={handleClick}>BOOK NOW</button>
            </div>

            {/* Modal for booking confirmation */}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' className='bg-opacity-30'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to book this flight?</h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='success' onClick={handleConfirmBooking}>Yes, Book Now</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FlightCard;
