import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Name and number are required");
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLocaleLowerCase()
    );

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            // error message
          });
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error("Error adding person: ", error);
          // error message
        });
    }
  };

  //   if (
  //     !persons.find(
  //       (person) => person.name.toLowerCase() === newName.toLowerCase()
  //     )
  //   ) {
  //     personService
  //       .create(personObject)
  //       .then(returnedPerson => {
  //         setPersons(persons.concat(returnedPerson))
  //         setNewName('');
  //         setNewNumber('');
  //       })
    
  //   } else {
  //     alert(`${newName} is already added to phonebook`);
  //     setNewName("");
  //     setNewNumber("");
  //   }
  // };

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error("Error deleting person:", error)
          alert(`Cannot delete ${name}`);
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setNewSearch(searchTerm);
  };

  console.log("persons array; ", persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
      {/* <Persons persons={persons} newSearch={newSearch} /> */}
    </div>
  );
};

export default App;
