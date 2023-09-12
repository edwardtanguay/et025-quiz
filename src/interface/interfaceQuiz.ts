export interface IQuestions {
  id: number;
  question: string;
  answers: string[];
  correct_answer: string[];
  score: number;
}

export interface IExtraInfo {
  time: number;
  totalQuestion: number;
}
