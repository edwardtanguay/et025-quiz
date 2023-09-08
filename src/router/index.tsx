import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import QuestionPage from "../pages/QuestionPage";
import ResultPage from "../pages/ResultPage";
import RegistrationPage from "../pages/RegistrationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <RegistrationPage />,
      },
      {
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
    ],
  },
]);
