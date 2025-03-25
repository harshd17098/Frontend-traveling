import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { FaPlaneDeparture, FaPlaneArrival, FaRupeeSign, FaClock } from "react-icons/fa";
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const BookFlight = ({ availableFlights, loading }) => {

  const navigate = useNavigate();
  const handleBookFlight = (flightId) => {
    navigate(`/final-booking/${flightId}`);
  };
  
  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        ✈ Available Flights
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <Skeleton height={25} width="50%" />
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="40%" />
              <Skeleton height={35} width="100%" className="mt-3" />
            </div>
          ))}
        </div>
      ) : availableFlights.length > 0 ? (
        <div className="space-y-3">
          {availableFlights.map((flight, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <div className="w-3/4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaPlaneDeparture className="mr-2 text-blue-600" />
                  {flight.flightName}
                </h3>
                <p className="text-gray-600 text-sm flex items-center">
                  <FaPlaneDeparture className="mr-2 text-gray-500" /> {flight.departure}
                  <span className="mx-2 text-gray-400">➡</span>
                  <FaPlaneArrival className="mr-2 text-gray-500" /> {flight.arrival}
                </p>
                <p className="text-gray-500 text-sm flex items-center">
                  <FaClock className="mr-2 text-gray-500" /> {flight.departureTime} - {flight.arrivalTime}
                </p>
                <p className="text-gray-500 text-sm flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" /> Available from {flight.availableFrom} to {flight.availableTo}
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold text-blue-600 flex items-center">
                  <FaRupeeSign className="mr-1 text-green-500" />
                  {flight.cost}
                </p>
                <button  onClick={() => handleBookFlight(flight._id)} className="mt-2 px-4 py-1.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No flights available.</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default BookFlight;
