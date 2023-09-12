import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { setEmail, setFullName } from "../reducers/quiz/QuizReducer";
import DownCounter from "./DownCounter";

const UsersInfo = () => {
    const dispatch=useDispatch()
    const email = useSelector((state: RootState) => state.questions.email);
    const fullName = useSelector((state: RootState) => state.questions.fullName);

    useEffect(() => {
        const isEmail = localStorage.getItem("saveEmail");
        const isFullName = localStorage.getItem("saveFullName");
        if (isEmail && isFullName) {
          dispatch(setEmail(isEmail));
          dispatch(setFullName(isFullName));
        }
      }, [email, fullName, dispatch]);
  return (
    <div className="flex justify-between items-center  w-full font-Viga text-sm md:text-xl text-ORANGE">
        <span className="hidden md:flex">{fullName}</span>
        <DownCounter />
        <span className=" ">{email}</span>
    </div>
  )
}

export default UsersInfo