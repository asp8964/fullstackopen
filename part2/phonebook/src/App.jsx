import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonFrom";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  // const [message, setMessage] = useState(null);
  // const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existPerson = persons.find((person) => person.name === newName);
    // if (persons.findIndex((person) => person.name === newName) !== -1) {
    // if (persons.map((person) => person.name).includes(newName)) {
    if (existPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existPerson.id, { ...existPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            // setMessage(`Updated ${returnedPerson.name}`);
            // setIsError(false);
            setMessage({
              value: `Updated ${newName}`,
              isError: false,
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const PersonObject = {
      name: newName,
      number: newNumber,
    };
    personService.create(PersonObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      // setMessage(`Added ${returnedPerson.name}`);
      // setIsError(false);
      setMessage({
        value: `Added ${newName}`,
        isError: false,
      });
      setTimeout(() => {
        setMessage(null);
      }, 3000);

      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then((removedPerson) =>
          setPersons(persons.filter((person) => person.id !== removedPerson.id))
        )
        .catch(() => {
          // console.log(error)
          // setMessage(
          //   `Information of ${rperson.name} has already been removed from server`
          // );
          // setIsError(true);
          setMessage({
            value: `Information of ${person.name} has already been removed from server`,
            isError: true,
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const handleNameChange = (e) => {
    // console.log(e.target.value)
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    // console.log(e.target.value)
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {/* <Notification message={message} isError={isError} /> */}
      <Notification message={message} />

      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterName={filterName}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
