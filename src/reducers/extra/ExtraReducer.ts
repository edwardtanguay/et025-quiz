import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IExtraInfo } from "../../interface/interfaceQuiz";
import { getAllExtraInfo } from "../../services";
import { RootState } from "../../store";

interface IExtra {
  extraInfo: IExtraInfo;
  status: "idle" | "loading" | "completed" | "failed";
  error: string | null;
}

export const fetchExtraInfo = createAsyncThunk(
  "/quiz/fetchExtraInfo",
  async () => {
    const response = await getAllExtraInfo();
    return response.data;
  }
);

const initialState: IExtra = {
  extraInfo: { time: 0, totalQuestion: 0 },
  status: "idle",
  error: null,
};

const extraSlice = createSlice({
  name: "extraInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtraInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExtraInfo.fulfilled, (state, action) => {
        (state.status = "completed"), (state.extraInfo = action.payload);
      })
      .addCase(fetchExtraInfo.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error =
            action.error.message || "gibt es eine error in response");
      });
  },
});

export const selectAllExtraInfo = (state: RootState) =>
  state.extraInfo.extraInfo;

export default extraSlice.reducer;
