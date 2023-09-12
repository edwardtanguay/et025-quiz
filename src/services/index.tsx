import axios from "axios";

const SERVER_URL = "http://localhost:9001";

export const getAllQuestions = () => {
  const url = `${SERVER_URL}/questions`;
  return axios.get(url);
};

export const getAllExtraInfo = () => {
  const url = `${SERVER_URL}/extraInfo`;
  return axios.get(url);
};
