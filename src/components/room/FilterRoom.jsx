const FilterRoom = ({ roomTypes, handleFilterRoominput, filter }) => {
  console.log(roomTypes);
  return (
    <form
      className="d-flex align-items-center gap-1"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="form-label text-nowrap">Filter Room:</label>
      <select
        type="text"
        value={filter}
        className="form-select"
        onChange={handleFilterRoominput}
      >
        <option value="">All Rooms</option>
        {roomTypes.map((type, index) => {
          return (
            <option key={index} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default FilterRoom;
