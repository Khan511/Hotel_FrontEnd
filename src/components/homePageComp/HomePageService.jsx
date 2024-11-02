import hotelService from "../../assets/hotelService.jpg";

const HomePageService = () => {
  return (
    <div className="container my-4">
      <div className="text-center mt-4 border-2 border-bottom border-bottom-2">
        <h2 className=" py-4">
          Service at{" "}
          <span className="text-primary text-decoration-underline">GH</span>{" "}
          hotel-
          <i className="bi bi-stopwatch-fill"></i>
          24-Hours Front Desk
        </h2>
      </div>
      <div className="w-100 mt-5 relative" style={{ height: "200px" }}>
        <img
          className="w-100 h-100 object-fit-cover"
          src={hotelService}
          alt="Hotel Service"
        />
        <h2 className="absolute text-white " style={{ fontSize: "3rem" }}>
          Our Services
        </h2>
      </div>
      <div className="mt-4 row gx-3 gy-3">
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-start justify-content-between border p-2 rounded">
          <h5 className="text-primary gap-1 d-flex">
            <i className="bi bi-wifi"></i>Wifi
          </h5>
          <p className="mb-1" style={{ color: "gray" }}>
            Stay connected with high-speed internet access.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-start justify-content-between border p-2 rounded">
          <h5 className="text-primary gap-1 d-flex">
            <i className="bi bi-cup-hot"></i>Breakfast
          </h5>
          <p className="mb-1" style={{ color: "gray" }}>
            Start your day with a delicious breakfast buffet.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-start justify-content-between border p-2 rounded">
          <h5 className="text-primary gap-1 d-flex">
            <i className="bi bi-basket"></i>Laundry
          </h5>
          <p className="mb-1" style={{ color: "gray" }}>
            Keep our cloth clean and fresh with our laundry service.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-start justify-content-between border p-2 rounded">
          <h5 className="text-primary gap-1 d-flex">
            <i className="bi bi-cup-straw"></i>Mini-bar
          </h5>
          <p className="mb-1" style={{ color: "gray" }}>
            Enjoy a refreshing drink or snack from our in-room mini-bar.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-start justify-content-between border p-2 rounded">
          <h5 className="text-primary gap-1 d-flex">
            <i className="bi bi-p-circle"></i>Parking
          </h5>
          <p className="mb-1" style={{ color: "gray" }}>
            Park your car conveniently in our on-site parking lot.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-start justify-content-between border p-2 rounded">
          <h5 className="text-primary gap-1 d-flex">
            <i className="bi bi-snow"></i>Air conditioning
          </h5>
          <p className="mb-1" style={{ color: "gray" }}>
            Stay cool and comfortable with our air conditioning system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageService;
