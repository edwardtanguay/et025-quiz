import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RootState } from "../store";
import { setEmail, setFullName } from "../reducers/quiz/QuizReducer";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.questions.email);
  const fullName = useSelector((state: RootState) => state.questions.fullName);
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem("saveEmail",email)
    localStorage.setItem("saveFullName",fullName)
  },[email,fullName,dispatch])

  const canStart = [fullName, email].every(Boolean);

  const onFormChangeFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFullName(event.target.value));
  };
  const onFormChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };
  const isEmailValid = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const isNameValid = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(fullName);
  };

  const handleOnClick = () => {
    if (canStart && isEmailValid() && isNameValid()) {
      toast.success("You have successfully logged in!");
      setTimeout(() => {
        navigate("/question");
      }, 3000);
    } else {
      toast.error("Please enter your name and email.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-col items-center gap-8">
        <p className="font-bold text-3xl lg:text-5xl font-Viga">
          Welcome to the registration page
        </p>
        <div className="flex flex-col gap-1 items-center md:flex-row mb-12">
          <p className="font-bold text-xl text-NEUTRAL700">
            {" "}
            Please enter your name and email now
          </p>
          <p className="font-bold text-xl text-NEUTRAL700">
            {" "}
            and be guided to the questions.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-4 bg-BLUE500 shadow-lg shadow-BACKGROUND_DARK px-7 py-8 rounded-xl">
        <div className="grid grid-rows-2  gap-3 pt-12">
          <input
            className="input"
            type="text"
            placeholder="Enter Your Name"
            name="fullName"
            value={fullName}
            onChange={onFormChangeFullName}
          />
          <input
            className="input"
            type="email"
            placeholder=" Enter Your Email"
            name="email"
            value={email}
            onChange={onFormChangeEmail}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="px-8 py-2 bg-green-600 rounded-lg font-bold hover:text-yellow-100 hover:bg-green-800 duration-500"
            onClick={handleOnClick}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
