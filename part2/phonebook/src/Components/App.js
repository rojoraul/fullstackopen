import React, { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
