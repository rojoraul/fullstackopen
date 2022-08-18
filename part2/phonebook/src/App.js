import React, { useEffect, useState } from "react";
import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "./Services/Persons/personsService.js";

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
      if (person.name.toLowerCase().includes(props.search.toLowerCase()))
        return true;
      return false;
    })
    .map((person) => {
      return (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button value={person.id} name={person.name} onClick={props.delete}>
            delete
          </button>
        </p>
      );
    });
};

const Notification = ({ message }) => {
  const styleError = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const styleOk = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  if (message.includes("Information"))
    return <div style={styleError}>{message}</div>;
  return <div style={styleOk}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [modified, setModified] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getPersons().then((data) => {
      setPersons(data);
    });
  }, [modified]);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (event) => {
    if (window.confirm(`Confirm delete ${event.target.name}`))
      deletePerson(event.target.value)
        .then((response) => {
          setModified(response.data);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${event.target.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const search = persons.find((item) => item.name === newName);

    search
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
        ? updatePerson({ ...test, number: newNumber }).then((response) => {
            setModified(response);
          })
        : window.close()
      : createPerson(newName, newNumber)
          .then((response) => {
            setPersons((prevPersons) => {
              return prevPersons.concat(response.data);
            });
          })
          .finally(() => {
            setErrorMessage(`Added ${newName}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });

    setNewNumber("");
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm
        value={[newName, newNumber]}
        handle={[handleChangeName, handleChangeNumber, handleSubmit]}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} delete={handleDelete} />
    </div>
  );
};

export default App;
