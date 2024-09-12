import axios from "axios";

const setAxiosBaseURL = () => {
  axios.defaults.baseURL = "https://wallet.b.goit.study/api/";
};

const setAxiosHeader = (tokenReceived) => {
  const savedDataLocalString = localStorage.getItem("persist:auth");

  // Check if savedDataLocalString is not null before parsing
  const savedDataLocal = savedDataLocalString
    ? JSON.parse(savedDataLocalString)
    : null;

  const savedToken =
    savedDataLocal?.token === "null" || !savedDataLocal?.token
      ? null
      : savedDataLocal?.token.slice(1, -1);

  axios.defaults.headers.common.Authorization = tokenReceived || savedToken;
};

const clearAxiosHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

const axiosConfig = {
  setAxiosBaseURL,
  setAxiosHeader,
  clearAxiosHeader,
};

export default axiosConfig;
