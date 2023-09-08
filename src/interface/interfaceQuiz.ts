export interface IQuestions {
  id: string;
  question: string;
  answers: string[] | boolean[];
  correct_answer: string[] | boolean[];
  score: number;
}
