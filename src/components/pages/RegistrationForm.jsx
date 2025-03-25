import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("user"); // Default role: user
  const [formData, setFormData] = useState({});
const navigate= useNavigate()


  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newUser= {...formData,role};
    // console.log(newUser);
    
    try {
      if (role=="admin") {
        const res = await axios.post("http://localhost:7890/admin/register",newUser)
        if (res) {
          setTimeout(() => { 
            navigate("/login");
          }, 2000);
        }
      }
      else{
        const res= await axios.post("http://localhost:7890/user/register",newUser)
        if (res) {
          setTimeout(() => { 
            navigate("/login");
          }, 2000);
        }
        // console.log("user registration");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Register</h2>

        {/* Role Selection */}
        <label className="block text-gray-700 font-medium mt-4">Register as</label>
        <select
          className="w-full p-2 border rounded-md mt-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
