import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoomTypes } from "../../redux/roomSlice/RoomSlice";
import moment from "moment";

const RoomSearchComponent = ({
  handleInputChange,
  handleSubmit,
  clearFilter,
  filterDates,
}) => {
  const dispatch = useDispatch();
  const [roomTypes, setRoomTypes] = useState([]);
  const { roomTypes: rTypes, loading } = useSelector((state) => state.room);

  // Get All Room Types
  useEffect(() => {
    dispatch(fetchAllRoomTypes());
    setRoomTypes(rTypes);
  }, [dispatch]);

  useEffect(() => {
    setRoomTypes(rTypes);
  }, [rTypes]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center align-items-center p-3   row"
      >
        <div className="col-12 col-lg-4">
          <label htmlFor="checkInDate">Check-In Date</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            className="form-control"
            min={moment().format("YYYY-MM-DD")}
            value={filterDates.checkInDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 col-lg-4">
          <label htmlFor="checkOutDate">Check-Out Date</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            className="form-control"
            value={filterDates.checkOutDate}
            min={moment().format("YYYY-MM-DD")}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 col-lg-4">
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            onChange={handleInputChange}
            value={filterDates.roomType}
            className="form-select form-selectt"
          >
            <option className="form-select" value={""}>
              Select a room type
            </option>

            {roomTypes.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div className=" mt-4 d-flex flex-md-row align-items-center flex-column justify-content-center gap-2">
          <button
            className="btn  btn-primary col-12 col-sm-8 col-md-4 col-lg-4"
            type="submit"
          >
            Filter Rooms
          </button>
          <button
            type="button"
            onClick={clearFilter}
            className="btn  btn-secondary col-12 col-sm-8 col-md-4 col-lg-4"
          >
            Clear Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomSearchComponent;
