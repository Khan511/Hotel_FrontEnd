import moment from "moment";
import { useState } from "react";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchComponent from "./RoomSearchComponent";
import SingleRoom from "../room/SingleRoom";
import { format, parseISO } from "date-fns";

const RoomSearch = () => {
  const [error, setError] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filterDates, setFilterDates] = useState({
    checkInDate: "",
    checkOutDate: " ",
    roomType: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 3;
  const totalRoomLength = availableRooms.length;
  const totalPages = Math.ceil(totalRoomLength / roomsPerPage);

  const startIndex = (currentPage - 1) * roomsPerPage;
  const endIndex = startIndex + roomsPerPage;
  const paginationResult = availableRooms.slice(startIndex, endIndex);

  const handlePageChnage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterDates({ ...filterDates, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setError("");

    if (
      filterDates.checkInDate === "" ||
      filterDates.checkOutDate === "" ||
      filterDates.roomType === ""
    ) {
      setError("Please choose dates and filter type.");
      return;
    }
    // Converting dates to ISO format so it can match the Java(backend dates objects)
    const checkIn = format(parseISO(filterDates.checkInDate), "yyyy-MM-dd");
    const checkOut = format(parseISO(filterDates.checkOutDate), "yyyy-MM-dd");

    if (checkIn > checkOut) {
      setError("Check-In date must come before Check-Out date.");
      return;
    }

    try {
      const res = await getAvailableRooms(
        checkIn,
        checkOut,
        filterDates.roomType
      );

      console.log(res);

      setAvailableRooms(res);
    } catch (error) {
      setError(error.message);
    }
  };

  const clearFilter = () => {
    setFilterDates({
      checkInDate: "",
      checkOutDate: " ",
      roomType: "",
    });
    setAvailableRooms([]);
    setError("");
  };

  return (
    <div className="  shadow-lg  rounded">
      <RoomSearchComponent
        filterDates={filterDates}
        clearFilter={clearFilter}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
      <div className="w-100 d-flex justify-content-center align-items-center">
        {error && <p className="alert alert-danger text-center">{error}</p>}
      </div>
      <div className="row mt-4 d-flex flex-column  justify-content-center">
        {availableRooms.length > 0 &&
          paginationResult.map((room, index) => {
            return (
              <>
                <div key={room.id} className="">
                  <SingleRoom key={room.id} room={room} />
                </div>
              </>
            );
          })}
      </div>
      <div className="w-100 d-flex justify-content-center gap-1 my-2">
        {availableRooms.length > roomsPerPage &&
          [...Array(totalPages).keys()].map((page) => {
            {
              return (
                <button
                  className={
                    currentPage === page + 1
                      ? "btn btn-primary"
                      : "btn btn-outline-primary "
                  }
                  onClick={() => handlePageChnage(page + 1)}
                >
                  {page + 1}
                </button>
              );
            }
          })}
      </div>
      {availableRooms.length > roomsPerPage && (
        <div className="w-100">
          <button onClick={clearFilter} className="btn btn-secondary w-100">
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomSearch;
