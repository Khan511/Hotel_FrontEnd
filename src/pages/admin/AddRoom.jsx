import { useEffect, useState } from "react";
import RoomTypeSelector from "../../components/common/RoomTypeSelector";
import ExistingRoomTable from "../../components/room/ExistingRoomTable";
import { addRoom } from "../../components/utils/ApiFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRoomTypes,
  getAllRooms,
} from "../../redux/roomSlice/RoomSlice";

const AddRoomComponent = (
  {
    // filter,
    // roomTypes,
    // setRoomTypes,
    // handleFilterRoominput,
  }
) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [filteredRooms, setFilteredRoom] = useState([]);

  const [imagePreview, setImagePreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const {
    roomTypes: rTypes,
    allRooms,
    loading,
  } = useSelector((state) => state.room);
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  // Get All Rooms
  useEffect(() => {
    dispatch(getAllRooms({ page: currentPage, size: 10, filter }));
  }, [dispatch, currentPage, filter]);

  useEffect(() => {
    setFilteredRoom(allRooms.content || []);
    setTotalPages(allRooms.totalPages || 0);
  }, [allRooms]);

  // Get All Room Types
  useEffect(() => {
    dispatch(fetchAllRoomTypes());
    setRoomTypes(rTypes);
  }, [dispatch]);
  
  console.log(roomTypes);

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];

    setNewRoom({ ...newRoom, photo: selectImage });
    setImagePreview(URL.createObjectURL(selectImage));
  };

  // Submit the Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );

      if (response !== undefined) {
        setSuccessMessage("A new Room was added to the database");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
      }

      // dispatch(getAllRooms({ page: 0, size: 10, filter }));
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const handleFilterRoominput = (e) => {
    setFilter(e.target.value);
  };
console.log(rTypes);

  return (
    <div className=" container min-vh-100 mt-4">
      {showAddForm && (
        <div>
          <h1 className="mb-4 text-center">Add Room</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label">
                    Room Type:
                  </label>
                  <div>
                    <RoomTypeSelector
                      // newRoom={newRoom}
                      roomTypes={roomTypes}
                      setRoomTypes={setRoomTypes}
                      handleRoomInputChange={handleRoomInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="roomPrice" className="form-label">
                    Room Price:
                  </label>
                  <input
                    type="text"
                    id="roomPrice"
                    name="roomPrice"
                    className="form-control"
                    value={newRoom.roomPrice}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">
                    Room Photo:
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <div className="mb-3">
                    <img
                      src={imagePreview}
                      alt="Room Preview"
                      className="img-fluid"
                      style={{
                        maxWidth: 200,
                        maxHeight: 200,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                )}
                <div className="d-grid d-md-flex mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save Room
                  </button>
                </div>
                {successMessage && (
                  <div className="alert alert-success mt-3">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="w-100 d-flex justify-content-end">
        <button
          className=" btn-outline-secondary btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Hide Form" : "Show Form"}
        </button>
      </div>
      <ExistingRoomTable
        filter={filter}
        roomTypes={roomTypes}
        handleFilterRoominput={handleFilterRoominput}
      />
    </div>
  );
};

export default AddRoomComponent;
