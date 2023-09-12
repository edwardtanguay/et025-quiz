import { configureStore } from "@reduxjs/toolkit";
import questionReducer, { fetchQuiz } from "../reducers/quiz/QuizReducer";
import extraInfoReducer, { fetchExtraInfo } from "../reducers/extra/ExtraReducer"

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    extraInfo:extraInfoReducer
  },
});
store.dispatch(fetchQuiz())
store.dispatch(fetchExtraInfo())

export type dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
