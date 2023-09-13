import { useSelector } from "react-redux";
import { selectAllQuestions } from "../reducers/quiz/QuizReducer";
import AlertDelete from "./AlertDelete";
import UsersInfo from "./UsersInfo";
import { useState } from "react";

const Questions = () => {
  const questions = useSelector(selectAllQuestions);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string[] }>({});

  const handleAnswerChange = (questionId: number, selectedAnswer: string) => {
    const updatedUserAnswers = { ...userAnswers };

    if (updatedUserAnswers[questionId]) {
      if (updatedUserAnswers[questionId].includes(selectedAnswer)) {
        updatedUserAnswers[questionId] = updatedUserAnswers[questionId].filter(
          (answer) => answer !== selectedAnswer
        );
      } else {
        updatedUserAnswers[questionId].push(selectedAnswer);
      }
    } else {
      updatedUserAnswers[questionId] = [selectedAnswer];
    }

    setUserAnswers(updatedUserAnswers);
  };
console.log(userAnswers)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex bg-BLUE700/90 py-4 px-12 justify-between shadow-lg shadow-BACKGROUND_DARK font-Viga md:text-2xl fixed w-full right-0 rounded-b-full">
        <UsersInfo />
      </div>
      <div className="wrapper my-24 flex flex-col gap-6 select-none">
        {questions.map((question, index) => (
          <div
            className="  bg-FOREGROUND px-8 py-6 rounded-lg shadow-lg shadow-BACKGROUND_DARK "
            key={index}
          >
            <div className="flex justify-between mb-3 lg:items-center lg:pt-0">
              <h3 className="text-lg pt-4 font-Viga lg:text-2xl">
               {index + 1 + "-"} {question.question}
              </h3>
              <h5 className="text-xs text-GRAY600">{question.score}points</h5>
            </div>
            <div className="question ">
              {question.choices.split(",").map((choice, index) => (
                <div
                  className="flex items-center gap-2 mb-2 text-xl"
                  key={index}
                >
                  <input
                    className="w-5 h-5"
                    type={question.type === "trueFalse" ? "radio" : "checkbox"}
                    name={`question-${question.id}`}
                    id={`question-${choice}`}
                    value={choice}
                    checked={userAnswers[question.id]?.includes(choice) || false}
                    onChange={() => handleAnswerChange(question.id, choice)}
                  />
                  <p>{choice.split("*")}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button className="bg-GREEN600 text-FOREGROUND hover:text-GREEN600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK">
            Submit
          </button>
          <div>
            <AlertDelete />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
