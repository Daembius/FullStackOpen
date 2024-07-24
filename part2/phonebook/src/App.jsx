import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 777777, id: 0 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [counter, setCounter] = useState(1);

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert("Name and number are required");
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: counter,
    };

    if (
      !persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
      setCounter(counter + 1);
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  console.log("persons array; ", persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName} {newNumber}</div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
