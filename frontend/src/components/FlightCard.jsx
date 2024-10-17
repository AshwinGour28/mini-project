import React, { useState, useEffect } from "react";
import "../styles/FlightCard.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const FlightCard = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]); // Store the flight data
    const [showModal, setShowModal] = useState(false);
    const [flightIdToBook, setFlightIdToBook] = useState(null); // Track the flight to book
    const [showMore, setShowMore] = useState(true); // Manage "Show More" button visibility
    const [startIndex, setStartIndex] = useState(0); // Track pagination for "Show More"
    const pageSize = 5; // Number of flights to show per page

    useEffect(() => {
        // Fetch flights initially when the component mounts
        fetchFlights(startIndex);
    }, [startIndex]);

    const fetchFlights = async (start) => {
        try {
            const res = await fetch(`http://localhost:3000/api/flight/get-flights?userId=${currentUser.reg_id}&startIndex=${start}&limit=${pageSize}`);
            const data = await res.json();
            if (res.ok) {
                setFlights((prev) => [...prev, ...data.flights]); // Append the new flights to the list
                if (data.flights.length < pageSize) {
                    setShowMore(false); // Hide "Show More" if there are no more flights to load
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleClick = (flightId) => {
        if (!currentUser) {
            navigate('/login');
        } else {
            setFlightIdToBook(flightId); // Store the flightId of the selected flight
            setShowModal(true); // Show the modal
        }
    };

    const handleConfirmBooking = () => {
        setShowModal(false); // Close the modal
        navigate(`/booking/${flightIdToBook}`); // Navigate to the booking page for the selected flight
    };

    const handleShowMore = () => {
        setStartIndex(flights.length); // Update startIndex to load more flights
    };

    return (
        <div className="flight-card-container">
            {flights.map((flight, index) => (
                <div key={index} className="flex flex-row gap-20 mt-5 justify-center items-center p-4 w-fit mx-auto bg-white border-4 border-blue-400 rounded-2xl text-2xl">
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
                        <button className="view-prices-btn" onClick={() => handleClick(flight.flightId)}>BOOK NOW</button>
                    </div>
                </div>
            ))}

            {/* Show More Button */}
            {showMore && (
                <button onClick={handleShowMore} className="show-more-btn text-teal-500 self-center text-sm py-7">
                    Show More
                </button>
            )}

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
