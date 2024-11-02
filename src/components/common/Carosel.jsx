import React, { useEffect, useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAllRooms } from "../utils/ApiFunctions";
import Loading from "../utils/Loading";
import "../../pages/home/home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../redux/roomSlice/RoomSlice";
import { Link } from "react-router-dom";

// Utility function to chunk an array into smaller arrays of a specified size
const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    if (chunk.length < size) {
      chunk.push(...array.slice(0, size - chunk.length));
    }
    chunkedArr.push(chunk);
  }
  return chunkedArr;
};

const CustomCarousel = () => {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);
  const [filteredRooms, setFilteredRoom] = useState([]);

  const { allRooms, loading } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getAllRooms({ page: 0, size: allRooms.length }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredRoom(allRooms.content || []);
  }, [allRooms]);

  // useEffect(() => {
  //   setLoading(true);
  //   const allRooms = async () => {
  //     const rooms = await fetchAllRooms();
  //     setLoading(false);
  //     setFilteredRoom(rooms.content);
  //   };

  //   allRooms();
  // }, []);

  // Chunk the filtered rooms into groups of 4
  const roomChunks = chunkArray(filteredRooms, 4);

  if (loading) {
    return <Loading />;
  }

  return (
    <Carousel indicators={false}>
      {roomChunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="row">
            {chunk.map((room, roomIndex) => (
              <div className="col-md-3  mb-2" key={roomIndex || roomIndex}>
                <Card className="">
                  <Card.Img
                    className="carousel-img"
                    variant="top"
                    src={`data:image/jpeg;base64,${room.photo}`}
                  />
                  <Card.Body>
                    <Card.Title className="my-2 my-md-4">
                      {room.roomType}
                    </Card.Title>
                    <Card.Text>{room.roomPrice} / Night</Card.Text>
                  </Card.Body>
                  <Link to={`/book-room/${room.id}`}>
                    <button className="btn btn-primary w-100">Book Now</button>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
