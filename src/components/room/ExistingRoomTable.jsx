import { useEffect, useState } from "react";
import FilterRoom from "./FilterRoom";
import Loading from "../utils/Loading";
import {
  deleteCurrentRoom,
  getAllRooms,
} from "../../redux/roomSlice/RoomSlice";
import { useDispatch, useSelector } from "react-redux";

const ExistingRoomTable = ({ filter, roomTypes, handleFilterRoominput }) => {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredRooms, setFilteredRoom] = useState([]);
  const { allRooms, loading } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getAllRooms({ page: currentPage, size: 10, filter }));
  }, [dispatch, currentPage, filter]);

  useEffect(() => {
    setFilteredRoom(allRooms.content || []);
    setTotalPages(allRooms.totalPages || 0);
  }, [allRooms]);

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // const allRooms = async () => {
  //   try {
  //     setLoading(true);
  //     const rooms = await fetchAllRooms(currentPage, 10, filter);
  //     setLoading(false);

  //     setFilteredRoom(rooms.content);
  //     setTotalPages(rooms.totalPages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   allRooms();
  // }, [currentPage, filter]);
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  const handleDeleteRoom = async (id) => {
    console.log(id);
    try {
      dispatch(deleteCurrentRoom(id));
      // await deleteRoom(id);
    } catch (error) {
      console.log("Failed to delete the room: ", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="d-flex flex-column align-items-center mt-3 shadow p-md-4 table-responsive">
      <div className="d-flex align-items-center flex-column flex-md-row justify-content-between w-100  ">
        <h2 className="mb-4">Available Rooms</h2>
        <div className="my-3">
          <FilterRoom
            filter={filter}
            roomTypes={roomTypes}
            handleFilterRoominput={handleFilterRoominput}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Room Type</th>
            <th scope="col">Room Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredRooms &&
            filteredRooms.map((room, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className="">
                    <button
                      className="btn bi bi-pencil  m-0 p-1 btn-outline-primary btn-sm"
                      title="View/Edit"
                    ></button>
                    <button
                      className=" m-lg-2 btn btn-outline-danger btn-sm p-1 bi bi-trash3 "
                      onClick={() => handleDeleteRoom(room.id)}
                      title="Delete"
                    ></button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="w-100  d-flex gap-2 justify-content-center">
        {totalPages > 1 &&
          [...Array(totalPages).keys()].map((page) => {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "btn btn-primary"
                    : "btn btn-outline-primary "
                }
              >
                {page + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ExistingRoomTable;
