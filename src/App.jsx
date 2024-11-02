import "./App.css";
import { Route, Routes } from "react-router-dom";
import NaveBar from "./components/navbar/NaveBar";
import Footer from "./components/footer/Footer";
import AddRoomComponent from "./pages/admin/AddRoom";
import Admin from "./pages/admin/Admin";
import ListAllRooms from "./pages/ListAllRooms";
import Home from "./pages/home/Home";
import { CheckOut } from "./components/bookings/CheckOut";
import { BookingSuccess } from "./components/bookings/BookingSuccess";
import AllBookings from "./components/bookings/AllBookings";
import { FindBooking } from "./components/bookings/FindBooking";

function App() {
  return (
    <>
      <NaveBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-rooms" element={<ListAllRooms />} />
        <Route path="/addRoom" element={<AddRoomComponent />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/book-room/:roomId" element={<CheckOut />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/all-bookings" element={<AllBookings />} />
        <Route path="/find-booking" element={<FindBooking />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
