import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <section>
      filter shown with:{" "}
      <input type="text" value={props.search} onChange={props.handleSearch} />{" "}
      <br />
    </section>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handle[2]}>
      <div>
        name:{" "}
        <input type="text" value={props.value[0]} onChange={props.handle[0]} />{" "}
        <br />
        number:{" "}
        <input type="text" value={props.value[1]} onChange={props.handle[1]} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return props.persons
    .filter((person) => {
      if (
        person.name
          .toLocaleLowerCase()
          .includes(props.search.toLocaleLowerCase())
      )
        return true;
      return false;
    })
    .map((person) => {
      return (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      );
    });
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const { data } = response;
      setPersons(data);
    });
  }, []);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    persons.find((item) => item.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(
          persons.concat({
            name: newName,
            number: newNumber,
          })
        );

    setNewNumber("");
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>
      <PersonForm
        value={[newName, newNumber]}
        handle={[handleChangeName, handleChangeNumber, handleSubmit]}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
