import axios from "axios";

export const getPersons = () => {
  return axios.get("http://localhost:3001/persons").then((response) => {
    const { data } = response;
    return data;
  });
};

export const createPerson = (newName, newNumber) => {
  return axios.post("http://localhost:3001/persons", {
    name: newName,
    number: newNumber,
  });
};

export const deletePerson = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const updatePerson = (person) => {
  return axios
    .put(`http://localhost:3001/persons/${person.id}`, person)
    .then((response) => {
      const { data } = response;
      return data;
    });
};
