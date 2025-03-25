import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState("")

  console.log(token);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:7890/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };
    fetchProfile();
  }, [token]);

  if (!token) return <p>Loading profile...</p>;
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* <h3 className="text-xl font-semibold mt-4">Flights Added</h3>
      {flights.length === 0 ? <p>No flights added.</p> : (
        <ul className="list-disc pl-5">
          {flights.map((flight) => (
            <li key={flight._id} className="border p-2 my-2 rounded">
              {flight.flightName} ({flight.departure} → {flight.arrival}) - {flight.seats} seats
            </li>
          ))}
        </ul>
      )} */}

      {/* <h3 className="text-xl font-semibold mt-4">Hotels Added</h3> */}
      {/* {hotels.length === 0 ? <p>No hotels added.</p> : (
        <ul className="list-disc pl-5">
          {hotels.map((hotel) => (
            <li key={hotel._id} className="border p-2 my-2 rounded">
              {hotel.name} - Located in {hotel.location}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default UserProfile;
