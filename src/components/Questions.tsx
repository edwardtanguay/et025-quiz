import { useState } from "react"; // وارد کردن useState
import { useDispatch, useSelector } from "react-redux";
import { selectAllQuestions } from "../reducers/quiz/QuizReducer";
import { RootState } from "../store";
import AlertDelete from "./AlertDelete";
import UsersInfo from "./UsersInfo";

const Questions = () => {
	const dispatch = useDispatch();

	const getType = (answer: string) => {
		return `${answer === "true" || answer === "false" ? "radio" : "checkbox"}`;
	};

 
	const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string[] }>({});

	const questions = useSelector(selectAllQuestions);

 
	const handleAnswerChange = (questionId: number, selectedAnswer: string) => {
	
		const updatedUserAnswers = { ...userAnswers };

 
		if (updatedUserAnswers[questionId]) {
			if (updatedUserAnswers[questionId].includes(selectedAnswer)) {
			 
				updatedUserAnswers[questionId] = updatedUserAnswers[questionId].filter((answer) => answer !== selectedAnswer);
			} else {
			 
				updatedUserAnswers[questionId].push(selectedAnswer);
			}
		} else {
	 
			updatedUserAnswers[questionId] = [selectedAnswer];
		}

	
		setUserAnswers(updatedUserAnswers);
	};


const submit=()=>{
//  const a=Object.values(userAnswers)
//  a.map((s)=>console.log(s))
console.log(userAnswers);
console.log(questions);

	for (const question of questions) {
		switch (question.type) {
			case 'trueFalse':
				// you know what kind of question this is
				break;
			case 'singleAnswer':
				// you know what kind of question this is
				break;
			case 'mulitpleAnswer':
				// you know what kind of question this is
				break;

		}
	}
 
}
	return (
		<div className="flex flex-col gap-8">
			<div className="flex bg-BLUE500/90 py-4 px-12 justify-between shadow-lg shadow-BACKGROUND_DARK font-Viga md:text-2xl fixed w-full right-0 rounded-b-full">
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
										// هنگامی که تغییرات در ورودی رخ می‌دهد، تابع handleAnswerChange را صدا بزنید
										onChange={() => handleAnswerChange(question.id, answer)}
										// برای checkbox ها، چک کنید که آیا این پاسخ در پاسخ‌های کاربر برای این سوال وجود دارد یا نه و مطابق با آن تیک بگذارید
										checked={userAnswers[question.id]?.includes(answer) || false}
									/>
									<p>{answer}</p>
								</div>
							))}
						</div>
					</div>
				))}
				<div className="flex justify-between items-center">
					<button className="bg-GREEN600 text-FOREGROUND hover:text-GREEN600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK" onClick={submit}>
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