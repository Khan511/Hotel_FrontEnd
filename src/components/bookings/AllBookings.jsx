import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookinds } from "../utils/ApiFunctions";
import Loading from "../utils/Loading";
import BookingTable from "./BookingTable";

const AllBookings = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingInfo, setBookingInfo] = useState([]);

  //   Get all bookings
  const fetchAllBookings = async () => {
    try {
      const res = await getAllBookinds();
      setBookingInfo(res);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBookings();
  }, []);

  //   Cancel Booking
  const handleBookingCancellation = async (bookinId) => {
    try {
      await cancelBooking(bookinId);
      fetchAllBookings();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <h3 className="text-danger">{error}</h3>
      </div>
    );
  }

  return (
    <div className="container min-vh-100">
      <BookingTable
        bookingInfo={bookingInfo}
        handleBookingCancellation={handleBookingCancellation}
      />
    </div>
  );
};

export default AllBookings;
