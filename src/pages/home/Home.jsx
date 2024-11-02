import { Link } from "react-router-dom";
import destination from "../../assets/hotel6.jpg";
// import hotelInside from "../../assets/hotel-inside.jpg";
import hotelInside from "../../assets/h.jpg";
import Carosel from "../../components/common/Carosel";
// import destination from "../../assets/destination6.jpg";
import "./home.css";
import HomePageService from "../../components/homePageComp/HomePageService";
import DateSlider from "../../components/common/DateSlider";
import RoomSearch from "../../components/common/RoomSearch";

const Home = () => {
  return (
    <div className="w-100  min-vh-100 ">
      <div className="relative">
        <img
          className=" w-100 custom-image-height "
          src={destination}
          alt="Destination"
        />
        <div className="left-0 absolute p-4 flex  flex-col justify-center inset-0">
          <h1 className="text-white text-shadow mb-4    custom-heading">
            Welcome to <span className="text-primary">Gjensidige's Hotel</span>
          </h1>
          <p className="text-white text-center  rounded custom-paragraph">
            Experience the best Hospitality in the world
          </p>
        </div>
      </div>
      <div className="container">
        <RoomSearch />
      </div>

      <div className=" container my-5">
        <Link to="/all-rooms">See all rooms</Link>
        <Carosel />
      </div>
      <div className="   home-second-img relative">
        <img className="  w-100" src={hotelInside} alt="Hotel Inside" />
        <div className=" absolute   p-2 rounded shadow">
          <h3 className="text-shadow text-white custom-heading">
            Experience the best hospitality at{" "}
            <span className=" text-primary">GH</span> hotel
          </h3>
          <p className="custom-paragraph rounded text-white ">
            We offer the best services for all you needs
          </p>
        </div>
      </div>
      <div>
        <HomePageService />
      </div>
    </div>
  );
};

export default Home;
