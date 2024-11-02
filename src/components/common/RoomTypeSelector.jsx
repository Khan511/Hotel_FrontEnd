import { useState } from "react";

const RoomTypeSelector = ({
  handleRoomInputChange,
  roomTypes,
  setRoomTypes,
}) => {
  const [newRoomType, setNewRoomType] = useState("");
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      <div>
        <select
          name="roomType"
          className="form-select form-selectt"
          id="roomType"
          onChange={(e) => {
            if (e.target.value === "Add New") {
              setShowNewRoomTypeInput(true);
            } else {
              handleRoomInputChange(e);
            }
          }}
        >
          <option className="form-select" value={""}>
            Select a room type
          </option>
          <option className="form-select" value={"Add New"}>
            Add New
          </option>
          {roomTypes.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        {showNewRoomTypeInput && (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new room type..."
              onChange={handleNewRoomTypeInputChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddNewRoomType}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomTypeSelector;
