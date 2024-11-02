import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateSlider = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    // onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    onDateChange(null, null);
    // onFilterChange(null, null);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-2 w-100">
      <h5>Filter Bookings By Date</h5>
      <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start flex-lg-row">
        <DateRangePicker
          className="w-100 w-lg-auto"
          ranges={[dateRange]}
          onChange={handleSelect}
        />
        <button
          className="btn btn-outline-secondary mt-2 mx-2 text-nowrap"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};
export default DateSlider;
