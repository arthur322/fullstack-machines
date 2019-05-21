import axios from "axios";

export const fetchPost = async status => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/status`,
    status
  );

  return data;
};

export const fetchPut = async status => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/status/${status.id}`,
    status
  );

  return data;
};

export const fetchDelete = async status => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}/status/${status.id}`,
    status
  );

  return data;
};

export const fetchGetAll = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/status`
  );

  return data;
};
