import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");
  
  const [counter, setCounter] = useState(1);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: counter,
    };
    setCounter(counter + 1)
    setPersons(persons.concat(personObject));
    setNewName('');
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  console.log('persons array; ', persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.id} >{person.name}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
