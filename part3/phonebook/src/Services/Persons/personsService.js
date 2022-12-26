import axios from "axios";

export const getPersons = () => {
  return axios.get("http://localhost:3001/api/persons").then((response) => {
    const { data } = response;
    return data;
  });
};

export const createPerson = (newName, newNumber) => {
  return axios.post("http://localhost:3001/api/persons", {
    name: newName,
    number: newNumber,
  });
};

export const deletePerson = (id) => {
  return axios
    .delete(`http://localhost:3001/api/persons/${id}`)
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const updatePerson = (id, person) => {
  return axios
    .put(`http://localhost:3001/api/persons/${id}`, person)
    .then((response) => {
      const { data } = response;
      return data;
    });
};
