import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

// Add room to database
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();

  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("All feild must be filled");
  }
}
// Get all room types from Database
export async function getRoomTypes() {
  try {
    const respose = await api.get("/rooms/room/types");
    return respose;
  } catch (error) {
    throw new Error("Error fetching RoomTypes: " + error);
  }
}
// Gets all rooms from data base
export async function fetchAllRooms(page = 0, size = 10, filter = "") {
  try {
    const res = await api.get(
      `/rooms?page=${page}&size=${size}&filter=${filter}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error fetching Rooms");
  }
}

// Delete Room By Id
export const deleteRoom = async (id) => {
  await api.delete(`/rooms/delete/room/${id}`);
};

// Book a room
export async function bookRoom(id, booking) {
  try {
    const res = await api.post(`/bookings/room/${id}/booking`, booking);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room: ${error.message}`);
    }
  }
}

// Fetch all bookings
export async function getAllBookinds() {
  try {
    const res = await api.get("/bookings/all-bookings");
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching all bookings : ${error.message}`);
  }
}

// Get booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const res = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error(
        `Error fetching booking by confirmation code: ${error.response.data}`
      );
    }
  }
}

// Get Room BY Id
export async function getRoomById(roomId) {
  try {
    const res = await api.get(`/rooms/room/${roomId}`);

    return res.data;
  } catch (error) {
    throw new Error(`Error getting room by id: ${error.message}`);
  }
}

// Cancel/Delete booking
export async function cancelBooking(bookingId) {
  try {
    await api.delete(`/bookings/booking/${bookingId}/delete`);
  } catch (error) {
    throw new Error(`Error canceling booking: ${error.message}`);
  }
}

// Get All Available rooms
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  try {
    const res = await api.get(
      `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
