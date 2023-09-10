import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IQuestions } from "../../interface/interfaceQuiz";
import { getAllQuestions } from "../../services";
import { RootState } from "../../store";

interface IQuiz {
  questions: IQuestions[];
  status: "idle" | "loading" | "completed" | "failed";
  error: string | null;
  fullName: string;
  email: string;
  selectedAnswers: {
    [key: number]: string[];
  };
}

export const fetchQuiz = createAsyncThunk("/quiz/fetchQuiz", async () => {
  const response = await getAllQuestions();
  return response.data;
});

const initialState: IQuiz = {
  questions: [],
  status: "idle",
  error: null,
  fullName: "",
  email: "",
  selectedAnswers: {},
};

const quizSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSelectedAnswers: (state, action) => {
      state.selectedAnswers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        (state.status = "completed"), (state.questions = action.payload);
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error =
            action.error.message || "gibt es eine error in response");
      });
  },
});

export const selectAllQuestions = (state: RootState) =>
  state.questions.questions;

export const { setEmail, setFullName, setSelectedAnswers } = quizSlice.actions;
export default quizSlice.reducer;
