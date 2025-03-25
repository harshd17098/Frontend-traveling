import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookHotel = ({ availableHotels, loading }) => {
  console.log(availableHotels);

  const handleBookHotel = async (hotelId) => {
    try {
      const res = await axios.post(
        `http://localhost:7890/hotels/book/${hotelId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Book Your Perfect Stay</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-300 h-32 w-96 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableHotels.map((hotel) => (
            <div key={hotel._id} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={`http://localhost:7890${hotel.image}`}
                alt={hotel.hotelName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{hotel.hotelName}</h2>
                <p className="text-gray-600 mb-2">📍 {hotel.city}</p>
                <p className="text-gray-800 font-bold">💰 ₹{hotel.price}/night</p>
                <button
                  className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleBookHotel(hotel._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookHotel;
