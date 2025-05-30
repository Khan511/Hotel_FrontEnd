import React from "react";
import { useLocation } from "react-router-dom";

export const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;
  return (
    <div className="container min-vh-100">
      Header here
      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success">Booking Success</h3>
            <p className="text-success">{message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">Error Booking Room</h3>
            <p className="text-danger">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
