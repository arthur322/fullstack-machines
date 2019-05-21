import axios from "axios";

export const fetchPost = async machine => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/machines`,
    machine
  );

  return data;
};

export const fetchPut = async machine => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/machines/${machine.id}`,
    machine
  );

  return data;
};

export const fetchDelete = async machine => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}/machines/${machine.id}`,
    machine
  );

  return data;
};

export const fetchGetAll = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/machines`
  );

  return data;
};
