import { Outlet } from "react-router-dom";
import { getChoicesAndAnswer } from "./tools";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

// somewhere in your redux code

const questions = [
  {
    choiceList: "New York, Berlin, *Paris, London"
  },
  {
    choiceList: "true, *false"
  },
];

for (const question of questions) {
  const [choices, answer] = getChoicesAndAnswer(question);
  console.log(choices, answer);
}


const App = () => {
  return (
    <div className="min-h-screen bg-BLUE200">
      <div className="container px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
