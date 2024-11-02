import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <Link to="/addRoom">Manage Rooms</Link>
      <Link to="/all-bookings">Manage Bookings</Link>
    </div>
  );
};

export default Admin;
