import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRoom,
  fetchAllRooms,
  getRoomTypes,
} from "../../components/utils/ApiFunctions";

const initialState = {
  loading: null,
  errorMessage: null,
  roomTypes: [],
  allRooms: { content: [], totalPages: 0 },
};

// Fetching all rooms
export const getAllRooms = createAsyncThunk(
  "room/fetchAllRoom",
  async ({ page = 0, size = 10, filter = "" }, thunkAPI) => {
    try {
      const res = await fetchAllRooms(page, size, filter);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetching allRoomTypes using Async Thunk
export const fetchAllRoomTypes = createAsyncThunk(
  "room/fetchAllRoomTypes",
  async (_, thunkAPI) => {
    try {
      const res = await getRoomTypes();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Fetching allRoomTypes using Async Thunk
export const deleteCurrentRoom = createAsyncThunk(
  "room/deleteRoom",
  async (roomId, thunkAPI) => {
    try {
      await deleteRoom(roomId);
      return roomId;
    } catch (error) {
      console.log("Room Id:", roomId);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoomTypes.pending, (state) => {
        state.loading = true;
        state.errorMessage = false;
      })
      .addCase(fetchAllRoomTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.roomTypes = action.payload;
      })
      .addCase(fetchAllRoomTypes.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getAllRooms.pending, (state) => {
        state.loading = true;
        state.errorMessage = false;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.allRooms = action.payload;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteCurrentRoom.pending, (state) => {
        state.loading = true;
        state.errorMessage = false;
      })
      .addCase(deleteCurrentRoom.fulfilled, (state, action) => {
        console.log("Room deleted: ", action.payload);
        state.loading = false;
        state.allRooms.content = state.allRooms.content.filter(
          (room) => room.id !== action.payload
        );
      })
      .addCase(deleteCurrentRoom.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default RoomSlice.reducer;
