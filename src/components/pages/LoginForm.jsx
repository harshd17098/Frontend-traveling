import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const {login}= useContext(AuthContext)


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    // console.log(token,userRole);
    if (token && userRole == "admin") {  
      navigate("/AdminDashboard")
    }
    if (token && userRole == "user") {  
      navigate("/")
    }
  }, [])
  

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (role === "admin") {
        const res = await axios.post("http://localhost:7890/admin/login", { ...formData, role }, {
          headers: { "Content-Type": "application/json" }
        });

        // console.log("Admin Login Success:", res);
        toast.success(res.data.message || "Admin Login Successful");
        login(res.data.token)
        // localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 2000);
      }
      else {
        const res = await axios.post("http://localhost:7890/user/login", { ...formData, role }, {
          headers: { "Content-Type": "application/json" }
        })
        // console.log(res);
        
        login(res.data.token)
        toast.success(res.data.message || "User Login Successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Login</h2>

        {/* Role Selection */}
        <label className="block text-gray-700 font-medium mt-4">Login as</label>
        <select
          className="w-full p-2 border rounded-md mt-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
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
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
