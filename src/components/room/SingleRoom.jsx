import { Link } from "react-router-dom";

const SingleRoom = ({ room }) => {
  return (
    <div className=" card d-flex  m-0 p-2 flex-column  gap-2 justify-content-between align-items-center flex-sm-row">
      <div className="col-12 col-sm-3">
        <Link to={`/book-room/${room.id}`}>
          <img
            style={{ height: "180px" }}
            className=" object-fit-cover w-100 rounded"
            src={`data:image/jpeg;base64,${room.photo}`}
            alt="Card image cap"
          />
        </Link>
      </div>
      <div className=" flex-grow-1">
        <h5 className="p-0">{room.roomType}</h5>
        <p className="">{room.roomPrice} / night</p>
        <p className="p-0 m-0">
          Some room information goes here for the guest to read
        </p>
      </div>
      <div className=" d-flex justify-content-center justify-content-sm-start justify-content-md-end ">
        <Link to={`/book-room/${room.id}`}>
          <button className="btn btn-primary text-nowrap">View/Book Now</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleRoom;
