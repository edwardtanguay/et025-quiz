import { useDispatch, useSelector } from "react-redux";
import {
  selectAllQuestions,
  setEmail,
  setFullName,
} from "../reducers/quiz/QuizReducer";
import { RootState } from "../store";
import AlertDelete from "./AlertDelete";
import { useEffect, useState } from "react";

const Questions = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.questions.email);
  const fullName = useSelector((state: RootState) => state.questions.fullName);

  const questions = useSelector(selectAllQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string[];
  }>({});

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  // const handleUserAnswer = (questionId: number, userAnswer: string) => {
  //   setUserAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [questionId]: userAnswer,
  //   }));

  // };
  const handleUserAnswer = (
    questionId: number,
    userAnswer: string,
    checked: boolean
  ) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = { ...prevSelectedAnswers };

      if (checked) {
        if (!updatedSelectedAnswers[questionId]) {
          updatedSelectedAnswers[questionId] = [];
        }
        updatedSelectedAnswers[questionId].push(userAnswer);
      } else {
        if (updatedSelectedAnswers[questionId]) {
          updatedSelectedAnswers[questionId] = updatedSelectedAnswers[
            questionId
          ].filter((answer) => answer !== userAnswer);
        }
      }

      return updatedSelectedAnswers;
    });
  };
  console.log(userAnswers);

  console.log(selectedAnswers);
  const compareAnswers = (questionId: number) => {
    const userAnswer = userAnswers[questionId];
    const correctAnswers = questions.find(
      (q) => q.id === questionId
    )?.correct_answer;
    if (!correctAnswers) {
      return false;
    }
    const isCorrect = correctAnswers.every(
      (correctAnswer) => userAnswer.indexOf(correctAnswer) !== -1
    );

    return isCorrect;
  };

  const handleSubmitAnswers = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    const results = questions.map((question) => {
      const questionId = question.id;
      const isCorrect = compareAnswers(questionId);

      if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        questionId,
        isCorrect,
      };
    });

    alert(
      `تعداد جواب‌های صحیح: ${correctCount}\nتعداد جواب‌های نادرست: ${incorrectCount}`
    );
  };

  useEffect(() => {
    const isEmail = localStorage.getItem("saveEmail");
    const isFullName = localStorage.getItem("saveFullName");
    if (isEmail && isFullName) {
      dispatch(setEmail(isEmail));
      dispatch(setFullName(isFullName));
    }
  }, [email, fullName, dispatch]);
  return (
    <div className="flex flex-col gap-8 py-32">
      <div className="flex bg-FOREGROUND py-4 px-8 justify-between rounded-lg shadow-lg shadow-BACKGROUND_DARK font-Viga md:text-2xl">
        <h3>{fullName}</h3>
        <h3 className="text-RED500">{email}</h3>
      </div>
      {questions.map((question) => (
        <div
          className="wrapper flex flex-col bg-FOREGROUND px-8 py-6 rounded-lg shadow-lg shadow-BACKGROUND_DARK"
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
              <div className="flex items-center gap-2 mb-2 text-xl" key={index}>
                <input
                  className="w-5 h-5"
                  type={`${
                    answer === "true" || answer === "false"
                      ? "radio"
                      : "checkbox"
                  }`}
                  name={`question-${question.id}`}
                  value={answer}
                  onChange={(e) =>
                    handleUserAnswer(
                      question.id,
                      e.target.value,
                      e.target.checked
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
        <button
          className="bg-GREEN600 text-FOREGROUND hover:text-GREEN600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK"
          onClick={handleSubmitAnswers}
        >
          Submit
        </button>
        <AlertDelete />
      </div>
    </div>
  );
};

export default Questions;
