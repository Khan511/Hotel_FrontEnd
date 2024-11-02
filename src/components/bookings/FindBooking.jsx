import { useEffect, useState } from "react";
import Loading from "./../utils/Loading";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import { Form, FormControl } from "react-bootstrap";

export const FindBooking = () => {
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    roomType: "",
    roomNumber: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    numberOfAdults: "",
    numberOfChildren: "",
    totalNumberOfGuests: "",
    bookingConformationCode: "",
  });

  const handleClearBooking = {
    id: "",
    roomType: "",
    guestEmail: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    numberOfAdults: "",
    numberOfChildren: "",
    totalNumberOfGuests: "",
    bookingConformationCode: "",
  };

  const handleFindBooking = async (e) => {
    e.preventDefault();
    if (confirmationCode.trim() === "") {
      SetError("Confirmation code is required.");
      return;
    }

    SetError("");
    setLoading(true);
    setIsDeleted(false);

    try {
      const res = await getBookingByConfirmationCode(confirmationCode);

      setBookingInfo(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setBookingInfo(handleClearBooking);

      if (error.message) {
        SetError(error.message);
      } else {
        SetError("Error fetching booking");
      }
    }
  };
  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.id);
      setBookingInfo(handleClearBooking);
      setIsDeleted(true);
      setConfirmationCode("");
      SetError("");
    } catch (error) {
      setIsDeleted(false);
      SetError("An error occurred while canceling the booking.");
    }
  };

  //   Remove the Error and cancel confirmation code from UI after 5 seconds
  useEffect(() => {
    let timer;

    if (error || isDeleted) {
      timer = setTimeout(() => {
        setIsDeleted(false);
        SetError("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error, isDeleted]);

  return (
    <div className="max-width mt-5 container min-vh-100 w-100">
      <h2>FindBooking</h2>
      <Form onSubmit={handleFindBooking}>
        <FormControl
          type="text"
          value={confirmationCode}
          className="form-control"
          placeholder="Enter confirmation Code..."
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        <div className="d-flex justify-content-end mt-1">
          <button className="btn btn-primary input-group-text" type="submit">
            Find Booking
          </button>
        </div>
      </Form>
      {loading && <Loading />}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {bookingInfo.id && (
        <div className="card mt-4">
          <div className="card-header bg-black text-white">
            Booking Information
          </div>
          <div className="card-body d-flex gap-2">
            <p className="card-title">
              <strong>Guest Name:</strong> {bookingInfo.guestName}
            </p>
            <p className="card-text">
              <strong>Room Number:</strong> {bookingInfo.id}
            </p>
            <p className="card-text">
              <strong>Room Type:</strong> {bookingInfo.room.roomType}
            </p>
            <p className="card-text">
              <strong>Check-in Date:</strong> {bookingInfo.checkInDate}
            </p>
            <p className="card-text">
              <strong>Check-out Date:</strong> {bookingInfo.checkOutDate}
            </p>
            <p className="card-text">
              <strong>Number of Adults:</strong> {bookingInfo.numberOfAdults}
            </p>
            <p className="card-text">
              <strong>Number of Children:</strong>{" "}
              {bookingInfo.numberOfChildren}
            </p>
            <p className="card-text">
              <strong>Total Number of Guests:</strong>{" "}
              {bookingInfo.totalNumberOfGuests}
            </p>
            {!isDeleted && (
              <button
                className="btn btn-danger mt-4"
                onClick={handleBookingCancellation}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      )}
      {isDeleted && (
        <p className="alert alert-success">Booking is canceled successfully!</p>
      )}
    </div>
  );
};
