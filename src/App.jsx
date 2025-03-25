import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Home from './components/header'
import Register from './components/pages/RegistrationForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/LoginForm'
import AdminDashboard from './components/pages/AdminForm'
import AdminProfile from './components/pages/AdminProfile'
import BookFlight from './components/pages/BookFlight'
import UserProfile from './components/pages/UserProfile'
import FinalBooking from './components/pages/FinalBooking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path= "/adminDashboard" element={<AdminDashboard/>} />
          <Route path="/adminProfile" element={<AdminProfile/>} />
          <Route path= "/user/profile" element={<UserProfile/>} />
          <Route path='/bookFlight' element= {<BookFlight/>} />
          <Route path="/final-booking/:id" element={<FinalBooking/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
