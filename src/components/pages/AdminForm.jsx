import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Add Flights", "Add Hotel", "Add Car Rental"];
  const [data, setdata] = useState({})
  const [hotelData, sethotelData] = useState({})
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    // console.log("token is", token);
  }, [token])

  // ===================flight

  const handleChange = (e) => {
    let { name, value } = e.target;
    setdata({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    let res = await axios.post("http://localhost:7890/flights/add", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // console.log(data);
    if (res) {
      toast.success("New Flight added success");
      setdata({})
    }
  }

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:7890/AdminDashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error fetching admin data:", error.message);
        navigate("/login");
      }
    };
    fetchAdminData();
  }, [token]);

  // ======================hotel

  const handleHotel = async (e) => {
    let { name, value, files } = e.target;
    if (name === "image") {
      sethotelData({ ...hotelData, [name]: files[0] });
    }
    else {
      sethotelData({ ...hotelData, [name]: value });
    }
  }

  const handleSubmitHotel = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("hotelName", hotelData.hotelName);
    formData.append("city", hotelData.city);
    formData.append("image", hotelData.image);

    // console.log("Form Data Submitted:",formData);

    try {
      let res = await axios.post("http://localhost:7890/hotels/add", hotelData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      })
      if (res) {
        toast.success("Hotel added success");
        sethotelData({})
      }
    } catch (error) {
      console.error("Error :", error);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Tabs Navigation */}
      <div className="flex border-b mb-4 justify-around">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-lg font-semibold border-b-2 transition-colors duration-300 ${activeTab === index ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <form className="space-y-4 p-4 border rounded-lg shadow-lg bg-white" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">Add Flight</h2>
          <input type="text" value={data.flightName ? data.flightName : ""} name="flightName" required placeholder="Flight Name" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" value={data.departure ? data.departure : ""} name="departure" required placeholder="Departure City" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" value={data.arrival ? data.arrival : ""} name="arrival" placeholder="Arrival City" onChange={handleChange} className="w-full p-2 border rounded" />
          <label className="block text-sm font-semibold">Departure Time</label>
          <input
            type="time"
            value={data.departureTime || ""}
            name="departureTime"
            required
            placeholder="Departure Time"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <label className="block text-sm font-semibold">Arrival Time</label>
          <input
            type="time"
            value={data.arrivalTime || ""}
            name="arrivalTime"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={data.cost || ""}
            name="cost"
            required
            placeholder="Flight Cost (INR)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/* Flight Availability (From Date - To Date) */}
          <label className="block text-sm font-semibold">Flight Available From</label>
          <input
            type="date"
            value={data.availableFrom || ""}
            name="availableFrom"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block text-sm font-semibold">Flight Available To</label>
          <input
            type="date"
            value={data.availableTo || ""}
            name="availableTo"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Add Flight</button>
        </form>
      )}
      {activeTab === 1 && (
        <form className="space-y-4 p-4 border rounded-lg shadow-lg bg-white" onSubmit={handleSubmitHotel}>
          <h2 className="text-xl font-semibold">Add Hotel</h2>
          <input type="text" placeholder="Hotel Name" name="hotelName" value={hotelData.hotelName ? hotelData.hotelName : ""} onChange={handleHotel} className="w-full p-2 border rounded" />
          <input type="text" placeholder="City" name="city" value={hotelData.city ? hotelData.city : ""} onChange={handleHotel} className="w-full p-2 border rounded" />
          <input type="file" name="image" className="w-full p-2 border rounded" value={hotelData.image ? hotelData.image : ""} onChange={handleHotel} />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Add Hotel</button>
        </form>
      )}
      {activeTab === 2 && (
        <form className="space-y-4 p-4 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold">Add Car Rental</h2>
          <input type="text" placeholder="Car Model" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Rental Price" className="w-full p-2 border rounded" />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Add Car</button>
        </form>
      )}
      <ToastContainer />
    </div>

  );
};

export default AdminDashboard;
