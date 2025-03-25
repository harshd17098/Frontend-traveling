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
        const res = await axios.get("https://backend-travel-80o2.onrender.com/user/profile", {
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
    </div>
  );
};

export default UserProfile;
