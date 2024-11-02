import { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomPrice, setRoomPrice] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const [booking, setBooking] = useState({
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    numberOfAdults: "",
    numberOfCHildren: "",
  });

  //   Handle input data
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  //   calculate room price
  const getRoomPriceById = async (roomId) => {
    try {
      const room = await getRoomById(roomId);
      setRoomInfo({
        roomType: room.roomType,
        roomPrice: room.roomPrice,
        photo: room.photo,
      });
      setRoomPrice(room.roomPrice);
    } catch (error) {
      setBooking(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);

    if (!checkInDate.isValid() || !checkOutDate.isValid()) {
      setErrorMessage("Dates must be valid");
      return 0;
    }
    const differecenInDays = checkOutDate.diff(checkInDate, "days");

    if (differecenInDays <= 0) {
      setErrorMessage("Check-out date must be after check-in date.....");
      return 0;
    }

    const roomPricePerNight = roomPrice ? roomPrice : 0;
    const totalPayment = roomPricePerNight * differecenInDays;
    return totalPayment;
  };

  const isMinimumOneAdult = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    return adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    const checkOutDate = moment(booking.checkOutDate);
    const checkInDate = moment(booking.checkInDate);

    if (!checkOutDate.isSameOrAfter(checkInDate)) {
      setErrorMessage("Check-out date must come after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (
      form.checkValidity() === false ||
      !isMinimumOneAdult() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      console.log("Error" + error);
      setErrorMessage(error.message);
      // navigate("/booking-success", { state: { error: error.message } });
    }
  };
  // to disable previous dates in date inputs
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container">
      <div className="row d-flex flex-column flex-lg-row">
        <div className=" col-12 col-lg-6">
          <div className="card card-body mt-4bg-black">
            <h4>Reserve Room</h4>
            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestFullName">Full Name: </Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your full name..."
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your fullName
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="guestEmail">Email: </Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email..."
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your email
                </Form.Control.Feedback>
              </Form.Group>
              <fieldset style={{ border: "2px" }} className="mt-3">
                <legend>Lodging perios:</legend>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <Form.Label htmlFor="checkInDate">
                      Check-In Date:{" "}
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      min={today}
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      placeholder="Enter your checkInDate..."
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select check-in date
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-12 col-lg-6">
                    <Form.Label htmlFor="checkOutDate">
                      Check-Out Date:{" "}
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      min={today}
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      placeholder="Enter your checkOutDate..."
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select check-out date
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mt-3">Number of Guest:</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="numberOfAdults">Adults: </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="numberOfAdults"
                      name="numberOfAdults"
                      value={booking.numberOfAdults}
                      placeholder="0"
                      onChange={handleInputChange}
                      min={1}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select at least 1 adult
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="numberOfCHildren">
                      Children:{" "}
                    </Form.Label>
                    <FormControl
                      type="number"
                      id="numberOfCHildren"
                      name="numberOfCHildren"
                      value={booking.numberOfCHildren}
                      placeholder="0"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>
              <div className="form-group my-2">
                <button type="submit" className="btn btn-primary">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              roomInfo={roomInfo}
              onConfirm={handleBooking}
              isFormValid={isValidated}
              payment={calculatePayment}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
