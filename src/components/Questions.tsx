import { useDispatch, useSelector } from "react-redux";
import {
  selectAllQuestions,
  setSelectedAnswers,
} from "../reducers/quiz/QuizReducer";
import { RootState } from "../store";
import AlertDelete from "./AlertDelete";
import UsersInfo from "./UsersInfo";

const Questions = () => {
  const dispatch = useDispatch();

  const getType = (answer: string) => {
    return `${answer === "true" || answer === "false" ? "radio" : "checkbox"}`;
  };

  const selectedAnswers = useSelector(
    (state: RootState) => state.questions.selectedAnswers
  );

  const questions = useSelector(selectAllQuestions);

  const handleUserAnswer = (
    questionId: number,
    userAnswer: string,
    checked: boolean,
    type: string
  ) => {
    const { [questionId]: selectedQuestionAnswers = [] } = selectedAnswers;

    const updatedAnswers = checked
      ? type === "radio"
        ? [userAnswer]
        : [...selectedQuestionAnswers, userAnswer]
      : selectedQuestionAnswers.filter((answer) => answer !== userAnswer);

    const updatedSelectedAnswers = {
      ...selectedAnswers,
      [questionId]: updatedAnswers,
    };

    dispatch(setSelectedAnswers(updatedSelectedAnswers));
  };
  console.log(selectedAnswers);
  const myArray = Object.values(selectedAnswers);
  console.log("adelllllllllllllll" + myArray);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex bg-NEUTRAL700/80 py-4 px-8 justify-between shadow-lg shadow-BACKGROUND_DARK font-Viga md:text-2xl fixed w-full right-0">
        <UsersInfo />
      </div>
      <div className="wrapper my-24 flex flex-col gap-6">
        {questions.map((question) => (
          <div
            className="  bg-FOREGROUND px-8 py-6 rounded-lg shadow-lg shadow-BACKGROUND_DARK "
            key={question.id}
          >
            <div className="flex justify-between mb-3 lg:items-center lg:pt-0">
              <h3 className="text-lg pt-4 font-Viga lg:text-2xl">
                {question.question}
              </h3>
              <h5 className="text-xs text-GRAY400">{question.score}points</h5>
            </div>
            <div className="question ">
              {question.answers.map((answer, index) => (
                <div
                  className="flex items-center gap-2 mb-2 text-xl"
                  key={index}
                >
                  <input
                    className="w-5 h-5"
                    type={getType(answer)}
                    name={`question-${question.id}`}
                    id={`question-${answer}`}
                    value={answer}
                    onChange={(e) =>
                      handleUserAnswer(
                        question.id,
                        e.target.value,
                        e.target.checked,
                        getType(answer)
                      )
                    }
                  />
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button className="bg-GREEN600 text-FOREGROUND hover:text-GREEN600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK">
            Submit
          </button>
          <AlertDelete />
        </div>
      </div>
    </div>
  );
};

export default Questions;
