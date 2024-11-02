import moment from "moment";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({
  booking,
  payment,
  roomInfo,
  onConfirm,
  isFormValid,
  errorMessage,
  setErrorMessage,
}) => {
  const navigate = useNavigate();
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");

  const handleConfirmBooking = () => {
    try {
      onConfirm();
      setIsProcessingPayment(false);
    } catch (error) {
      setIsProcessingPayment(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="card card-body">
      <h4>Reservation Summry</h4>

      <p>
        Room Type: <strong>{roomInfo.roomType}</strong>
      </p>
      <p>
        FullName: <strong>{booking.guestFullName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date:{" "}
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Check-Out Date:{" "}
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Number of Days: <strong>{numOfDays}</strong>
      </p>
      <div className="d-flex flex-column">
        <h5>Number of Guests</h5>
        <div>
          Adult{booking.numberOfAdults > 1 ? "s" : ""} :{" "}
          <strong>{booking.numberOfAdults} </strong>
        </div>
        <div className="">
          Children: <strong>{booking.numberOfCHildren}</strong>
        </div>
      </div>

      {payment() > 0 ? (
        <>
          <p>
            Total Payment: <strong>${payment()}</strong>
          </p>
          {errorMessage && <p className="text-danger mb-0">{errorMessage}</p>}
          {isFormValid && !isBookingConfirmed ? (
            <Button className="btn btn-success" onClick={handleConfirmBooking}>
              {isProcessingPayment && !errorMessage ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed, redirecting to payment....
                </>
              ) : (
                "Confirm Booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <p className="text-danger">
            Check-Out date must be after check-in date
          </p>
        </>
      )}
    </div>
  );
};

export default BookingSummary;
