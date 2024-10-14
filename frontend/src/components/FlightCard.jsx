import React from "react";
import "../styles/FlightCard.css"; // Assuming you have some basic styles
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const FlightCard = ({ flight }) => {
    const {currentUser} = useSelector((state)=> state.user);
    const navigate = useNavigate();
    const handleClick = () => {
        if(currentUser == null){
            navigate('/login')
        }
        else{
            navigate(`/booking/${flight.flightId}`)
        }
    }
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
          <div className="stops">{flight.no_of_stops > 0 ? `${flight.no_of_stops} stops` : "Non stop"}</div>
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
    </div>
  );
};

export default FlightCard;
