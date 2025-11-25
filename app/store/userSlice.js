import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../components/utlis/apis";

export const GetUser = createAsyncThunk(
  "user/getUser", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}/getuser`, {
        withCredentials: true,
      });
      return response.data; // no need for extra await
    } catch (error) {
      // Better error handling
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null, // single user = object instead of array
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.info = null;
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.info =  action.payload;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
