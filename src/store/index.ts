import { configureStore } from "@reduxjs/toolkit";
import questionReducer, { fetchQuiz } from "../reducers/quiz/QuizReducer";

export const store = configureStore({
  reducer: {
    questions: questionReducer,
  },
});
store.dispatch(fetchQuiz())

export type dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
