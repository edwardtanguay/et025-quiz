import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IDownCounterProps {
  time: number;
}
const DownCounter = ({ time }: IDownCounterProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (time > 59) {
      setHours(Math.floor(time / 60));
      setMinutes(time % 60);
      setSeconds(0);
    } else setMinutes(time);
  }, [time]);

  useEffect(() => {
    let interval: number;

    if (isTimerStart) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                setHours((prevHours) => {
                  if (prevHours === 0) {
                    setIsTimerStart(false);
                    clearInterval(interval);
                    navigate("/result");
                    return 0;
                  }
                  return prevHours - 1;
                });
                return 59;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerStart, navigate]);

  return (
    <div>{`${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`}</div>
  );
};

export default DownCounter;
