import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminProfile = () => {
  const { token } = useContext(AuthContext); // Get token
  const [admin, setAdmin] = useState(null);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchFlight = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:7890/admin/getFlight", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(res.data);
        setAdmin(res.data.admin);
        setFlights(res.data.flights);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchFlight();
  }, [token]);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:7890/admin/getHotel", {
          headers: { Authorization: `Bearer ${token}` },
        })
        // console.log(res.data);
        setAdmin(res.data.admin);
        setHotels(res.data.Hotels);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    }
    fetchHotel()
  }, [token])


  if (!admin) return <p>Loading profile...</p>;


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <div className="mb-6">
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
      </div>

      <h3 className="text-xl font-semibold mt-4">Flights Added</h3>
      {flights.length === 0 ? <p>No flights added.</p> : (
        <ul className="list-disc pl-5">
          {flights.map((flight) => (
            <li key={flight._id} className="border p-2 my-2 rounded">
              {flight.flightName} ({flight.departure} → {flight.arrival}) - {flight.seats} seats
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-xl font-semibold mt-4">Hotels Added</h3>
      {hotels.length === 0 ? (
        <p className="text-gray-500">No hotels added.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              {/* Display Hotel Image */}
              {hotel.image && (
                <img
                  src={`http://localhost:7890${hotel.image}`}
                  alt={hotel.hotelName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <h4 className="text-lg font-bold">{hotel.hotelName}</h4>
              <p className="text-gray-600">Location: {hotel.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
