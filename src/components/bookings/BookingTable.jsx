import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const BookingTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;

    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingCheckInDate = parseISO(booking.checkInDate);
        const bookingCheckOutDate = parseISO(booking.checkOutDate);

        return (
          bookingCheckInDate >= startDate &&
          bookingCheckOutDate <= endDate &&
          bookingCheckOutDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <div className=" container d-flex flex-column justify-content-center align-items-center mt-3">
      <div className=" table-responsive border p-0 p-md-3 w-100">
        <DateSlider
          onDateChange={filterBookings}
          //   onFilterChange={filterBookings}
        />
      </div>
      {bookingInfo.length === 0 ? (
        <div>
          <h4>There are no bookings available</h4>
        </div>
      ) : (
        <div className="  table-responsive  ">
          {filteredBookings.length > 0 ? (
            <table className="table table-hover border mt-3 shadow">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Room Type</th>
                  <th scope="col">Check-In</th>
                  <th scope="col">Check-Out</th>
                  <th scope="col">Guest Name</th>
                  <th scope="col">Guest Email</th>
                  <th scope="col">Adults</th>
                  <th scope="col">Children</th>
                  <th scope="col">Total Guest</th>
                  <th scope="col">Confirmation Code</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => {
                  return (
                    <tr key={booking.id}>
                      <th scope="row">{index + 1}</th>
                      <th>{booking.room.roomType}</th>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>{booking.guestName}</td>
                      <td>{booking.guestEmail}</td>
                      <td>{booking.numberOfAdults}</td>
                      <td>{booking.numberOfChildren}</td>
                      <td>{booking.totalNumberOfGuests}</td>
                      <td>{booking.bookingConfirmationCode}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleBookingCancellation(booking.id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-100 ">
              <p className="text-center text-bg-info py-3">
                No bookings for the selected period
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingTable;
