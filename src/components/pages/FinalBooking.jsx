import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FaChair } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const FinalBooking = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [flight, setFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setbookedSeat] = useState([])

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:7890/flights/fetchFlight/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlight(res.data.singleFlight);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    if (id && token) {
      fetchFlightDetails();
    }
  }, [id, token]);

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedSeats.length) {
      return toast.error("Please select at least one seat to proceed.");
    }
    try {
      const res = await axios.post("http://localhost:7890/booking/bookFlight",
        { flightId: flight._id, selectedSeats },
        { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Booking confirmed!", res.data);
    } catch (error) {
      toast.error("Booking Not Confirmed something went wrong!");
    }
  };

  useEffect(() => {
    let fetchBookings = async () => {
      try {
        let res = await axios.get("http://localhost:7890/booking/getFlight", { 
          headers: { Authorization: `Bearer ${token}` },
         });
         const temparr = res.data.getBooking
          .filter((val) => val.flightId === id)
          .flatMap((val) => val.seats);
         setbookedSeat(temparr)
         
        // console.log(res.data.getBooking);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    }
    fetchBookings()
  }, [id, token])

  // bookedSeats.map((val)=>{
  //   console.log(val);
  // })
  


  if (!flight) return <p className="text-center text-gray-500">Loading flight details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Final Booking for {flight.flightName}</h2>
        <p className="text-gray-600">{flight.departure} ➡ {flight.arrival}</p>
        <p className="text-gray-600">Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
        <p className="text-gray-800 font-semibold">Cost: ₹{flight.cost}</p>

        <h3 className="mt-6 text-xl font-semibold">Select Your Seats</h3>
       <div className="mt-4 grid grid-cols-6 gap-2">
          {[...Array(flight.seats || 30)].map((_, i) => (
            <button
              key={i}
              className={`p-2 w-10 h-10 border rounded-lg flex items-center justify-center 
                ${bookedSeats.includes(i + 1) ? "bg-red-500 text-white cursor-not-allowed" :
                selectedSeats.includes(i + 1) ? "bg-green-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleSeatSelection(i + 1)}
              disabled={bookedSeats.includes(i + 1)}
            >
              <FaChair className="text-lg" />
            </button>
          ))}
        </div>

        <button
          onClick={handleConfirmBooking}
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Confirm Booking
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FinalBooking;
