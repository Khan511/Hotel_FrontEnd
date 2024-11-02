import { Card } from "react-bootstrap";
import BookingForm from "./BookingForm";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomById } from "../utils/ApiFunctions";
import CustomCarousel from "../common/Carosel";

export const CheckOut = () => {
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState({});

  const getRoomByRoomId = async (roomId) => {
    if (roomId) {
      const room = await getRoomById(roomId);
      setRoomInfo(room);
    }
  };
  useEffect(() => {
    getRoomByRoomId(roomId);
  }, [roomId]);

  return (
    <>
      <div className="container">
        <div className="row mt-4 w-100 d-flex flex-column ">
          <div className="col-12 col-lg-6 border p-0 my-2 d-flex flex-column  gap-2">
            <img
              className="carousel-img w-100 object-fit-cover"
              variant="top"
              src={`data:image/jpeg;base64,${roomInfo.photo || ""}`}
            />

            <div className="d-flex flex-column">
              <div className="flex-row d-flex justify-content-between px-2">
                <h4 className="mb-2 ">{roomInfo.roomType}</h4>
                <p>{roomInfo.roomPrice} / Night</p>
              </div>
              <div className="d-flex gap-3 gap-sm-5 mt-2 shadow-lg p-2">
                <h5>Room Service:</h5>
                <div className="flex flex-column">
                  <p className="m-0">
                    <span className="">
                      <i className="bi bi-wifi bold-icon"></i>
                    </span>{" "}
                    - Wifi
                  </p>
                  <p className="m-0">
                    <span>
                      <i className="bi bi-play-fill"></i>
                    </span>{" "}
                    - Netflix Premiun
                  </p>
                  <p className="m-0">
                    <span className=" rounded-circle">
                      <i className="bi bi-cup-hot bold-icon"></i>
                    </span>{" "}
                    - BreakFast
                  </p>
                  <p className="m-0">
                    <span>
                      <i className="bi bi-cup-straw"></i>
                    </span>{" "}
                    - Mini Bar
                  </p>
                  <p className="m-0">
                    <span>
                      <i className="bi bi-snow"></i>
                    </span>{" "}
                    - Air conditioning
                  </p>
                  <p className="m-0">
                    <span>
                      <i className="bi bi-p-circle"></i>
                    </span>{" "}
                    - Parking Space
                  </p>
                  <p className="m-0">
                    <span>
                      <i className="bi bi-basket"></i>
                    </span>{" "}
                    - Laundry
                  </p>
                </div>
              </div>
            </div>
          </div>
          <BookingForm />
        </div>
        <div className="container mt-5">
          <Link to="/all-rooms">See all rooms</Link>
          <CustomCarousel />
        </div>
      </div>
    </>
  );
};
