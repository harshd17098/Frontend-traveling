import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { Form, useNavigate } from "react-router-dom";
import BookFlight from "./BookFlight";
import BookHotel from "./BookHotel";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const tabs = ["Flight Booking", "Hotel Booking", "Car Rental"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [departCity, setdepartCity] = useState([])
  const [arrivalCity, setarrivalCity] = useState([])
  const { token } = useContext(AuthContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [allhotel, setallHotel] = useState([])
  const [availableHotel, setavailableHotel] = useState([])
  const [selectHotelCity, setselectHotelCity] = useState("")
  const [availableHotels, setavailableHotels] = useState([])
  const navigate = useNavigate()

  // ===========flight
  let handleSearchFlight = (e) => {
    e.preventDefault()
    setLoading(true);

    setTimeout(() => {
      let tempFlights = [];
      flights.map((val, i) => {
        console.log(val);
        if (val.departure === from && val.arrival === to && date >= val.availableFrom && date <= val.availableTo) {
          tempFlights.push(val);
        }
      })
      setAvailableFlights(tempFlights);
      setLoading(false);
    }, 1000);

  };

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:7890/flights/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(res.data.allFlights);
        setTimeout(() => {
          setFlights(res.data.allFlights);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    if (token) {
      fetchFlights();
    }
  }, [token]);



  useEffect(() => {
    let departarr = []
    let arrivarr = []
    const res = flights.forEach((val) => {
      // console.log(val.departure);
      if (!departarr.includes(val.departure)) {
        departarr.push(val.departure)
        setdepartCity(departarr)
      }
      if (!arrivarr.includes(val.arrival)) {
        arrivarr.push(val.arrival)
        setarrivalCity(arrivarr)
      }
    })
  }, [flights])

  // ==================hotel
  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:7890/hotels/get", {
          headers: { Authorization: `Bearer ${token}` },
        })
        // console.log(res.data.allHotel);
        setallHotel(res.data.allHotel)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    }
    if (token) {
      fetchHotel()
    }
  }, [])

  useEffect(() => {
    let hotelArr = []
    allhotel.map((val, i) => {
      // console.log(val);
      if (!hotelArr.includes(val.city)) {
        hotelArr.push(val.city)
      }
    })
    // console.log(hotelArr);
    setavailableHotel(hotelArr)
  }, [allhotel])

  const searchHotel = () => {
    // console.log(selectHotelCity);
    setLoading(true);
    setTimeout(() => {
      let temparr = [];
      allhotel.map((val) => {
        if (val.city == selectHotelCity) {
          // console.log(val);
          temparr.push(val)
        }

        setavailableHotels(temparr)
        setLoading(false);
      })
    }, 2000);
  }

  console.log(availableHotels);


  return (
    <div className="p-4 flex flex-col items-center">
      {/* Tab Section */}
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md font-medium ${activeIndex === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 border rounded-md w-full max-w-lg bg-gray-100">
        {activeIndex === 0 && (
          <form action="get" onSubmit={handleSearchFlight}>
            <div className="space-y-4">
              <p className="text-lg font-semibold">Book your flights easily with the best deals.</p>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">From</label>
                  <select className="w-full p-2 border rounded-md" onChange={(e) => setFrom(e.target.value)}>
                    <option value="" disabled selected>Departure</option>
                    {departCity.map((city, index) => (
                      <option key={index} value={city} required>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <select className="w-full p-2 border rounded-md" required onChange={(e) => setTo(e.target.value)}>
                    <option value="" disabled selected>Arrival</option>
                    {arrivalCity.map((city, index) => (
                      <option key={index} value={city} required>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" className="w-full p-2 border rounded-md" required onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="w-full flex justify-center mt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">Search Flight</button>
              </div>
            </div>
          </form>

        )}
        {activeIndex === 2 && <p>Discover and book comfortable hotels worldwide.</p>}
        {activeIndex === 1 && (
          <div className="space-y-4">
            <p className="text-lg font-semibold">Discover and book comfortable hotels worldwide.</p>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <select className="w-full p-2 border rounded-md" onChange={(e) => setselectHotelCity(e.target.value)}>
                <option value="" disabled selected>Select City</option>
                {availableHotel.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Booking Date</label>
              <input type="date" className="w-full p-2 border rounded-md" />
            </div>
            <div className="w-full flex justify-center mt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700" onClick={searchHotel}>Search Hotels</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      {activeIndex === 0 &&
        (
          <BookFlight availableFlights={availableFlights} loading={loading} />
        )
      }
      {activeIndex == 1 &&
        <BookHotel availableHotels={availableHotels} loading={loading} />
      }
    </div>
  );
};

export default Home;
