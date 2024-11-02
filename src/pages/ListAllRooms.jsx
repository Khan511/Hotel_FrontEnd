import { useCallback, useEffect, useState } from "react";
import { fetchAllRooms } from "../components/utils/ApiFunctions";
import SingleRoom from "../components/room/SingleRoom";
import FilterRoom from "../components/room/FilterRoom";
import Loading from "../components/utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoomTypes, getAllRooms } from "../redux/roomSlice/RoomSlice";

const ListAllRooms = () => {
  const dispatch = useDispatch();
  const [filteredRooms, setFilteredRoom] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const { roomTypes, allRooms, loading, errorMessage } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    dispatch(fetchAllRoomTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllRooms({ page: currentPage, size: 10, filter }));
  }, [dispatch, currentPage, filter]);

  useEffect(() => {
    setFilteredRoom(allRooms.content || []);
    setTotalPages(allRooms.totalPages || 0);
  }, [allRooms]);

  const handleFilterRoominput = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <Loading />;
      </div>
    );
  }
  if (errorMessage) {
    return (
      <div className="w-100 min-vh-100">
        <p className="text-danger">Error: {errorMessage} </p>
      </div>
    );
  }
  return (
    <div
      className="container-xl  py-3 bg-body-secondary "
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-row  ">
        <div className="w-100">
          <FilterRoom
            filter={filter}
            roomTypes={roomTypes}
            handleFilterRoominput={handleFilterRoominput}
          />
        </div>
        <div className="w-100 d-none d-md-flex gap-2 justify-content-end">
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
      <div className="row mt-4 d-flex flex-column  justify-content-center">
        {filteredRooms.length > 0 &&
          filteredRooms.map((room) => {
            return (
              <div key={room.id} className="">
                <SingleRoom key={room.id} room={room} />
              </div>
            );
          })}
      </div>
      <div className="w-100  d-flex gap-2 my-2 justify-content-center">
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

export default ListAllRooms;
