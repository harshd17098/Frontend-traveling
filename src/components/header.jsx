import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Header = () => {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };
  // console.log("role is",user);


  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to={"/"} className="text-2xl font-bold text-blue-600">
      TravelBook
      </Link>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to={"/register"} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Register
            </Link>
            <Link to={"/login"} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Login
            </Link>
          </>
        ) : (
          <div className="relative group">

            <div className="flex items-center gap-2 cursor-pointer">
              <FaUserCircle className="text-3xl text-gray-600" />
              <button
                onClick={handleLogout}
                className="px-4 py-2  bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>

            </div>

            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
              <ul className="py-2 text-gray-700">
                {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"  >View Profile</li> */}
                <Link to={role === "admin" ? "/adminProfile" : "/user/profile"} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  View Profile
                </Link>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Your Bookings</li>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 ms-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
